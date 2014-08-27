wiggle
======

Simple webgl helpers.

Functions:

    initGL(canvas)          //<- creates & returns "gl"
    initShader(gl, canvas)  //<- compiles & sets up the shader program with defaults
    render()                //<- called 60 times per second. override it.
    startRendering()        //<- call this to start calling render().
    stopRendering()         //<- call this to stop calling render().

Simple Usage:

```
var canvas = document.getElementById("canvas");
var gl     = initGL(canvas);
var shader = initShader(gl, canvas);

// setup some buffers(s)...

function render() {
  // draw...
}

startRendering();
```


Full Example:

    https://github.com/devops001/wiggle/blob/master/example_triangle.html

    glMatrix.js is from:  https://github.com/toji/gl-matrix

