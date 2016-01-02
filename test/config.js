import test from "tape";
import config from "../src/config.js";

test("config", (t) => {
  //TODO: proxyquire and test edge cases and defaults
  t.equal(config.filesdir, '_files', '_files should be the filesdir');
  t.equal(config.output, '_site', '_site should be the output');
  t.end();
});
