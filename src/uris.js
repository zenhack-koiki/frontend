import config from './config';
const base = ( config.api.port === 443 ? 'https' : 'http' ) +
             '://' +
             config.api.host +
             ( config.api.port === 80 || config.api.port === 443
               ? ''
               : ':' + config.api.port);

const uris = {
  base,
  resources: {
    fruits: {
      load: {
        url: base + '/apis/zenhack/fruits',
        method: 'GET',
        defaults: {
          limit: 1000
        }
      }
    }
  },
  pages: {
    defaults: '/en/zenhack',
    root: '/:lang/zenhack'
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
