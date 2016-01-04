import path from 'path';
import FFmpeg from 'fluent-ffmpeg';

import { toOutput } from '../pathHelper';
import config from '../config';

export default function all(filename){
  return Promise.all([compress(filename), thumb(filename)]).then((res) => {
    return {
      compressed: res[0],
      thumb: res[1]
    };
  });
}

export function compress(filename){
  let dest = toOutput(filename, '_files');
  return new Promise(function(resolve, reject){
    new FFmpeg({
      source: filename
    })
    .withVideoCodec('libvpx')
    .withVideoBitrate('500k')
    .addOption('-crf', 20)
    .toFormat('webm')
    .on('error', function(err){
      reject(err);
    })
    .on('end', function(){
      resolve(dest);
    })
    .saveToFile(dest);
  });
};

export function thumb(filename){
  let dest = toOutput(filename, '_thumbs');

  return new Promise(function(resolve, reject){
    new FFmpeg(filename)
      .takeScreenshots({
          count: 1,
          timemarks: [ '0' ],
          size:`${config.thumb_width}x${config.thumb_height}`,
          filename: '%w_%h_%f'
        }, path.dirname(dest), function(err) {
          if(err){
            return reject(err);
          }
          resolve(dest);
      }).on('end', function(){
        let filename = `${config.thumb_width}_${config.thumb_height}_` + path.basename(dest) + '.png';
        let dir = path.dirname(dest);
        resolve({
          path: path.join(dir,filename)
        });
      }).on('error', function(err){
        reject(err);
      });
  });
};
