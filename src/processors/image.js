import path from 'path';
import fs from 'fs-extra';
import easyimg from 'easyimage';
import config from '../config';

import { toOutput } from '../pathHelper';

export default function all(filename){
  return Promise.all([compress(filename), thumb(filename)]).then((res) => {
    return {
      compressed: res[0],
      thumb: res[1]
    };
  });
}

export function compress(filename){
  let stripExif = config.strip_exif;
  let dest = toOutput(filename, '_files');
  fs.ensureDirSync(path.dirname(dest));
  return easyimg.exec(
    `convert ${ stripExif ? '-strip' : '' } -interlace Plane -gaussian-blur 0.05 -quality 85% ${path.resolve(filename)} ${path.resolve(dest)}`
  ).then(() => dest);
}

export function thumb(filename){
  var options = {
    width: config.thumb_width,
    height: config.thumb_height
  };
  var newFilename = `${options.width}_${options.height}_${path.basename(filename)}`;
  var fileDir = path.dirname(filename);
  var dest = toOutput(path.join(fileDir, newFilename), '_thumbs');
  return easyimg.thumbnail({
    src:filename, dst:dest,
    width:options.width, height:options.height,
    x:0, y:0
  });
}
