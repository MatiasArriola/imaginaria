
import fs from 'fs';
import logger from './logger';

const defaults = {
  "filesdir": "_files",
  "output": "_site",
  "paging": 10,
  "thumb_width": 300,
  "thumb_height": 300,
  "strip_exif": false
};

let config = {};
if (!fs.existsSync('config.json')){
  logger.info('Config file not found. Using defaults');
}
else {
  config = fs.readFileSync('config.json');
  try {
    config = JSON.parse(config);
  } catch (e) {
    logger.error('Error parsing config file');
  }
}

export default Object.assign({}, defaults, config);
