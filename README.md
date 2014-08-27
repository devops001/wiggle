wiggle
======

Simple webgl helpers. 

Functions:

    initGL(gl,canvas)  //<- sets common gl flags
    initShader(gl)     //<- compiles & sets up the shader for use
    render()           //<- called 60 times per second. override it.
    startRendering()   //<- call this to start calling render().
    stopRendering()    //<- call this to stop calling render().

Example:

    https://github.com/devops001/wiggle/blob/master/example_triangle.html

    glMatrix.js is from:  https://github.com/toji/gl-matrix

