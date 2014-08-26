///////////////////////////////////////////////////////////////////////////////////////////////////////
// File:      wiggle.js
// Purpose:   a few simple helper functions to get webgl up & running
// Author:    Ryan McDonald <devops001@gmail.com> 
// Date:      2014.08.25
// Note:      put shader code in html ids: vertex_shader, fragment_shader 
// Functions: 
//            initGL(gl,canvas)  //<- sets common gl flags
//            initShader(gl)     //<- compiles & sets up the shader for use
//            render()           //<- called 60 times per second. override it.
//            startRendering()   //<- call this to start calling render().
//            stopRendering()    //<- call this to stop calling render().
///////////////////////////////////////////////////////////////////////////////////////////////////

function initGL(gl, canvas) {
  gl.clearColor(0.2, 0.3, 0.4, 1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function initShader(gl) {
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

