
import config from './config';
import logger from './logger';

import { clean as fsClean } from './fsTasks';

import { fetchImages, fetchVideos, fetchTemplates } from './fetcher';
import process from './processors';
import append from './appenders';
import { renderAll } from './renderer';

import { context, decorate as decorateContext } from './context';

export default function build(){
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
      f.thumb.filename = f.thumb.path;
    });
    return context;
  }).then((context) => {
    return Promise.all(
      context.files.map((f) => append(f))
    );
  })
  .then(() => decorateContext())
  .then(() => renderAll(context))
  .then(() => logger.info(`Generation finished. ${context.images.length} images and ${context.videos.length} videos processed.`))
  .catch((err) => {
    logger.error(err);
  });
}

export function clean(){
  return fsClean(config.output);
}
