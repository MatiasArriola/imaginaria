import fs from 'fs';
import test from "tape";
import renderPage from "../src/renderer.js";

test("renderer", (t) => {

  t.test("renderPage", (t) => {
    let images = [{
      filename: '_files/gypsy.jpg',
      thumb: {
        filename: '_files/_thumbs/300_300_gypsy.jpg'
      }
    }];
    let fakeContext = {
      images,
      files: images
    };
    renderPage('index.html', fakeContext).then(() => {
      t.ok(fs.existsSync('_site/index.html'), 'rendered output should exist');
      t.end();
    });

  });

  t.end();
});
