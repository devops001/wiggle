


var canvas = document.getElementById("canvas");
var gl     = initGL(canvas);
var shader = initShader(gl, canvas);

setupShaderLocations(gl, shader);
setupShaderMatrices(shader, canvas);
setShaderUniformValues(gl, shader);

var vertices = [
   0.0,  1.0, 0.0,
  -1.0, -1.0, 0.0,
   1.0, -1.0, 0.0
];

var buffer = setupBuffer(gl, vertices, 3);

startRendering();

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(shader);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(shader.loc.position, buffer.numFloatsPerVertex, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, buffer.numVertices);
}

function setupBuffer(gl, vertices, numFloatsPerVertex) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  buffer.numFloatsPerVertex = numFloatsPerVertex;
  buffer.numVertices        = vertices.length / numFloatsPerVertex;
  return buffer;
}

