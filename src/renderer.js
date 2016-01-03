import fs from 'fs';
import path from 'path';

import promisify from 'es6-promisify';
import Liquid from 'liquid-node';

import config from './config';
import { toOutput } from './pathHelper';

const engine = new Liquid.Engine;
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export default function renderPage(filename, context){
  let output = toOutput(filename);
  return readFile(filename)
    .then((content) => engine.parse(content))
    .then((template) => template.render(context))
    .then((result) => writeFile(output, result));
};
