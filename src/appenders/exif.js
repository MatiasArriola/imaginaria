import exif from 'exif';

export default function append(fileObj){;
  if(fileObj.type !== 'image'){
    return Promise.resolve({});
  }
  return new Promise(function(resolve, reject){
    new exif.ExifImage({image: fileObj.filename}, function(error, exifData){
      if(error){
        return reject(error);
      }
      else {
        return resolve({exif: exifData});
      }
    });
  });
}
