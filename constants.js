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
  MFVec3f: C++,
  // Names
  string: C++,
  spacing: C++,
  justification: C++,
  width: C++,
  parts: C++,
  bottomRadius: C++,
  height: C++,
  point: C++,
  depth: C++,
  radius: C++,
  on: C++,
  intensity: C++,
  color: C++,
  direction: C++,
  size: C++,
  family: C++,
  style: C++,
  coordIndex: C++,
  materialIndex: C++,
  normalIndex: C++,
  textureCoordIndex: C++,
  range: C++,
  center: C++,
  ambientColor: C++,
  diffuseColor: C++,
  specularColor: C++,
  emissiveColor: C++,
  shininess: C++,
  transparency: C++,
  value: C++,
  matrix: C++,
  vector: C++,
  position: C++,
  orientation: C++,
  focalDistance: C++,
  heightAngle: C++,
  location: C++,
  startIndex: C++,
  numPoints: C++,
  rotation: C++,
  scaleFactor: C++,
  renderCulling: C++,
  vertexOrdering: C++,
  shapeType: C++,
  faceType: C++,
  creaseAngle: C++,
  dropOffRate: C++,
  cutOffAngle: C++,
  whichChild: C++,
  filename: C++,
  image: C++,
  wrapS: C++,
  wrapT: C++,
  translation: C++,
  scaleOrientation: C++,
  name: C++,
  description: C++,
  map: C++,
  bboxSize: C++,
  bboxCenter: C++
};
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
var FIELD_DEFS = {};
FIELD_DEFS[TOKENS.AsciiText] = {};
FIELD_DEFS[TOKENS.AsciiText][FIELD_TOKENS.string] = [FIELD_TOKENS.MFString, ''];
FIELD_DEFS[TOKENS.AsciiText][FIELD_TOKENS.spacing] = [FIELD_TOKENS.SFFloat, 1];
FIELD_DEFS[TOKENS.AsciiText][FIELD_TOKENS.justification] = [FIELD_TOKENS.SFEnum, ENUMS.justification.LEFT];
FIELD_DEFS[TOKENS.AsciiText][FIELD_TOKENS.width] = [FIELD_TOKENS.MFFloat, 0];
FIELD_DEFS[TOKENS.Cone] = {};
FIELD_DEFS[TOKENS.Cone][FIELD_TOKENS.parts] = [FIELD_TOKENS.SFBitMask, ENUMS.partsCone.ALL];
FIELD_DEFS[TOKENS.Cone][FIELD_TOKENS.bottomRadius] = [FIELD_TOKENS.SFFloat, 1];
FIELD_DEFS[TOKENS.Cone][FIELD_TOKENS.height] = [FIELD_TOKENS.SFFloat, 2];
FIELD_DEFS[TOKENS.Coordinate3] = {};
FIELD_DEFS[TOKENS.Coordinate3][FIELD_TOKENS.point] = [FIELD_TOKENS.MFVec3f, [0, 0, 0]];
FIELD_DEFS[TOKENS.Cube] = {};
FIELD_DEFS[TOKENS.Cube][FIELD_TOKENS.width] = [FIELD_TOKENS.SFFloat, 2];
FIELD_DEFS[TOKENS.Cube][FIELD_TOKENS.height] = [FIELD_TOKENS.SFFloat, 2];
FIELD_DEFS[TOKENS.Cube][FIELD_TOKENS.depth] = [FIELD_TOKENS.SFFloat, 2];
FIELD_DEFS[TOKENS.Cylinder] = {};
FIELD_DEFS[TOKENS.Cylinder][FIELD_TOKENS.parts] = [FIELD_TOKENS.SFBitMask, ENUMS.partsCyl.ALL];
FIELD_DEFS[TOKENS.Cylinder][FIELD_TOKENS.radius] = [FIELD_TOKENS.SFFloat, 1];
FIELD_DEFS[TOKENS.Cylinder][FIELD_TOKENS.height] = [FIELD_TOKENS.SFFloat, 2];
FIELD_DEFS[TOKENS.DirectionalLight] = {};
FIELD_DEFS[TOKENS.DirectionalLight][FIELD_TOKENS.on] = [FIELD_TOKENS.SFBool, ENUMS.bool.TRUE];
FIELD_DEFS[TOKENS.DirectionalLight][FIELD_TOKENS.intensity] = [FIELD_TOKENS.SFFloat, 1];
FIELD_DEFS[TOKENS.DirectionalLight][FIELD_TOKENS.color] = [FIELD_TOKENS.SFColor, [1, 1, 1]];
FIELD_DEFS[TOKENS.DirectionalLight][FIELD_TOKENS.direction] = [FIELD_TOKENS.SFVec3f, [0, 0, -1]];
FIELD_DEFS[TOKENS.FontStyle] = {};
FIELD_DEFS[TOKENS.FontStyle][FIELD_TOKENS.size] = [FIELD_TOKENS.SFFloat, 10];
FIELD_DEFS[TOKENS.FontStyle][FIELD_TOKENS.family] = [FIELD_TOKENS.SFEnum, ENUMS.family.SERIF];
FIELD_DEFS[TOKENS.FontStyle][FIELD_TOKENS.style] = [FIELD_TOKENS.SFBitMask, ENUMS.style.NONE];
FIELD_DEFS[TOKENS.IndexedFaceSet] = {};
FIELD_DEFS[TOKENS.IndexedFaceSet][FIELD_TOKENS.coordIndex] = [FIELD_TOKENS.MFLong, [0]];
FIELD_DEFS[TOKENS.IndexedFaceSet][FIELD_TOKENS.materialIndex] = [FIELD_TOKENS.MFLong, [-1]];
FIELD_DEFS[TOKENS.IndexedFaceSet][FIELD_TOKENS.normalIndex] = [FIELD_TOKENS.MFLong, [-1]];
FIELD_DEFS[TOKENS.IndexedFaceSet][FIELD_TOKENS.textureCoordIndex] = [FIELD_TOKENS.MFLong, [-1]];
FIELD_DEFS[TOKENS.IndexedLineSet] = {};
FIELD_DEFS[TOKENS.IndexedLineSet][FIELD_TOKENS.coordIndex] = [FIELD_TOKENS.MFLong, [0]];
FIELD_DEFS[TOKENS.IndexedLineSet][FIELD_TOKENS.materialIndex] = [FIELD_TOKENS.MFLong, [-1]];
FIELD_DEFS[TOKENS.IndexedLineSet][FIELD_TOKENS.normalIndex] = [FIELD_TOKENS.MFLong, [-1]];
FIELD_DEFS[TOKENS.IndexedLineSet][FIELD_TOKENS.textureCoordIndex] = [FIELD_TOKENS.MFLong, [-1]];
FIELD_DEFS[TOKENS.Info] = {};
FIELD_DEFS[TOKENS.Info][FIELD_TOKENS.string] = [FIELD_TOKENS.SFString, '<Undefined info>'];
FIELD_DEFS[TOKENS.LOD] = {};
FIELD_DEFS[TOKENS.LOD][FIELD_TOKENS.range] = [FIELD_TOKENS.MFFloat, []];
FIELD_DEFS[TOKENS.LOD][FIELD_TOKENS.center] = [FIELD_TOKENS.SFVec3f, [0, 0, 0]];
FIELD_DEFS[TOKENS.Material] = {};
FIELD_DEFS[TOKENS.Material][FIELD_TOKENS.ambientColor] = [FIELD_TOKENS.MFColor, [0.2, 0.2, 0.2]];
FIELD_DEFS[TOKENS.Material][FIELD_TOKENS.diffuseColor] = [FIELD_TOKENS.MFColor, [0.8, 0.8, 0.8]];
FIELD_DEFS[TOKENS.Material][FIELD_TOKENS.specularColor] = [FIELD_TOKENS.MFColor, [0, 0, 0]];
FIELD_DEFS[TOKENS.Material][FIELD_TOKENS.emissiveColor] = [FIELD_TOKENS.MFColor, [0, 0, 0]];
FIELD_DEFS[TOKENS.Material][FIELD_TOKENS.shininess] = [FIELD_TOKENS.MFFloat, [0.2]];
FIELD_DEFS[TOKENS.Material][FIELD_TOKENS.transparency] = [FIELD_TOKENS.MFFloat, [0]];
FIELD_DEFS[TOKENS.MaterialBinding] = {};
FIELD_DEFS[TOKENS.MaterialBinding][FIELD_TOKENS.value] = [FIELD_TOKENS.SFEnum, ENUMS.value.OVERALL];
FIELD_DEFS[TOKENS.MatrixTransform] = {};
FIELD_DEFS[TOKENS.MatrixTransform][FIELD_TOKENS.matrix] = [FIELD_TOKENS.SFMatrix, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]];
FIELD_DEFS[TOKENS.Normal] = {};
FIELD_DEFS[TOKENS.Normal][FIELD_TOKENS.vector] = [FIELD_TOKENS.MFVec3f, []];
FIELD_DEFS[TOKENS.NormalBinding] = {};
FIELD_DEFS[TOKENS.NormalBinding][FIELD_TOKENS.value] = [FIELD_TOKENS.SFEnum, ENUMS.value.DEFAULT];
FIELD_DEFS[TOKENS.OrthographicCamera] = {};
FIELD_DEFS[TOKENS.OrthographicCamera][FIELD_TOKENS.position] = [FIELD_TOKENS.SFVec3f, [0, 0, 1]];
FIELD_DEFS[TOKENS.OrthographicCamera][FIELD_TOKENS.orientation] = [FIELD_TOKENS.SFRotation, [0, 0, 1, 0]];
FIELD_DEFS[TOKENS.OrthographicCamera][FIELD_TOKENS.focalDistance] = [FIELD_TOKENS.SFFloat, 5];
FIELD_DEFS[TOKENS.OrthographicCamera][FIELD_TOKENS.height] = [FIELD_TOKENS.SFFloat, 2];
FIELD_DEFS[TOKENS.PerspectiveCamera] = {};
FIELD_DEFS[TOKENS.PerspectiveCamera][FIELD_TOKENS.position] = [FIELD_TOKENS.SFVec3f, [0, 0, 1]];
FIELD_DEFS[TOKENS.PerspectiveCamera][FIELD_TOKENS.orientation] = [FIELD_TOKENS.SFRotation, [0, 0, 1, 0]];
FIELD_DEFS[TOKENS.PerspectiveCamera][FIELD_TOKENS.focalDistance] = [FIELD_TOKENS.SFFloat, 5];
FIELD_DEFS[TOKENS.PerspectiveCamera][FIELD_TOKENS.heightAngle] = [FIELD_TOKENS.SFFloat, 0.785398];
FIELD_DEFS[TOKENS.PointLight] = {};
FIELD_DEFS[TOKENS.PointLight][FIELD_TOKENS.on] = [FIELD_TOKENS.SFBool, ENUMS.bool.TRUE];
FIELD_DEFS[TOKENS.PointLight][FIELD_TOKENS.intensity] = [FIELD_TOKENS.SFFloat, 1];
FIELD_DEFS[TOKENS.PointLight][FIELD_TOKENS.color] = [FIELD_TOKENS.SFColor, [1, 1, 1]];
FIELD_DEFS[TOKENS.PointLight][FIELD_TOKENS.location] = [FIELD_TOKENS.SFVec3f, [0, 0, 1]];
FIELD_DEFS[TOKENS.PointSet] = {};
FIELD_DEFS[TOKENS.PointSet][FIELD_TOKENS.startIndex] = [FIELD_TOKENS.SFLong, 0];
FIELD_DEFS[TOKENS.PointSet][FIELD_TOKENS.numPoints] = [FIELD_TOKENS.SFLong, -1];
FIELD_DEFS[TOKENS.Rotation] = {};
FIELD_DEFS[TOKENS.Rotation][FIELD_TOKENS.rotation] = [FIELD_TOKENS.SFRotation, [0, 0, 1, 0]];
FIELD_DEFS[TOKENS.Scale] = {};
FIELD_DEFS[TOKENS.Scale][FIELD_TOKENS.scaleFactor] = [FIELD_TOKENS.SFVec3f, [1, 1, 1]];
FIELD_DEFS[TOKENS.Separator] = {};
FIELD_DEFS[TOKENS.Separator][FIELD_TOKENS.renderCulling] = [FIELD_TOKENS.SFEnum, ENUMS.renderCulling.AUTO];
FIELD_DEFS[TOKENS.ShapeHints] = {};
FIELD_DEFS[TOKENS.ShapeHints][FIELD_TOKENS.vertexOrdering] = [FIELD_TOKENS.SFEnum, ENUMS.vertexOrdering.UNKNOWN_ORDERING];
FIELD_DEFS[TOKENS.ShapeHints][FIELD_TOKENS.shapeType] = [FIELD_TOKENS.SFEnum, ENUMS.shapeType.UNKNOWN_SHAPE_TYPE];
FIELD_DEFS[TOKENS.ShapeHints][FIELD_TOKENS.faceType] = [FIELD_TOKENS.SFEnum, ENUMS.faceType.CONVEX];
FIELD_DEFS[TOKENS.ShapeHints][FIELD_TOKENS.creaseAngle] = [FIELD_TOKENS.SFFloat, 0.5];
FIELD_DEFS[TOKENS.Sphere] = {};
FIELD_DEFS[TOKENS.Sphere][FIELD_TOKENS.radius] = [FIELD_TOKENS.SFFloat, 1];
FIELD_DEFS[TOKENS.SpotLight] = {};
FIELD_DEFS[TOKENS.SpotLight][FIELD_TOKENS.on] = [FIELD_TOKENS.SFBool, ENUMS.bool.TRUE];
FIELD_DEFS[TOKENS.SpotLight][FIELD_TOKENS.intensity] = [FIELD_TOKENS.SFFloat, 1];
FIELD_DEFS[TOKENS.SpotLight][FIELD_TOKENS.color] = [FIELD_TOKENS.SFVec3f, [1, 1, 1]];
FIELD_DEFS[TOKENS.SpotLight][FIELD_TOKENS.location] = [FIELD_TOKENS.SFVec3f, [0, 0, 1]];
FIELD_DEFS[TOKENS.SpotLight][FIELD_TOKENS.direction] = [FIELD_TOKENS.SFVec3f, [0, 0, -1]];
FIELD_DEFS[TOKENS.SpotLight][FIELD_TOKENS.dropOffRate] = [FIELD_TOKENS.SFFloat, 0];
FIELD_DEFS[TOKENS.SpotLight][FIELD_TOKENS.cutOffAngle] = [FIELD_TOKENS.SFFloat, 0.785398];
FIELD_DEFS[TOKENS.Switch] = {};
FIELD_DEFS[TOKENS.Switch][FIELD_TOKENS.whichChild] = [FIELD_TOKENS.SFLong, -1];
FIELD_DEFS[TOKENS.Texture2] = {};
FIELD_DEFS[TOKENS.Texture2][FIELD_TOKENS.filename] = [FIELD_TOKENS.SFString, ''];
FIELD_DEFS[TOKENS.Texture2][FIELD_TOKENS.image] = [FIELD_TOKENS.SFImage, [0, 0, 0]];
FIELD_DEFS[TOKENS.Texture2][FIELD_TOKENS.wrapS] = [FIELD_TOKENS.SFEnum, ENUMS.wrapS.REPEAT];
FIELD_DEFS[TOKENS.Texture2][FIELD_TOKENS.wrapT] = [FIELD_TOKENS.SFEnum, ENUMS.wrapT.REPEAT];
FIELD_DEFS[TOKENS.Texture2Transform] = {};
FIELD_DEFS[TOKENS.Texture2Transform][FIELD_TOKENS.translation] = [FIELD_TOKENS.SFVec2f, [0, 0]];
FIELD_DEFS[TOKENS.Texture2Transform][FIELD_TOKENS.rotation] = [FIELD_TOKENS.SFFloat, 0];
FIELD_DEFS[TOKENS.Texture2Transform][FIELD_TOKENS.scaleFactor] = [FIELD_TOKENS.SFVec2f, [1, 1]];
FIELD_DEFS[TOKENS.Texture2Transform][FIELD_TOKENS.center] = [FIELD_TOKENS.SFVec2f, [0, 0]];
FIELD_DEFS[TOKENS.TextureCoordinate2] = {};
FIELD_DEFS[TOKENS.TextureCoordinate2][FIELD_TOKENS.point] = [FIELD_TOKENS.MFVec2f, [0, 0]];
FIELD_DEFS[TOKENS.Transform] = {};
FIELD_DEFS[TOKENS.Transform][FIELD_TOKENS.translation] = [FIELD_TOKENS.SFVec3f, [0, 0, 0]];
FIELD_DEFS[TOKENS.Transform][FIELD_TOKENS.rotation] = [FIELD_TOKENS.SFRotation, [0, 0, 1, 0]];
FIELD_DEFS[TOKENS.Transform][FIELD_TOKENS.scaleFactor] = [FIELD_TOKENS.SFVec3f, [1, 1, 1]];
FIELD_DEFS[TOKENS.Transform][FIELD_TOKENS.scaleOrientation] = [FIELD_TOKENS.SFRotation, [0, 0, 1, 0]];
FIELD_DEFS[TOKENS.Transform][FIELD_TOKENS.center] = [FIELD_TOKENS.SFVec3f, [0, 0, 0]];
FIELD_DEFS[TOKENS.Translation] = {};
FIELD_DEFS[TOKENS.Translation][FIELD_TOKENS.translation] = [FIELD_TOKENS.SFVec3f, [0, 0, 0]];
FIELD_DEFS[TOKENS.WWWAnchor] = {};
FIELD_DEFS[TOKENS.WWWAnchor][FIELD_TOKENS.name] = [FIELD_TOKENS.SFString, ''];
FIELD_DEFS[TOKENS.WWWAnchor][FIELD_TOKENS.description] = [FIELD_TOKENS.SFString, ''];
FIELD_DEFS[TOKENS.WWWAnchor][FIELD_TOKENS.map] = [FIELD_TOKENS.SFEnum, ENUMS.map.NONE];
FIELD_DEFS[TOKENS.WWWInline] = {};
FIELD_DEFS[TOKENS.WWWInline][FIELD_TOKENS.name] = [FIELD_TOKENS.SFString, ''];
FIELD_DEFS[TOKENS.WWWInline][FIELD_TOKENS.bboxSize] = [FIELD_TOKENS.SFVec3f, [0, 0, 0]];
FIELD_DEFS[TOKENS.WWWInline][FIELD_TOKENS.bboxCenter] = [FIELD_TOKENS.SFVec3f, [0, 0, 0]];

exports.TOKENS = TOKENS;
exports.FIELD_TOKENS = FIELD_TOKENS;
exports.ENUMS = ENUMS;
exports.FIELD_DEFS = FIELD_DEFS;
