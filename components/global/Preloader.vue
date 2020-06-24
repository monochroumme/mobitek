<template>
  <div class="preloader" v-body-scroll-lock="preloaderShown" v-if="preloaderShown">
    <img src="/pics/svg/logo.svg" alt="logo">
  </div>
</template>

<script>
import {easeInOutQuad} from '~/utils/ease';

export default {
	data() {
		return {
			preloaderShown: true,
			bounceDuration: 750,
			sonicScaleDuration: 400,
			fadeDuration: 750
		}
	},

  mounted() {
    let logo = this.$el.querySelector('.preloader img'),
      preloader = this.$el;

    window.onNuxtReady(app => {
    	setTimeout(() => {
      	this.bounce(logo, 1, 2, (scale) => {
      		this.sonicScale(logo, scale, () => {
      			this.fade(preloader, 1, 0, () => {
      				setTimeout(() => {
      					this.preloaderShown = false;
      				}, 1);
      			});
      		});
      	});
    	}, 1000);
    });
  },

  methods: {
    bounce(el, from, to, sonic) {
      let duration = this.bounceDuration, // ms
        start = new Date().getTime(),
        runtime = 0,
        newChange,
        curChange = 0;

      let animate = (callback) => {
        runtime = new Date().getTime() - start;
        newChange = easeInOutQuad(runtime, 0, from > to ? from - to : to - from, duration);
        if (newChange >= curChange) {
          curChange = newChange;
          el.style.transform = `scale(${from + (from < to ? curChange : -curChange)})`;
          window.requestAnimationFrame(() => { animate(callback) });
        } else {
        	start = new Date().getTime();
        	duration /= 2;
        	runtime = 0;
        	curChange = 0;
        	let temp = to;
        	to = from;
        	from = temp;
        	if (callback)
        		callback();
        	else sonic(from + (from < to ? curChange : -curChange));
        }
      }
      animate(animate);
    },

    sonicScale(scalee, from, callback) {
    	let to = window.innerWidth / scalee.offsetWidth * 8,
    			duration = this.sonicScaleDuration, // ms
	        start = new Date().getTime(),
	        runtime = 0,
	        newChange,
	        curChange = 0;

	    let animate = () => {
        runtime = new Date().getTime() - start;
        newChange = easeInOutQuad(runtime, 0, from > to ? from - to : to - from, duration);
        if (newChange >= curChange) {
          curChange = newChange;
          scalee.style.transform = `scale(${from + (from < to ? curChange : -curChange)})`;
          window.requestAnimationFrame(animate);
        } else {
        	callback();
        }
      }
      animate();
    },

    fade(el, from, to, callback) {
    	let duration = this.fadeDuration, // ms
	        start = new Date().getTime(),
	        runtime = 0,
	        newChange,
	        curChange = 0;

	    let animate = () => {
        runtime = new Date().getTime() - start;
        newChange = easeInOutQuad(runtime, 0, from > to ? from - to : to - from, duration);
        if (newChange >= curChange) {
          curChange = newChange;
          el.style.opacity = from + (from < to ? curChange : -curChange);
          window.requestAnimationFrame(animate);
        } else {
        	callback();
        }
      }
      animate();
    }
  }
}
</script>
