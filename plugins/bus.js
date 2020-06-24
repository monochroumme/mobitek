import Vue from 'vue';
import VueRouter from 'vue-router';

const eventBus = {};

eventBus.install = function (Vue) {
	Vue.prototype.$bus = new Vue();
	Vue.prototype.$bus.isMobile = false;
}

Vue.prototype.$imagesUrl = process.env.imagesUrl;
Vue.prototype.$specImgUrl = process.env.specImgUrl;

Vue.use(eventBus);
