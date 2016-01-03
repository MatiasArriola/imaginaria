import test from "tape";
import { toOutput } from "../src/pathHelper.js";

test("pathHelper", (t) => {

  t.test("toOutput", (t) => {

    let result = toOutput('_files/EdgarDegas/at-races.jpg', '_files');
    t.equal(result, '_site/_files/EdgarDegas/at-races.jpg');

    result = toOutput('_files/gypsy.jpg', '_files');
    t.equal(result, '_site/_files/gypsy.jpg');

    result = toOutput('photos/index.html');
    t.equal(result, '_site/photos/index.html');

    t.end();

  });

  t.end();
});
