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
for (var T in TOKENS)
  TOKENS[TOKENS[T]] = T;
C=0;
var FIELD_TOKENS = {
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
for (var T in FIELD_TOKENS)
  FIELD_TOKENS[FIELD_TOKENS[T]] = T;
C=0;
var ENUMS = {
  justification: { LEFT: C++, CENTER: C++, RIGHT: C++ },
  family: { SERIF: C++, SANS: C++, TYPEWRITER: C++ },
  value: {
    DEFAULT: C++,
    OVERALL: C++,
    PER_PART: C++,
    PER_PART_INDEXED: C++,
    PER_FACE: C++,
    PER_FACE_INDEXED: C++,
    PER_VERTEX: C++,
    PER_VERTEX_INDEXED: C++
  },
  renderCulling: { ON: C++, OFF: C++, AUTO: C++ },
  vertexOrdering: { UNKNOWN_ORDERING: C++, CLOCKWISE: C++, COUNTERCLOCKWISE: C++ },
  shapeType: { UNKNOWN_SHAPE_TYPE: C++, SOLID: C++ },
  faceType: { UNKNOWN_FACE_TYPE: C++, CONVEX: C++ },
  wrapS: { REPEAT: C++, CLAMP: C++ },
  wrapT: { REPEAT: C++, CLAMP: C++ },
  map: { NONE: C++, POINT: C++ },
  // these are not really enums, but they contain literal values:
  partsCone: { SIDES: 1, BOTTOM: 2, ALL: 3 },
  partsCyl: { SIDES: 1, TOP: 2, BOTTOM: 4, ALL: 7 },
  style: { NONE: 0, BOLD: 1, ITALIC: 2 },
  bool: { 0: false, 1: true, TRUE: true, FALSE: false }
};
var FIELD_DEFS = {
  AsciiText: {
    string: { type: FIELD_TOKENS.MFString, default: '' },
    spacing: { type: FIELD_TOKENS.SFFloat, default: 1 },
    justification: { type: FIELD_TOKENS.SFEnum, default: ENUMS.justification.LEFT },
    width: { type: FIELD_TOKENS.MFFloat, default: 0 }
  },
  Cone: {
    parts: { type: FIELD_TOKENS.SFBitMask, default: ENUMS.partsCone.ALL },
    bottomRadius: { type: FIELD_TOKENS.SFFloat, default: 1 },
    height: { type: FIELD_TOKENS.SFFloat, default: 2 }
  },
  Coordinate3: {
    point: { type: FIELD_TOKENS.MFVec3f, default: [0, 0, 0] }
  },
  Cube: {
    width: { type: FIELD_TOKENS.SFFloat, default: 2 },
    height: { type: FIELD_TOKENS.SFFloat, default: 2 },
    depth: { type: FIELD_TOKENS.SFFloat, default: 2 }
  },
  Cylinder: {
    parts: { type: FIELD_TOKENS.SFBitMask, default: ENUMS.partsCyl.ALL },
    radius: { type: FIELD_TOKENS.SFFloat, default: 1 },
    height: { type: FIELD_TOKENS.SFFloat, default: 2 }
  },
  DirectionalLight: {
    on: { type: FIELD_TOKENS.SFBool, default: ENUMS.bool.TRUE },
    intensity: { type: FIELD_TOKENS.SFFloat, default: 1 },
    color: { type: FIELD_TOKENS.SFColor, default: [1, 1, 1] },
    direction: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, -1] }
  },
  FontStyle: {
    size: { type: FIELD_TOKENS.SFFloat, default: 10 },
    family: { type: FIELD_TOKENS.SFEnum, default: ENUMS.family.SERIF },
    style: { type: FIELD_TOKENS.SFBitMask, default: ENUMS.style.NONE }
  },
  IndexedFaceSet: {
    coordIndex: { type: FIELD_TOKENS.MFLong, default: [0] },
    materialIndex: { type: FIELD_TOKENS.MFLong, default: [-1] },
    normalIndex: { type: FIELD_TOKENS.MFLong, default: [-1] },
    textureCoordIndex: { type: FIELD_TOKENS.MFLong, default: [-1] }
  },
  IndexedLineSet: {
    coordIndex: { type: FIELD_TOKENS.MFLong, default: [0] },
    materialIndex: { type: FIELD_TOKENS.MFLong, default: [-1] },
    normalIndex: { type: FIELD_TOKENS.MFLong, default: [-1] },
    textureCoordIndex: { type: FIELD_TOKENS.MFLong, default: [-1] }
  },
  Info: {
    string: { type: FIELD_TOKENS.SFString, default: '<Undefined info>' }
  },
  LOD: {
    range: { type: FIELD_TOKENS.MFFloat, default: [] },
    center: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 0] }
  },
  Material: {
    ambientColor: { type: FIELD_TOKENS.MFColor, default: [0.2, 0.2, 0.2] },
    diffuseColor: { type: FIELD_TOKENS.MFColor, default: [0.8, 0.8, 0.8] },
    specularColor: { type: FIELD_TOKENS.MFColor, default: [0, 0, 0] },
    emissiveColor: { type: FIELD_TOKENS.MFColor, default: [0, 0, 0] },
    shininess: { type: FIELD_TOKENS.MFFloat, default: [0.2] },
    transparency: { type: FIELD_TOKENS.MFFloat, default: [0] }
  },
  MaterialBinding: {
    value: { type: FIELD_TOKENS.SFEnum, default: ENUMS.value.OVERALL }
  },
  MatrixTransform: {
    matrix: { type: FIELD_TOKENS.SFMatrix, default: [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]] }
  },
  Normal: {
    vector: { type: FIELD_TOKENS.MFVec3f, default: [] }
  },
  NormalBinding: {
    value: { type: FIELD_TOKENS.SFEnum, default: ENUMS.value.DEFAULT }
  },
  OrthographicCamera: {
    position: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 1] },
    orientation: { type: FIELD_TOKENS.SFRotation, default: [0, 0, 1, 0] },
    focalDistance: { type: FIELD_TOKENS.SFFloat, default: 5 },
    height: { type: FIELD_TOKENS.SFFloat, default: 2 }
  },
  PerspectiveCamera: {
    position: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 1] },
    orientation: { type: FIELD_TOKENS.SFRotation, default: [0, 0, 1, 0] },
    focalDistance: { type: FIELD_TOKENS.SFFloat, default: 5 },
    heightAngle: { type: FIELD_TOKENS.SFFloat, default: 0.785398 }
  },
  PointLight: {
    on: { type: FIELD_TOKENS.SFBool, default: ENUMS.bool.TRUE },
    intensity: { type: FIELD_TOKENS.SFFloat, default: 1 },
    color: { type: FIELD_TOKENS.SFColor, default: [1, 1, 1] },
    location: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 1] }
  },
  PointSet: {
    startIndex: { type: FIELD_TOKENS.SFLong, default: 0 },
    numPoints: { type: FIELD_TOKENS.SFLong, default: -1 }
  },
  Rotation: {
    rotation: { type: FIELD_TOKENS.SFRotation, default: [0, 0, 1, 0] }
  },
  Scale: {
    scaleFactor: { type: FIELD_TOKENS.SFVec3f, default: [1, 1, 1] }
  },
  Separator: {
    renderCulling: { type: FIELD_TOKENS.SFEnum, default: ENUMS.renderCulling.AUTO }
  },
  ShapeHints: {
    vertexOrdering: { type: FIELD_TOKENS.SFEnum, default: ENUMS.vertexOrdering.UNKNOWN_ORDERING },
    shapeType: { type: FIELD_TOKENS.SFEnum, default: ENUMS.shapeType.UNKNOWN_SHAPE_TYPE },
    faceType: { type: FIELD_TOKENS.SFEnum, default: ENUMS.faceType.CONVEX },
    creaseAngle: { type: FIELD_TOKENS.SFFloat, default: 0.5 }
  },
  Sphere: {
    radius: { type: FIELD_TOKENS.SFFloat, default: 1 }
  },
  SpotLight: {
    on: { type: FIELD_TOKENS.SFBool, default: ENUMS.bool.TRUE },
    intensity: { type: FIELD_TOKENS.SFFloat, default: 1 },
    color: { type: FIELD_TOKENS.SFVec3f, default: [1, 1, 1] },
    location: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 1] },
    direction: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, -1] },
    dropOffRate: { type: FIELD_TOKENS.SFFloat, default: 0 },
    cutOffAngle: { type: FIELD_TOKENS.SFFloat, default: 0.785398 }
  },
  Switch: {
    whichChild: { type: FIELD_TOKENS.SFLong, default: -1 }
  },
  Texture2: {
    filename: { type: FIELD_TOKENS.SFString, default: '' },
    image: { type: FIELD_TOKENS.SFImage, default: [0, 0, 0] },
    wrapS: { type: FIELD_TOKENS.SFEnum, default: ENUMS.wrapS.REPEAT },
    wrapT: { type: FIELD_TOKENS.SFEnum, default: ENUMS.wrapT.REPEAT }
  },
  Texture2Transform: {
    translation: { type: FIELD_TOKENS.SFVec2f, default: [0, 0] },
    rotation: { type: FIELD_TOKENS.SFFloat, default: 0 },
    scaleFactor: { type: FIELD_TOKENS.SFVec2f, default: [1, 1] },
    center: { type: FIELD_TOKENS.SFVec2f, default: [0, 0] }
  },
  TextureCoordinate2: {
    point: { type: FIELD_TOKENS.MFVec2f, default: [0, 0] }
  },
  Transform: {
    translation: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 0] },
    rotation: { type: FIELD_TOKENS.SFRotation, default: [0, 0, 1, 0] },
    scaleFactor: { type: FIELD_TOKENS.SFVec3f, default: [1, 1, 1] },
    scaleOrientation: { type: FIELD_TOKENS.SFRotation, default: [0, 0, 1, 0] },
    center: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 0] }
  },
  Translation: {
    translation: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 0] }
  },
  WWWAnchor: {
    name: { type: FIELD_TOKENS.SFString, default: '' },
    description: { type: FIELD_TOKENS.SFString, default: '' },
    map: { type: FIELD_TOKENS.SFEnum, default: ENUMS.map.NONE }
  },
  WWWInline: {
    name: { type: FIELD_TOKENS.SFString, default: '' },
    bboxSize: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 0] },
    bboxCenter: { type: FIELD_TOKENS.SFVec3f, default: [0, 0, 0] }
  }
};

exports.TOKENS = TOKENS;
exports.FIELD_TOKENS = FIELD_TOKENS;
exports.ENUMS = ENUMS;
exports.FIELD_DEFS = FIELD_DEFS;
