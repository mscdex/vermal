var EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits,
    inspect = require('util').inspect;

var consts = require('./constants');

var OPEN_BRACE = 123,
    CLOSE_BRACE = 125,
    COMMENT_START = 35,
    DBL_QUOTE = 34;

var C = 0,
    STATE = {
      BEGIN: C++,
      READY: C++,
      END: C++,
      NODE_NAME: C++,
      IN_NODE: C++
    },
    TOKENS = consts.TOKENS,
    FIELD_TOKENS = consts.FIELD_TOKENS,
    ENUMS = consts.ENUMS,
    FIELD_DEFS = consts.FIELD_DEFS;

var EOB = -1, // end of buffer indicator
    EOF = -2,
    //        #   V   R   M   L       V   1   .   0       a   s    c   i    i
    HEADER = [35, 86, 82, 77, 76, 32, 86, 49, 46, 48, 32, 97, 115, 99, 105, 105],
    HEADER_LEN = HEADER.length;

var TOKEN_MATCHABLES = {},
    FIELD_TOKEN_MATCHABLES = {};
Object.keys(TOKENS).forEach(function(v) {
  var a = new Array(len), o = TOKEN_MATCHABLES;
  for (var i=0,len=v.length,chr; i<len; ++i) {
    chr = v.charCodeAt(i);
    if (!o[chr])
      o[chr] = {};
    o = o[chr];
  }
  o.val = TOKENS[v];
});
for (var T in TOKENS)
  TOKENS[TOKENS[T]] = T;
Object.keys(FIELD_TOKENS).forEach(function(v) {
  var a = new Array(len), o = FIELD_TOKEN_MATCHABLES;
  for (var i=0,len=v.length,chr; i<len; ++i) {
    chr = v.charCodeAt(i);
    if (!o[chr])
      o[chr] = {};
    o = o[chr];
  }
  o.val = FIELD_TOKENS[v];
});
for (var T in FIELD_TOKENS)
  FIELD_TOKENS[FIELD_TOKENS[T]] = T;

// Begin Parser class ==========================================================

function Parser() {
  this._reset();
}
inherits(Parser, EventEmitter);

Parser.prototype.push = function(data) {
  var c;
  while ((c = this._getc(data)) !== EOB) {
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
        if (!isWhitespace(c) && c !== OPEN_BRACE && c !== EOF && this._nodetype === undefined) {
          if (this._match[c])
            this._match = this._match[c];
          else
            this._throwError('Invalid token');
        } else {
          if (isWhitespace(c) && this._match === TOKEN_MATCHABLES)
            continue;
          var type = this._match.val;
          if (type === undefined)
            this._throwError('Unexpected end of token');
          if (type === TOKENS.DEF) {
            if (c === OPEN_BRACE || c === EOF)
              this._throwError('DEF without name and node type');
            else if (this._buffer !== undefined)
              this._throwError('Unexpected second DEF');
            else {
              this._nodetype = type;
              this._state = STATE.NODE_NAME;
            }
          } else if (type === TOKENS.USE) {
            if (this._buffer !== undefined)
              this._throwError('Unexpected second USE');
            else {
              this._nodetype = type;
              this._state = STATE.NODE_NAME;
            }
          } else {
            // matched a node type
            this._nodetype = type;
            // TODO: be more strict here about garbage between node name and OPEN_BRACE
            if (c === OPEN_BRACE) {
              this._state = STATE.IN_NODE;
              this.emit('startnode', TOKENS[this._nodetype], this._buffer);
              this._buffer = undefined;
            }
          }
        }
        break;
      case STATE.NODE_NAME:
        // very relaxed name parsing compared to VRML 1.0c spec
        if (isWhitespace(c) || (this._nodetype === TOKENS.USE && c === EOF)) {
          if (this._buffer !== undefined) {
            this._state = STATE.READY;
            this._match = TOKEN_MATCHABLES;
            if (this._nodetype === TOKENS.USE) {
              this.emit('instance', this._buffer);
              this._buffer = undefined;
            }
            this._nodetype = undefined;
          }
        } else if (this._nodetype === TOKENS.DEF && (c === OPEN_BRACE || c === EOF))
          this._throwError('DEF without node type');
        else if (this._buffer === undefined)
          this._buffer = String.fromCharCode(c);
        else
          this._buffer += String.fromCharCode(c);
        break;
      case STATE.IN_NODE:
        if (c === CLOSE_BRACE && !this._instr) {
          this._state = STATE.READY;
          this.emit('endnode', TOKENS[this._nodetype]);
          this._nodetype = undefined;
          this._match = TOKEN_MATCHABLES;
        } else {
          var fn = '_node' + TOKENS[this._nodetype];
console.error(fn + '(' + inspect(String.fromCharCode(c)) + ')');
          this[fn](c);
        }
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

Parser.prototype._nodeSeparator = function(c) {

};

Parser.prototype._nodeSphere = function(c) {

};

Parser.prototype._getc = function(data) {
  var c = EOB;
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
  return c;
};

Parser.prototype._reset = function() {
  this._state = STATE.BEGIN;
  this._dataptr = 0;
  this._ptr = 0;
  this._match = TOKEN_MATCHABLES;
  this._nodetype = undefined;
  this._buffer = undefined;
  this._incomment = false;
  this._instr = false;
  this._comment = undefined;
};

Parser.prototype._throwError = function(msg) {
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
