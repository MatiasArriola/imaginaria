import fs from 'fs-extra';
import path from 'path';

import promisify from 'es6-promisify';
import Liquid from 'liquid-node';

import config from './config';
import { toOutput } from './pathHelper';

import { fetchTemplates } from './fetcher';

const engine = new Liquid.Engine;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const ensureDir = promisify(fs.ensureDir);

import logger from './logger';

export default function renderPage(filename, context){
  let output = toOutput(filename);
  logger.info(`RenderPage ${filename} --> ${output}`);
  return ensureDir(path.dirname(output))
    .then(() => readFile(filename))
    .then((content) => engine.parse(content))
    .then((template) => template.render(context))
    .then((result) => writeFile(output, result));
};

export function renderAll(context){
  return fetchTemplates().then((templates) => Promise.all(
    templates.map((t) => renderPage(t, context))
  ));
}
