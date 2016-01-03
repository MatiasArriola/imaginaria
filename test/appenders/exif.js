import test from "tape";
import exif from "../../src/appenders/exif.js";

test("exif", (t) => {

  let fakeFileData = {
    type: 'image',
    filename: '_files/gypsy.jpg'
  };

  exif(fakeFileData).then((result) => {
    t.equal(Object.keys(result).length, 1, 'result should only have the exif key');
    t.equal(typeof result.exif, 'object', 'exif should be an object');
    t.equal(typeof result.exif.gps, 'object', 'exif gps should be an object');
    t.end();
  }).catch(t.fail);
});
