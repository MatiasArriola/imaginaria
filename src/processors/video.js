import FFmpeg from 'fluent-ffmpeg';

export function compress(filename, dest){
  return new Promise(function(resolve, reject){
    new FFmpeg({
      source: filename
    })
    .withVideoCodec('libvpx')
    .withVideoBitrate('500k')
    .addOption('-crf', 20)
    .toFormat('webm')
    .on('error', function(err){
      reject(err);
    })
    .on('end', function(){
      console.log('resolving videconver', dest);
      resolve(dest);
    })
    .saveToFile(dest);
  });
};

export function thumb(filename, dest){
  console.log('thumb for:', dest);
  console.log('thumb in:', path.dirname(dest));
  return new Promise(function(resolve, reject){
    new FFmpeg(filename)
      .takeScreenshots({
          count: 1,
          timemarks: [ '0' ],
          size:`${config.thumb_width}x${config.thumb_height}`,
          filename: '%w_%h_%f'
        }, path.dirname(dest), function(err) {
          console.log('kek');
          if(err){
            return reject(err);
          }
          resolve(dest);
      }).on('end', function(){
        let filename = `${config.thumb_width}_${config.thumb_height}_` + path.basename(dest) + '.png';
        let dir =  path.relative(config.output, path.dirname(dest));
        resolve(path.join(dir,filename));
      }).on('error', function(err){
        reject(err);
      });
  });
};
