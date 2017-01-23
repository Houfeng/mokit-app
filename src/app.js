const mokit = require('mokit');
const Router = require('mokit-router');
const Touch = require('mokit-touch');

require('./assets/common.less');

mokit.use(Router);
mokit.use(Touch);

const router = new Router();