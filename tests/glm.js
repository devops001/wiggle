
var glm = {

  vec3: function(x, y, z) {
    var vec = {};    
    vec.x = typeof x !== 'undefined' ? x : 0;
    vec.y = typeof y !== 'undefined' ? y : 0;
    vec.z = typeof z !== 'undefined' ? z : 0;

    vec.toArray = function() {
      var a = new Float32Array(3);
      a[0]=vec.x; a[1]=vec.y; a[2]=vec.z;
      return a;
    }

    return vec;
  },

  vec4: function(x, y, z, w) {
    var vec = {};    
    vec.x = typeof x !== 'undefined' ? x : 0;
    vec.y = typeof y !== 'undefined' ? y : 0;
    vec.z = typeof z !== 'undefined' ? z : 0;
    vec.w = typeof w !== 'undefined' ? w : 0;

    vec.toArray = function() {
      var a = new Float32Array(4);
      a[0]=vec.x; a[1]=vec.y; a[2]=vec.z; a[3]=vec.w;
      return a;
    }

    return vec;
  },

  mat4: function() {
    var mat = new Float32Array(16);
    mat.identity = function() {
      mat[0]  = 1; mat[1]  = 0; mat[2]  = 0; mat[3]  = 0;
      mat[4]  = 0; mat[5]  = 1; mat[6]  = 0; mat[7]  = 0;
      mat[8]  = 0; mat[9]  = 0; mat[10] = 1; mat[11] = 0;
      mat[12] = 0; mat[13] = 0; mat[14] = 0; mat[15] = 1;
      return mat;
    }

    mat.mult = function(vec4) {
      var x = mat[0]*vec4.x  + mat[1]*vec4.y  + mat[2]*vec4.z  + mat[3]*vec4.w;
      var y = mat[4]*vec4.x  + mat[5]*vec4.y  + mat[6]*vec4.z  + mat[7]*vec4.w;
      var z = mat[8]*vec4.x  + mat[9]*vec4.y  + mat[10]*vec4.z + mat[11]*vec4.w;
      var w = mat[12]*vec4.x + mat[13]*vec4.y + mat[14]*vec4.z + mat[15]*vec4.w;
      return glm.vec4(x, y, z, w);
    }

    mat.identity();
    return mat;  
  },

  // returns a 4x4 translation matrix:
  translate: function(x, y, z) {
    // [ 1 0 0 x ]
    // [ 0 1 0 y ]
    // [ 0 0 1 z ]
    // [ 0 0 0 1 ]
    var m = glm.mat4();
    m[3]  = x;
    m[7]  = y;
    m[11] = z;
    return m;
  }

}

//
// simple example from opengl-tutorial.org tutorial #3:
//

var translationMat4 = glm.translate(10, 0, 0);        //<- moves x by +10
console.log("translationMat4: ");
console.log(translationMat4);

var position = glm.vec4(10, 10, 10, 1);               //<- orig position
console.log("position: ");
console.log(position.toArray());

var translated = translationMat4.mult(position);
console.log("translated position: ");
console.log(translated.toArray());







