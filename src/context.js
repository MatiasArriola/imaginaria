
export const context = {
  images: [],
  videos: [],
  files:[] //images + videos
};

export function decorate(){

  context.images = context.files.filter((f) => f.type === 'image');
  context.videos = context.files.filter((f) => f.type === 'video');

  return Promise.resolve(context);
};
