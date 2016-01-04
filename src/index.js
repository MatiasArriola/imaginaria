import path from 'path';
import fs from 'fs-extra';

import config from './config';
import logger from './logger';

import { clean as fsClean, copy as fsCopy, validateImaginaria } from './fsTasks';
import { toOutput, withoutOutputDir } from './pathHelper';

import { fetchImages, fetchVideos, fetchTemplates, fetchStatic } from './fetcher';
import process from './processors';
import append from './appenders';
import { renderAll } from './renderer';

import { context, decorate as decorateContext } from './context';

import connect from 'connect';
import serveStatic from 'serve-static';

export default function build(){
  validateImaginaria();
  return fetchImages(config.filesdir).then((images) => {
    context.files = images.map((i) => ({
      filename: i,
      type: 'image'
    }));
    return fetchVideos(config.filesdir);
  }).then((videos) => {
    let videoFiles = videos.map((v) => ({
      filename: v,
      type: 'video'
    }));
    context.files = [...context.files, ...videoFiles];
    return context;
  }).then((context) => {
    return Promise.all(
      context.files.map((f) => process(f))
    );
  }).then((processResults) => {
    context.files.forEach((f, i) => {
      f.compressed = processResults[i].compressed;
      f.thumb = processResults[i].thumb;
      f.thumb.filename = withoutOutputDir(f.thumb.path);
    });
    return context;
  }).then((context) => {
    return Promise.all(
      context.files.map((f) => append(f))
    );
  })
  .then(() => fetchStatic())
  .then((staticFiles) => Promise.all(
    staticFiles.map((sf) => fsCopy(sf, toOutput(sf)))
  ))
  .then(() => decorateContext())
  .then(() => renderAll(context))
  .then(() => logger.info(`Generation finished. ${context.images.length} images and ${context.videos.length} videos processed.`))
  .catch((err) => {
    logger.error(err);
  });
}

export function init(dir, options){
  if(!options.force){
    if(fs.existsSync(dir)){
      throw new Error(`The directory ${dir} already exists. --force to override`);
    }
  }
  return fsCopy(path.join(__dirname, '../template'), dir);
}

export function serve(options){
  let port = options.port || 8080;
  logger.info(`Serving imaginaria in port ${port}`);
  connect().use(serveStatic(config.output)).listen(port);
}

export function clean(){
  validateImaginaria();
  return fsClean(config.output);
}
