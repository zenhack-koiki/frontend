import config from './config';
const base = 'http://localhost:3000';
console.log(config);

const uris = {
  base,
  resources: {
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
  },
  pages: {
    defaults: '/en',
    root: '/:lang',
    photos: '/:lang/photos',
    recommends: '/:lang/recommends'
  },

  // normalized functions
  normalize: (_uri, params) => {
    let uri = _uri;
    Object.keys(params).forEach(key =>
      uri = uri.replace(':' + key, encodeURIComponent(params[key]))
    );
    if (/\:/.test(uri) ) {
      throw new Error('Required params are remained [' + uri + ']');
    }
    return uri;
  }
};

export default uris;
