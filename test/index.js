import test from "tape";

process.chdir('./template');

require('./fetcher');
require('./logger');
require('./config');
require('./pathHelper');
require('./processors/image');
require('./renderer');
require('./appenders/exif');
