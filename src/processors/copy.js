import path from 'path';
import fs from 'fs-extra';
import config from '../config';

import { copy } from '../fsTasks';
import { toOutput } from '../pathHelper';

export default function all(filename){
  return Promise.all([compress(filename), thumb(filename)]);
}

export function compress(filename){
  let dest = toOutput(filename, '_files');
  return copy(filename, dest);
}

export function thumb(filename){
  var options = {
    width: config.thumb_width,
    height: config.thumb_height
  };
  var newFilename = `${options.width}_${options.height}_${path.basename(filename)}`;
  var fileDir = path.dirname(filename);
  var dest = toOutput(path.join(fileDir, newFilename), '_thumbs');
  return copy(filename, dest);
}
