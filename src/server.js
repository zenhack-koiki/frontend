import {server} from 'koiki';
import Express from 'express';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import Html from './containers/Html';
import http from 'http';
import uris from './uris';
import routes from './routes';
import bodyParser from 'body-parser';
import reducers from './reducers';
import PrettyError from 'pretty-error';
import 'isomorphic-fetch';

const app = new Express();
const pretty = new PrettyError();

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'images', 'favicon.png')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res, next)=>{
  if ( !__DEVELOPMENT__ && req.protocol === 'http' ) {
    res.redirect(uris.base + req.url);
  } else {
    next();
  }
});

app.use('/apis/*', (req, res) => {
  const base = ( config.api.port === 443 ? 'https' : 'http' ) +
               '://' +
               config.api.host +
               ( config.api.port === 80 || config.api.port === 443
                 ? ''
                 : ':' + config.api.port);
  const url = base + (req.originalUrl.replace(/^\/apis/, ''));
  console.log('# proxing', url, req.method, req.body);
  fetch(
    url,
    {
      ...req,
      body: req.method === 'POST' ? JSON.stringify(req.body) : ''
    })
    .then(
      _res => _res
                .json()
                .then(
                  json => console.log(json) || res.json(json),
                  _err => console.log(_err) || res.json(_err)
                ),
      _err => console.log(_err) || res.json(_err)
    ).catch(
      err => console.log(err) || res.json(err)
    );
});

server({
  app,
  uris: {
    root: uris.pages.root
  },
  urls: uris.resources,
  i18ndir: __dirname + '/../i18n',
  reducers,
  Html,
  routes,
  handlers: {
    error: error => {
      console.error('ROUTER ERROR:', pretty.render(error));
    }
  },
  isDevelopment: __DEVELOPMENT__
});

app.get('/', (req, res)=>{
  res.redirect(uris.pages.defaults);
});


if (config.port) {

  new http.Server(app).listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server.', config.app.title);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
