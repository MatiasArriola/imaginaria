import test from "tape";
import logger from "../src/logger.js";

test("logger", (t) => {
  t.equal(logger.level, 'debug', 'default logging level is debug');
  t.end();
});
