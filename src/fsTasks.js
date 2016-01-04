import fs from 'fs-extra';
import promisify from 'es6-promisify';

export function createFolder(path){
  return promisify(fs.mkdirp)(dest);
}

export function copy(from, to){
  return promisify(fs.copy)(from, to);
}

export function clean(path){
  return promisify(fs.remove)(path);
}

export function validateImaginaria(){
  if(!fs.existsSync('.imaginaria')){
    throw new Error('This is not an imaginaria project (.imaginaria file not found)');
  }
}
