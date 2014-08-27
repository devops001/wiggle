////////////////////////////////////////////////////////////////////////////////////////////////////
// File:      wiggle.js
// Purpose:   A few simple helper functions to get webgl up & running
// Author:    Ryan McDonald <devops001@gmail.com> 
// Date:      2014.08.25
///////////////////////////////////////////////////////////////////////////////////////////////////

function initGL(canvas) {
  var gl = canvas.getContext("webgl");
  gl.clearColor(0.2, 0.3, 0.4, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.viewport(0, 0, canvas.width, canvas.height);
  return gl;
}

function initShader(gl, canvas) {

  function createShader(shaderType, shaderSource) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var error = gl.getShaderInfoLog(shader);
      var name  = shaderType==gl.VERTEX_SHADER ? "vertex shader" : "fragment shader";
      console.log(name +" failed to compile. error: "+ error +"\nsource:\n"+ shaderSource);
      return null;
    }
    return shader;
  }

  function setupShaderLocations(gl, shaderProgram) {
    shaderProgram.loc = {};
    shaderProgram.loc.position          = gl.getAttribLocation(shaderProgram,  "position");
    shaderProgram.loc.modelViewMatrix   = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    shaderProgram.loc.perspectiveMatrix = gl.getUniformLocation(shaderProgram, "perspectiveMatrix");
    gl.enableVertexAttribArray(shaderProgram.loc.position);
  }
  
  function setupShaderMatrices(shaderProgram, canvas) {
    shaderProgram.mat4 = {};
    shaderProgram.mat4.perspective = mat4.create();
    shaderProgram.mat4.modelView   = mat4.create();
    mat4.perspective(45.0, canvas.width/canvas.height, 0.1, 100.0, shaderProgram.mat4.perspective);
    mat4.identity(shaderProgram.mat4.modelView);
  }
  
  function setShaderUniformValues(gl, shaderProgram) {
    gl.uniformMatrix4fv(shaderProgram.loc.modelViewMatrix,   false, shaderProgram.mat4.modelView);
    gl.uniformMatrix4fv(shaderProgram.loc.perspectiveMatrix, false, shaderProgram.mat4.perspective);
  }

  var vertexSource   = document.getElementById("vertex_shader").text;
  var fragmentSource = document.getElementById("fragment_shader").text;
  var vertexShader   = createShader(gl.VERTEX_SHADER, vertexSource);
  var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);
  var shaderProgram  = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    var error = gl.getProgramInfoLog(shaderProgram);
    console.log("shader program failed to link: "+ error);
    gl.deleteProgram(shaderProgram);
    return null;
  }

  gl.useProgram(shaderProgram);

  setupShaderLocations(gl, shaderProgram);
  setupShaderMatrices(shaderProgram, canvas);
  setShaderUniformValues(gl, shaderProgram);

  return shaderProgram;
}

function render() {
  console.log("override the render() function to render things.");
}

function startRendering() {
  function renderLoop() {
    window.currentFrame = window.requestAnimationFrame(renderLoop);
    render();
  }
  renderLoop();
}

function stopRendering() {
  window.cancelAnimationFrame(window.currentFrame);
}


