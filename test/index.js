process.chdir('./template');

import test from "tape";
import fs from "fs-extra";
import path from "path";
import build, { clean }  from "../src/index.js";
import config from "../src/config";

import promisify from "es6-promisify";

test("index", (t) => {


  clean().then(() => {
    
    t.test('build', (t) => {
      let stat = promisify(fs.stat);
      build().then(() => {
        t.plan(5);
        t.ok( fs.existsSync(config.output), 'output dir should exist');
        t.ok( fs.existsSync(path.join(config.output, '_files')), '_files dir should exist');
        t.ok( fs.existsSync(path.join(config.output, '_thumbs')), '_thumbs dir should exist');
        stat(path.join(config.output, 'index.html')).then((s) => t.ok(s.isFile(), 'index.html should exist')).catch(t.fail);
        stat(path.join(config.output, 'photos/index.html')).then((s) => t.ok(s.isFile(), 'photos/index.html should exist')).catch(t.fail);
      }).catch(t.fail);
    });

    t.test('clean', (t) => {
      t.plan(1);
      clean().then(() => {
        t.notOk( fs.existsSync(config.output), 'output dir should not exist after clean' )
      }).catch(t.fail);
    });

    t.test('watch', (t) => {
      t.skip('should rebuild when changing a template');
      t.end();
    });

    t.end();
  });

});

require('./fetcher');
require('./logger');
require('./config');
require('./pathHelper');
require('./processors/image');
require('./renderer');
require('./appenders/exif');
