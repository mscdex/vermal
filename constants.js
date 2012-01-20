var C = 0;
var TOKENS = {
  DEF: C++,
  USE: C++,
  // Shape nodes
  AsciiText: C++,
  Cone: C++,
  Cube: C++,
  Cylinder: C++,
  IndexedFaceSet: C++,
  IndexedLineSet: C++,
  PointSet: C++,
  Sphere: C++,
  // Property nodes
  Coordinate3: C++,
  FontStyle: C++,
  Info: C++,
  Material: C++,
  MaterialBinding: C++,
  Normal: C++,
  NormalBinding: C++,
  Texture2: C++,
  Texture2Transform: C++,
  TextureCoordinate2: C++,
  ShapeHints: C++,
  MatrixTransform: C++,
  Rotation: C++,
  Scale: C++,
  Transform: C++,
  Translation: C++,
  // Group nodes
  Separator: C++,
  Switch: C++,
  WWWAnchor: C++,
  LOD: C++,
  // Misc nodes
  OrthographicCamera: C++,
  PerspectiveCamera: C++,
  DirectionalLight: C++,
  PointLight: C++,
  SpotLight: C++,
  WWWInline: C++
};
var maxTokenVal = C - 1;
for (var T in TOKENS)
  TOKENS[TOKENS[T]] = T;
C=0;
var FIELD_TYPES = {
  // Types
  SFBitMask: C++,
  SFBool: C++,
  SFColor: C++,
  MFColor: C++,
  SFEnum: C++,
  SFFloat: C++,
  MFFloat: C++,
  SFImage: C++,
  SFLong: C++,
  MFLong: C++,
  SFMatrix: C++,
  SFRotation: C++,
  SFString: C++,
  MFString: C++,
  SFVec2f: C++,
  MFVec2f: C++,
  SFVec3f: C++,
  MFVec3f: C++
};
for (var T in FIELD_TYPES)
  FIELD_TYPES[FIELD_TYPES[T]] = T;
C=0;
var FIELDS = {
  AsciiText: {
    string: { type: FIELD_TYPES.MFString, default: [''] },
    spacing: { type: FIELD_TYPES.SFFloat, default: 1 },
    justification: { type: FIELD_TYPES.SFEnum, default: 'LEFT', values: ['LEFT', 'CENTER', 'RIGHT'] },
    width: { type: FIELD_TYPES.MFFloat, default: [0] }
  },
  Cone: {
    parts: { type: FIELD_TYPES.SFBitMask, default: ['ALL'], values: ['SIDES', 'BOTTOM', 'ALL'] },
    bottomRadius: { type: FIELD_TYPES.SFFloat, default: 1 },
    height: { type: FIELD_TYPES.SFFloat, default: 2 }
  },
  Coordinate3: {
    point: { type: FIELD_TYPES.MFVec3f, default: [[0, 0, 0]] }
  },
  Cube: {
    width: { type: FIELD_TYPES.SFFloat, default: 2 },
    height: { type: FIELD_TYPES.SFFloat, default: 2 },
    depth: { type: FIELD_TYPES.SFFloat, default: 2 }
  },
  Cylinder: {
    parts: { type: FIELD_TYPES.SFBitMask, default: ['ALL'], values: ['SIDES', 'TOP', 'BOTTOM', 'ALL'] },
    radius: { type: FIELD_TYPES.SFFloat, default: 1 },
    height: { type: FIELD_TYPES.SFFloat, default: 2 }
  },
  DirectionalLight: {
    on: { type: FIELD_TYPES.SFBool, default: true },
    intensity: { type: FIELD_TYPES.SFFloat, default: 1 },
    color: { type: FIELD_TYPES.SFColor, default: [1, 1, 1] },
    direction: { type: FIELD_TYPES.SFVec3f, default: [0, 0, -1] }
  },
  FontStyle: {
    size: { type: FIELD_TYPES.SFFloat, default: 10 },
    family: { type: FIELD_TYPES.SFEnum, default: 'SERIF', values: ['SERIF', 'SANS', 'TYPEWRITER'] },
    style: { type: FIELD_TYPES.SFBitMask, default: ['NONE'], values: ['NONE', 'BOLD', 'ITALIC'] }
  },
  IndexedFaceSet: {
    coordIndex: { type: FIELD_TYPES.MFLong, default: [0] },
    materialIndex: { type: FIELD_TYPES.MFLong, default: [-1] },
    normalIndex: { type: FIELD_TYPES.MFLong, default: [-1] },
    textureCoordIndex: { type: FIELD_TYPES.MFLong, default: [-1] }
  },
  IndexedLineSet: {
    coordIndex: { type: FIELD_TYPES.MFLong, default: [0] },
    materialIndex: { type: FIELD_TYPES.MFLong, default: [-1] },
    normalIndex: { type: FIELD_TYPES.MFLong, default: [-1] },
    textureCoordIndex: { type: FIELD_TYPES.MFLong, default: [-1] }
  },
  Info: {
    string: { type: FIELD_TYPES.SFString, default: '<Undefined info>' }
  },
  LOD: {
    range: { type: FIELD_TYPES.MFFloat, default: [] },
    center: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 0] }
  },
  Material: {
    ambientColor: { type: FIELD_TYPES.MFColor, default: [[0.2, 0.2, 0.2]] },
    diffuseColor: { type: FIELD_TYPES.MFColor, default: [[0.8, 0.8, 0.8]] },
    specularColor: { type: FIELD_TYPES.MFColor, default: [[0, 0, 0]] },
    emissiveColor: { type: FIELD_TYPES.MFColor, default: [[0, 0, 0]] },
    shininess: { type: FIELD_TYPES.MFFloat, default: [0.2] },
    transparency: { type: FIELD_TYPES.MFFloat, default: [0] }
  },
  MaterialBinding: {
    value: {
      type: FIELD_TYPES.SFEnum,
      default: 'OVERALL',
      values: [
        'DEFAULT',
        'OVERALL',
        'PER_PART',
        'PER_PART_INDEXED',
        'PER_FACE',
        'PER_FACE_INDEXED',
        'PER_VERTEX',
        'PER_VERTEX_INDEXED'
      ]
    }
  },
  MatrixTransform: {
    matrix: { type: FIELD_TYPES.SFMatrix, default: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]] }
  },
  Normal: {
    vector: { type: FIELD_TYPES.MFVec3f, default: [] }
  },
  NormalBinding: {
    value: {
      type: FIELD_TYPES.SFEnum,
      default: 'DEFAULT',
      values: [
        'DEFAULT',
        'OVERALL',
        'PER_PART',
        'PER_PART_INDEXED',
        'PER_FACE',
        'PER_FACE_INDEXED',
        'PER_VERTEX',
        'PER_VERTEX_INDEXED'
      ]
    }
  },
  OrthographicCamera: {
    position: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 1] },
    orientation: { type: FIELD_TYPES.SFRotation, default: [0, 0, 1, 0] },
    focalDistance: { type: FIELD_TYPES.SFFloat, default: 5 },
    height: { type: FIELD_TYPES.SFFloat, default: 2 }
  },
  PerspectiveCamera: {
    position: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 1] },
    orientation: { type: FIELD_TYPES.SFRotation, default: [0, 0, 1, 0] },
    focalDistance: { type: FIELD_TYPES.SFFloat, default: 5 },
    heightAngle: { type: FIELD_TYPES.SFFloat, default: 0.785398 }
  },
  PointLight: {
    on: { type: FIELD_TYPES.SFBool, default: true },
    intensity: { type: FIELD_TYPES.SFFloat, default: 1 },
    color: { type: FIELD_TYPES.SFColor, default: [1, 1, 1] },
    location: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 1] }
  },
  PointSet: {
    startIndex: { type: FIELD_TYPES.SFLong, default: 0 },
    numPoints: { type: FIELD_TYPES.SFLong, default: -1 }
  },
  Rotation: {
    rotation: { type: FIELD_TYPES.SFRotation, default: [0, 0, 1, 0] }
  },
  Scale: {
    scaleFactor: { type: FIELD_TYPES.SFVec3f, default: [1, 1, 1] }
  },
  Separator: {
    renderCulling: { type: FIELD_TYPES.SFEnum, default: 'AUTO', values: ['ON', 'OFF', 'AUTO'] }
  },
  ShapeHints: {
    vertexOrdering: { type: FIELD_TYPES.SFEnum, default: 'UNKNOWN_ORDERING', values: ['UNKNOWN_ORDERING', 'CLOCKWISE', 'COUNTERCLOCKWISE'] },
    shapeType: { type: FIELD_TYPES.SFEnum, default: 'UNKNOWN_SHAPE_TYPE', values: ['UNKNOWN_SHAPE_TYPE', 'SOLID'] },
    faceType: { type: FIELD_TYPES.SFEnum, default: 'CONVEX', values: ['UNKNOWN_FACE_TYPE', 'CONVEX'] },
    creaseAngle: { type: FIELD_TYPES.SFFloat, default: 0.5 }
  },
  Sphere: {
    radius: { type: FIELD_TYPES.SFFloat, default: 1 }
  },
  SpotLight: {
    on: { type: FIELD_TYPES.SFBool, default: true },
    intensity: { type: FIELD_TYPES.SFFloat, default: 1 },
    color: { type: FIELD_TYPES.SFVec3f, default: [1, 1, 1] },
    location: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 1] },
    direction: { type: FIELD_TYPES.SFVec3f, default: [0, 0, -1] },
    dropOffRate: { type: FIELD_TYPES.SFFloat, default: 0 },
    cutOffAngle: { type: FIELD_TYPES.SFFloat, default: 0.785398 }
  },
  Switch: {
    whichChild: { type: FIELD_TYPES.SFLong, default: -1 }
  },
  Texture2: {
    filename: { type: FIELD_TYPES.SFString, default: '' },
    image: { type: FIELD_TYPES.SFImage, default: [0, 0, 0] },
    wrapS: { type: FIELD_TYPES.SFEnum, default: 'REPEAT', values: ['REPEAT', 'CLAMP'] },
    wrapT: { type: FIELD_TYPES.SFEnum, default: 'REPEAT', values: ['REPEAT', 'CLAMP'] }
  },
  Texture2Transform: {
    translation: { type: FIELD_TYPES.SFVec2f, default: [0, 0] },
    rotation: { type: FIELD_TYPES.SFFloat, default: 0 },
    scaleFactor: { type: FIELD_TYPES.SFVec2f, default: [1, 1] },
    center: { type: FIELD_TYPES.SFVec2f, default: [0, 0] }
  },
  TextureCoordinate2: {
    point: { type: FIELD_TYPES.MFVec2f, default: [[0, 0]] }
  },
  Transform: {
    translation: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 0] },
    rotation: { type: FIELD_TYPES.SFRotation, default: [0, 0, 1, 0] },
    scaleFactor: { type: FIELD_TYPES.SFVec3f, default: [1, 1, 1] },
    scaleOrientation: { type: FIELD_TYPES.SFRotation, default: [0, 0, 1, 0] },
    center: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 0] }
  },
  Translation: {
    translation: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 0] }
  },
  WWWAnchor: {
    name: { type: FIELD_TYPES.SFString, default: '' },
    description: { type: FIELD_TYPES.SFString, default: '' },
    map: { type: FIELD_TYPES.SFEnum, default: 'NONE', values: ['NONE', 'POINT'] }
  },
  WWWInline: {
    name: { type: FIELD_TYPES.SFString, default: '' },
    bboxSize: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 0] },
    bboxCenter: { type: FIELD_TYPES.SFVec3f, default: [0, 0, 0] }
  }
};

exports.TOKENS = TOKENS;
exports.FIELD_TYPES = FIELD_TYPES;
exports.FIELDS = FIELDS;
exports.maxTokenVal = maxTokenVal;