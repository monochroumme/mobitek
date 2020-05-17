import Vue from 'vue';
import VueRouter from 'vue-router';

const eventBus = {};

eventBus.install = function (Vue) {
	Vue.prototype.$bus = new Vue();
}

Vue.use(eventBus);
