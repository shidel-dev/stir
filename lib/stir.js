#!/usr/bin/env node

"use strict";

var exec = require('child_process').exec;
var stir = require('commander');

// Exec function as a string in osa
stir.osa = function(osaFunction) {
  var args = Array.prototype.slice.call(arguments, 1);
  var jsonArgs = args.map(JSON.stringify);
  var functionCallString = 'JSON.stringify((' + osaFunction.toString() + ')(' + jsonArgs.join(',') + '));';
  var escapedCall = functionCallString.replace(/^\s+/g, ' ').replace(/\n/g, '').replace(/'/g, "'\\''");
  var executeString = "osascript -l JavaScript -e '" + escapedCall + "'";
  exec(executeString);
};

stir.version('0.1.0');

stir.option('-q, --quit', 'quit a program');

stir
  .command('*')
  .action(function(app){
    if(stir.quit) {
      stir.osa(stir.quitApp, app);
    } else {
      stir.osa(stir.openApp, app);
    }
  });


stir.quitApp = function(app) {
  var upcaseApp = app.charAt(0).toUpperCase() + app.slice(1);
  Application(upcaseApp).quit();
}

stir.openApp = function(app) {
  var upcaseApp = app.charAt(0).toUpperCase() + app.slice(1);
  Application(upcaseApp).activate();
}

stir.parse(process.argv);



