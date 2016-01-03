import path from 'path';
import config from './config';

export function toOutput(filename, subfolder){
  var f = filename;
  subfolder = subfolder || '';
  if(filename.startsWith(config.filesdir + path.sep)){
    f = filename.replace(config.filesdir + path.sep, '');
  }
  return path.join(config.output, subfolder, f);
}
