wiggle
======

webgl helper functions. 

* Attempts to call render() 60 times per second
* Pauses rendering when out of focus

Interface:

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

// ...

function render() {
  // set shader values, bind buffers, draw triangles...
}

startRendering();
```

[Examples](examples/)

    
glMatrix.js is from:  https://github.com/toji/gl-matrix

