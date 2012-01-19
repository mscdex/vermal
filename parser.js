/*
    TODO: - Implement strict mode which checks that field names start with a
            lowercase letter, node types start with an uppercase letter,
            character limitations for field names and node types, fields are
            described for non-standard VRML nodes, described fields for
            standard VRML nodes are valid fields for those nodes, and all known
            field values are validated against their respective field types
*/

var EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits,
    inspect = require('util').inspect;

var consts = require('./constants');

var OPEN_BRACE = 123,
    CLOSE_BRACE = 125,
    COMMENT_START = 35,
    OPEN_BRACKET = 91,
    CLOSE_BRACKET = 93,
    DBL_QUOTE = 34,
    COMMA = 44,
    OPEN_PARENS = 40,
    CLOSE_PARENS = 41,
    PIPE = 124;

var C = 0,
    STATE = {
      BEGIN: C++,
      READY: C++,
      END: C++,
      NODE_NAME: C++,
      NODE_FIELDS: C++
    },
    BODYSTATE = {
      IDLE: C++,
      READ_KEY: C++,
      READ_VAL: C++
    },
    TOKENS = consts.TOKENS,
    FIELD_TYPES = consts.FIELD_TYPES,
    FIELDS = consts.FIELDS;

var EOB = -1, // end of buffer indicator
    EOF = -2,
    //        #   V   R   M   L       V   1   .   0       a   s    c   i    i
    HEADER = [35, 86, 82, 77, 76, 32, 86, 49, 46, 48, 32, 97, 115, 99, 105, 105],
    HEADER_LEN = HEADER.length;

// Begin Parser class ==========================================================

function Parser() {
  this._reset();
}
inherits(Parser, EventEmitter);

Parser.prototype.addCustomNode = function(o) {
  if (TOKENS[o.name] === undefined) {
    var val = ++consts.maxTokenVal;
    TOKENS[o.name] = val;
    TOKENS[val] = o.name;
    if (o.fields)
      FIELDS[o.name] = o.fields;
  }
};

Parser.prototype.push = function(data) {
  var c;
  while ((c = this._getc(data)) !== EOB) {
    if (this._col === -1)
      this._col = 0;
    if (c === 10) {
      this._line++;
      this._col = -1;
    } else if (c !== 13)
      this._col++;
    if (this._incomment) {
      if (isNL(c) || c === EOF) {
        this._incomment = false;
        this.emit('comment', this._comment);
      } else {
        this._comment += String.fromCharCode(c);
        continue;
      }
    } else if (!this._instr && c === COMMENT_START && this._state !== STATE.BEGIN) {
      this._incomment = true;
      this._comment = "";
      continue;
    }
    switch (this._state) {
      case STATE.BEGIN:
        if (c === EOF && this._ptr === 0) {
        } else {
          if (this._ptr >= HEADER_LEN) {
            if (isNL(c) || c === EOF) {
              this._ptr = 0;
              this._state = STATE.READY;
              this.emit('header');
            }
          } else if (c !== HEADER[this._ptr++])
            this._throwError('Invalid VRML 1.0 header');
        }
        break;
      case STATE.READY:
//console.error('STATE.READY received char: ' + inspect(String.fromCharCode(c)));
        if (!isWhitespace(c) && c !== OPEN_BRACE && c !== EOF) {
          if (c === CLOSE_BRACE) {
            this._nodestate = {};
            this._nodedone = false;
            this._nodestarted = true;
            this._buffer = undefined;
            this._nodetype = undefined;
            this.emit('endnode');
          } else {
            if (this._nodetype === undefined)
              this._nodetype = String.fromCharCode(c);
            else
              this._nodetype += String.fromCharCode(c);
          }
        } else {
          if (isWhitespace(c) && this._nodetype === undefined)
            continue;
          var typeId = TOKENS[this._nodetype];
          if (typeId === TOKENS.DEF) {
            if (c === OPEN_BRACE || c === EOF)
              this._throwError('DEF without name and node type');
            else if (this._buffer !== undefined)
              this._throwError('Unexpected second DEF');
            else
              this._state = STATE.NODE_NAME;
          } else if (typeId === TOKENS.USE) {
            if (this._buffer !== undefined)
              this._throwError('Unexpected second USE');
            else
              this._state = STATE.NODE_NAME;
          } else {
            // matched a node type

            if (c === OPEN_BRACE) {
              this._state = STATE.NODE_FIELDS;
              this.emit('startnode', this._nodetype, this._buffer);
              this._buffer = undefined;
            }
          }
        }
        break;
      case STATE.NODE_NAME:
        // very relaxed name parsing compared to VRML 1.0c spec
        if (isWhitespace(c) || (TOKENS[this._nodetype] === TOKENS.USE && c === EOF)) {
          if (this._buffer !== undefined) {
            this._state = STATE.READY;
            if (TOKENS[this._nodetype] === TOKENS.USE) {
              this.emit('instance', this._buffer);
              this._buffer = undefined;
            }
            this._nodetype = undefined;
          }
        } else if (TOKENS[this._nodetype] === TOKENS.DEF && (c === OPEN_BRACE || c === EOF))
          this._throwError('DEF without node type');
        else if (this._buffer === undefined)
          this._buffer = String.fromCharCode(c);
        else
          this._buffer += String.fromCharCode(c);
        break;
      case STATE.NODE_FIELDS:
//console.error('STATE.NODE_FIELDS received char: ' + inspect(String.fromCharCode(c)));
        if (this._nodestarted) {
          this._nodedone = true;
          this._nodestarted = false;
          this._nodestate.state = BODYSTATE.IDLE;
        }
        this._bodyParse(c);
        break;
    }
    if (c === EOF) {
      console.error('got EOF, resetting ...');
      this._reset();
      return this.emit('end');
    }
  }
  this._dataptr = 0;
};

Parser.prototype._bodyParse = function(c) {
  if (this._nodestate.state === BODYSTATE.READ_KEY) {
//console.error('node state === READ_KEY');
    if (c === EOF || c === CLOSE_BRACE)
      this._throwError('Unexpected end of body node');
    else if (c === OPEN_BRACE) {
      // oops, this was actually a child node!
      this._appendBackbuf(this._buffer);
      this._appendBackbuf(OPEN_BRACE);
      this._state = STATE.READY;
      this._nodestate = {};
      this._ptr = 0;
      this._nodedone = false;
      this._nodestarted = true;
      this._nodetype = undefined;
      this._buffer = undefined;
      return;
    } else if (isWhitespace(c) || c === DBL_QUOTE) {
      if (this._buffer !== undefined) {
        if (this._buffer[0] === this._buffer[0].toLowerCase()) {
          if (TOKENS[this._nodetype] === undefined && this._nodestate.fields === undefined && this._buffer !== 'fields')
            this._throwError('Unknown node type \'' + this._nodetype + '\' without fields defintition');
          if ((TOKENS[this._nodetype] !== undefined && FIELDS[this._nodetype][this._buffer] === undefined) && (this._nodestate.fields !== undefined && this._nodestate.fields[this._buffer] === undefined))
            this._throwError('Unknown field type \'' + this._buffer + '\' for node type \'' + this._nodetype + '\'');
          this._nodestate.key = this._buffer;
          this._buffer = undefined;
          this._nodestate.state = BODYSTATE.READ_VAL;
          if (c === DBL_QUOTE)
            this._appendBackbuf(c);
        } else {
          // must be something like DEF ... or USE ... or NodeName ...
          this._appendBackbuf(this._buffer);
          this._appendBackbuf(c);
          this._state = STATE.READY;
          this._nodestate = {};
          this._ptr = 0;
          this._nodedone = false;
          this._nodestarted = true;
          this._nodetype = undefined;
          this._buffer = undefined;
        }
      } else if (c === DBL_QUOTE)
        this._throwError('Unexpected double quote');
      return;
    }
  } else if (this._nodestate.state === BODYSTATE.READ_VAL) {
//console.error('node state === READ_VAL');
    if (isWhitespace(c) && this._buffer === undefined)
      return;
    else if (c === OPEN_BRACKET) {
      if (!this._instr && Array.isArray(this._nodestate.val))
        this._throwError('Unexpected open bracket');
      else if (!this._instr && this._nodestate.val === undefined) {
        this._nodestate.val = [];
        return;
      }
    } else if (c === CLOSE_BRACKET) {
      if (!this._instr) {
        // multi-value field value
        if (this._buffer !== undefined)
          this._nodestate.val.push(this._buffer.trim());
        if (this._nodestate.key === 'fields') {
          var vals = this._nodestate.val;
          this._nodestate.fields = {};
          for (var i=0,len=vals.length,tokens; i<len; ++i) {
            tokens = vals[i].trim().split(' ');
            if (FIELD_TYPES[tokens[0]] === undefined)
              this._throwError('Unidentified field type \'' + tokens[0] + '\'');
            this._nodestate.fields[tokens[1]] = { type: FIELD_TYPES[tokens[0]] };
          }
        } else
          this.emit('field', this._nodestate.key, this._nodestate.val);
        this._ptr = 0;
        this._buffer = undefined;
        this._nodestate.key = this._nodestate.val = undefined;
        this._nodestate.state = BODYSTATE.IDLE;
        this._nodestate.sawEndMulti = true;
        this._nodestate.wasQuoted = false;
        this._nodedone = true;
        return;
      }
    } else if (c === EOF || (c === CLOSE_BRACE && !this._instr)) {
      if (c === CLOSE_BRACE && this._nodestate.val === undefined && this._buffer !== undefined) {
        var field = FIELDS[this._nodetype][this._nodestate.key], done = false;
        if (field === undefined)
          field = this._nodestate.fields;
        if (field.type === FIELD_TYPES.SFColor || field.type === FIELD_TYPES.SFVec3f) {
          if (++this._ptr === 3)
            done = true;
        } else if (field.type === FIELD_TYPES.SFVec2f) {
          if (++this._ptr === 2)
            done = true;
        } else if (field.type === FIELD_TYPES.SFRotation) {
          if (++this._ptr === 4)
            done = true;
        } else if (field.type === FIELD_TYPES.SFMatrix) {
          if (++this._ptr === 16)
            done = true;
        } else if (FIELD_TYPES[field.type].substr(0, 2) === 'MF') {
          done = true;
          this._buffer = [this._buffer.trim()];
        } else
          done = true;
        if (!done)
          this._throwError('Unexpected end of field');
        this.emit('field', this._nodestate.key, this._buffer);
        this._ptr = 0;
        this._buffer = undefined;
        this._nodestate.key = this._nodestate.val = undefined;
        this._nodestate.state = BODYSTATE.IDLE;
        this._nodestate.fields = undefined;
        this._nodestate.wasQuoted = false;
        this._nodedone = true;
        this._appendBackbuf(c);
        return;
      }
      if (this._nodestate.key !== undefined &&
          (this._nodestate.val === undefined ||
           (Array.isArray(this._nodestate.val) && !this._nodestate.sawEndMulti)
          ))
        this._throwError('Unexpected end of body node');
      if (Array.isArray(this._nodestate.val) && this._nodestate.sawEndMulti)
        this._nodestate.sawEndMulti = false;
      return;
    } else if (c === DBL_QUOTE) {
      if (this._buffer === undefined) {
        this._buffer = "";
        this._instr = true;
        return;
      } else {
        var bufLen = this._buffer.length;
        if (this._instr && (bufLen === 0 || (this._buffer[bufLen-1] !== '\\' ||
            (bufLen >= 2 && this._buffer[bufLen-1] === '\\' &&
             this._buffer[bufLen-2] === '\\'
            )))) {
          this._instr = false;
          if (Array.isArray(this._nodestate.val)) {
            this._nodestate.wasQuoted = true;
            this._nodestate.val.push(this._buffer);
          } else {
            // single quoted field value
            this.emit('field', this._nodestate.key, this._buffer);
            this._ptr = 0;
            this._nodestate.key = this._nodestate.val = undefined;
            this._nodestate.state = BODYSTATE.IDLE;
            this._nodedone = true;
          }
          this._buffer = undefined;
          return;
        }
      }
    } else if (c === COMMA && Array.isArray(this._nodestate.val)) {
      if (this._nodestate.wasQuoted)
        this._nodestate.wasQuoted = false;
      else {
        this._nodestate.val.push(this._buffer);
        this._buffer = undefined;
        this._ptr = 0;
      }
      return;
    } else if (isWhitespace(c) && !this._instr) {
      if (!Array.isArray(this._nodestate.val)) {
        var field = FIELDS[this._nodetype][this._nodestate.key], done = false;
        if (field === undefined)
          field = this._nodestate.fields;
        if (field.type === FIELD_TYPES.SFColor || field.type === FIELD_TYPES.SFVec3f) {
          if (++this._ptr === 3)
            done = true;
        } else if (field.type === FIELD_TYPES.SFVec2f) {
          if (++this._ptr === 2)
            done = true;
        } else if (field.type === FIELD_TYPES.SFRotation) {
          if (++this._ptr === 4)
            done = true;
        } else if (field.type === FIELD_TYPES.SFMatrix) {
          if (++this._ptr === 16)
            done = true;
        } else if (FIELD_TYPES[field.type].substr(0, 2) === 'MF') {
          done = true;
          this._buffer = [this._buffer];
        } else
          done = true;
        if (done) {
          this.emit('field', this._nodestate.key, this._buffer);
          this._ptr = 0;
          this._buffer = undefined;
          this._nodestate.wasQuoted = false;
          this._nodestate.key = this._nodestate.val = undefined;
          this._nodestate.state = BODYSTATE.IDLE;
          this._nodedone = true;
          return;
        }
      }
    }
  } else {
    // idle
//console.error('node state === IDLE');
    if (!isWhitespace(c) && c !== EOF && c !== CLOSE_BRACE) {
      this._nodedone = false;
      this._appendBackbuf(c);
      this._nodestate.state = BODYSTATE.READ_KEY;
    } else if (c === CLOSE_BRACE) {
      if (this._nodedone || this._nodestarted) {
        this._nodestate = {};
        this._nodedone = false;
        this._nodestarted = true;
        this._buffer = undefined;
        this._nodetype = undefined;
        this._state = STATE.READY;
        this.emit('endnode');
      } else if (!this._nodedone)
        this._throwError('Invalid \'' + this._nodetype + '\' node');
    } else if (c === EOF)
      this._throwError('Invalid \'' + this._nodetype + '\' node');
    return;
  }
  if (this._buffer === undefined)
    this._buffer = String.fromCharCode(c);
  else
    this._buffer += String.fromCharCode(c);
};

Parser.prototype._appendBackbuf = function(v) {
  if (this._backbuf === undefined)
    this._backbuf = (typeof v === 'number' ? String.fromCharCode(v) : v);
  else
    this._backbuf += (typeof v === 'number' ? String.fromCharCode(v) : v);
};

Parser.prototype._getc = function(data) {
  var c = EOB, useData = true;
  if (this._backbuf) {
    if (this._backbufptr < this._backbuf.length) {
      c = this._backbuf.charCodeAt(this._backbufptr++);
      useData = false;
    } else {
      this._backbufptr = 0;
      this._backbuf = undefined;
    }
  }
  if (useData) {
    if (data === null)
      c = EOF;
    else if (data) {
      var dataLen = data.length;
      if (data && dataLen && this._dataptr < dataLen) {
        if (Buffer.isBuffer(data))
          c = data[this._dataptr];
        else // string
          c = data.charCodeAt(this._dataptr);
        this._dataptr++;
      }
    }
  }
  return c;
};

Parser.prototype._reset = function() {
  this._state = STATE.BEGIN;
  this._backbuf = undefined;
  this._backbufptr = 0;
  this._line = 1;
  this._col = 0;
  this._dataptr = 0;
  this._ptr = 0;
  this._nodestate = {};
  this._nodedone = false;
  this._nodestarted = true;
  this._nodetype = undefined;
  this._buffer = undefined;
  this._instr = false;
  this._incomment = false;
  this._comment = undefined;
};

Parser.prototype._throwError = function(msg) {
  msg += ' on line ' + this._line + ' column ' + this._col;
  this._reset();
  throw new Error(msg);
};

// Helper functions ============================================================

function isWhitespace(c) {
  return c === 32 || c === 9 || c === 10 || c === 13;
}

function isNL(c) {
  return c === 10 || c === 13;
}

module.exports = Parser;
