import fs from "fs-extra";
import test from "tape";
import {compress, thumb} from "../../src/processors/image.js";
import config from "../../src/config";

test("imageProcessor", (t) => {

  t.test('compress', (t) => {
    let origin = '_files/gypsy.jpg', dest = '_site/_files/gypsy.jpg';
    t.plan(2);
    compress(origin).then(() => {
      t.ok(fs.existsSync(dest), 'the compressed file should be there');
      t.ok(fs.statSync(origin).size >= fs.statSync(dest).size, 'resulting file should be smaller or equal');
    }).catch(t.fail);
  });

  t.test('compress in nested folder', (t) => {
    let origin = '_files/EdgarDegas/at-races.jpg', dest = '_site/_files/EdgarDegas/at-races.jpg';
    t.plan(2);
    compress(origin).then(() => {
      t.ok(fs.existsSync(dest), 'the compressed file should be there');
      t.ok(fs.statSync(origin).size >= fs.statSync(dest).size, 'resulting file should be smaller or equal');
    }).catch(t.fail);
  });

  t.test('thumb', (t) =>{
    let origin = '_files/EdgarDegas/at-races.jpg';
    thumb(origin).then((result) => {
      t.equal(result.width, config.thumb_width, 'thumbnail width should match the config width');
      t.equal(result.height, config.thumb_height, 'thumbnail height should match the config width');
      t.equal(result.path, `_site/_thumbs/EdgarDegas/${config.thumb_width}_${config.thumb_height}_at-races.jpg`, 'filename should be formatted with res');
      t.end();
    });
  });

  t.end();
});
