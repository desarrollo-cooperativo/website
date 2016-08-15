var Config        = require('config.vue');
var Home          = require('components/home.vue');

var App = Vue.extend(require('app.vue'));

var router = new VueRouter({
  history: true,
});

router.map({
  '/': {
    component: Home,
  },
});

router.start(App, '#app');
