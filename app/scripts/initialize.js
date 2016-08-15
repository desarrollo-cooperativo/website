// In order to load modules that requires bootstrap, jQuery must be installed globally
global.jQuery = require('jquery');
$             = global.jQuery;

require('jquery-ui');
require('bootstrap');

Vue           = require('vue');
VueResource   = require('vue-resource');
VueRouter     = require('vue-router');

Vue.use(VueResource);
Vue.use(VueRouter);

// VueJS needs to be set up on a window in order to run using browserify
window.Vue    = Vue;

// Initialize de app
require('app.js');
