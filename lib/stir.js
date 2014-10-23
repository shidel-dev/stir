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
    var app = Array.prototype.slice.call(arguments, 0, -1);
    var upcaseApp = app.map(function(appNamePart){
      return appNamePart.charAt(0).toUpperCase() + appNamePart.slice(1);
    }).join(" ")

    if(stir.quit) {
      stir.osa(stir.quitApp, upcaseApp)
    } else {
      stir.osa(stir.openApp, upcaseApp)
    }
  });

stir.quitApp = function(app) {
  Application(app).quit();
}

stir.openApp = function(app) {
  Application(app).activate();
}

stir.parse(process.argv);



