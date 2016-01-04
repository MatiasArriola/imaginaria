import logger from '../logger';

import copy from './copy';
import image from './image';
import video from './video';

export default function process(fileObj){
  if(!fileObj.type){
    logger.warn(`Processor: undefined file type for ${fileObj.filename}, only copying`);
    return copy(fileObj.filename);
  }
  if(fileObj.type === 'image'){
    return image(fileObj.filename);
  }
  else if (fileObj.type === 'video'){
    return video(fileObj.filename);
  }
  else {
    logger.warn(`Processor: unknown file type ${fileObj.type}, only copying`);
    return copy(fileObj.filename);
  }
};
