require('./assets/common.less');

const mokit = require('mokit');
const Router = require('mokit-router');
const Touch = require('mokit-touch');
const Hello = require('./components/hello');

mokit.use(Router);
mokit.use(Touch);

const app = mokit({
  element: document.querySelector('.app'),
  components: {
    Hello
  },
  data() {
    return {
      name: 'mokit'
    };
  }
});

app.start();