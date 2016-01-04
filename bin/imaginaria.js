#!/usr/bin/env node

var program = require('commander');
var index = require('../dist/index');

program
  .version(require('../package.json').version);

program
  .command('init <dir>')
  .option('-f, --force', 'inits even if the target dir already exists')
  .option('-e, --example', 'include example files')
  .description('inits a default site template in the specified directory')
  .action(function(dir, options){
    console.log(options.force);
    index.init(dir, options);
  });

program
  .command('build')
  .description('generates the site')
  .action(function(options){
    index.default(options);
  });

  program
    .command('serve')
    .description('serves the generated website')
    .option('-p, --port', 'the port that the webserver will use')
    .action(function(options){
      index.serve(options);
    });

program
  .command('clean')
  .description('cleans the output dir')
  .action(function(options){
    index.clean(options);
  });

program.parse(process.argv);
