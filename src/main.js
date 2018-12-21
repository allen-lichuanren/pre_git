// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@/style/common.less';
import './util/jquery.js';
import 'bootstrap/dist/js/bootstrap.js';
import "layui-layer/layer.js";
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import * as com from './util/common.js'



Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>', //表示用<app></app>替换index.html里面的<div id="app"></div>
  components: { App },//实例化一个Vue，挂载到id为app的div里面，这个vue实例有个局部组件App
});
//注册全局指令 v-focus
Vue.directive('focus', function (el, option) {
    var value = option.value;
    if(value){
    	el.focus();
    }
    
});
