
import promisify from 'es6-promisify';
import path from 'path';
const glob = promisify( require("glob") );


export const formats = {
  image: ['jpg'],
  video: ['mp4'],
  template: ['html']
};

const specialFiles = ['config.json'];

var _fetchByType = function(type, baseDir){
  return glob( path.join(baseDir || '', `**/*.+(${ formats[type].join("|") })`) , {});
};

export function fetchImages(baseDir){
  return _fetchByType('image', baseDir);
}

export function fetchVideos(baseDir){
  return _fetchByType('video', baseDir);
}

export function fetchTemplates(baseDir){
  return _fetchByType('template', baseDir);
}

export function fetchStatic(baseDir){
  baseDir = baseDir || '';
  let patternsToIgnore = Object.keys(formats).map((format) => {
    return path.join(baseDir, `**/*.+(${ formats[format].join("|") })`);
  });
  let specialFilesToIgnore = specialFiles.map((file) => path.join(baseDir,file));
  return glob( path.join(baseDir, `**/*.*`) , {
    ignore: [
      ...patternsToIgnore,
      ...specialFilesToIgnore
      ]
  });
}
