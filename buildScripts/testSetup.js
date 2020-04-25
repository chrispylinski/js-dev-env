// This file isn't transpiled, so must use CommonJS and ES5

// Register babel to transpile before our tests run.
require("babel-register")();

// Disable webpack features taht Mocha doesn't understand.
require.extensions[".css"] = function() {}; // when you see this just treat it as an empty function
