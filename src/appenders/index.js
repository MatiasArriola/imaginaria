import exif from './exif';

export default function append(fileObj){
  return exif(fileObj).then((data) => {
    return Object.assign(fileObj, data);
  });
};
