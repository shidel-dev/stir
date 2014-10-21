/*
 * stir
 * https://github.com/shidel-dev/stir
 *
 * Copyright (c) 2014 shidel.dev
 * Licensed under the MIT license.
 */

'use strict';
var stir = require('commander');

stir.version('0.1.0');

stir.option('-q, --quit', 'quit a program');

stir
  .command('*')
  .action(function(app){
    stir.osa(stir.stirApp, app)
  })

stir.parse(process.argv);



