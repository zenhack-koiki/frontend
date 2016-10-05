import config from './config';
const base = config.app.base;

export default {
  images: {
    load: {
      url: base + '/apis/images',
      method: 'GET'
    }
  },
  likes: {
    select: {
      url: base + '/apis/likes',
      method: 'POST'
    }
  },
  recommends: {
    load: {
      url: base + '/apis/recommend/index.json',
      method: 'GET'
    }
  }
};
