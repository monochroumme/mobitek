<template>
	<div class="index-page__video-slider">
		<div class="channel-button">
			<a href="https://www.youtube.com/channel/UCRKa8kSU_RESveKfNNLpt5A" target="_blank">
				<img class="hover" src="~/static/pics/img/index/youtube.png" alt="Youtube: Mobitek TV">
				<img class="no-hover" src="~/static/pics/svg/index/youtube-hover.svg" alt="Youtube: Mobitek TV">
			</a>
		</div>
		<div class="index-page__video-slider__content container">
			<div v-swiper:mySwiper="swiperOption">
	  		<div class="swiper-wrapper">
	  			<div class="swiper-slide" v-for="(video, i) in data.data" :key="i">
	  				<div class="index-page__video-slider__item">
		  				<div class="overlay" @click="onClick(i)" :id="`overlay-${i}`">
		  					<button class="play">
		  						<img src="/pics/img/index/play.png" alt="Play">
		  					</button>
		  				</div>
		  				<div class="video-wrapper">
		  					<iframe :src="`https://www.youtube.com/embed/${video.text[$i18n.locale]}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen :id="`iframe-${i}`"></iframe>
		  				</div>
		  			</div>
	  			</div>
	  		</div>
	  	</div>
	  </div>
	</div>
</template>

<script>
import {easeInOutQuad} from '~/utils/ease';

export default {
	props: ['data'],

	data() {
		return {
			swiperOption: {
				spaceBetween: 25,
				speed: 500,
				init: false
			},

			minHeight: 450,
			minMaxDifference: 50,
			heightChangeDuration: 500
		}
	},

	mounted() {
		this.mySwiper.on('slideChange', () => {
			// set the correct slide sizes and
			// loop through all slides and change heights
			this.onResize();
		});

		this.mySwiper.init(this.swiperOption);

		this.mySwiper.slideTo(this.mySwiper.slides.length / 2);

		window.addEventListener('resize', this.onResize, false);
		this.onResize();
	},

	methods: {
		onClick(i) {
			if (i == this.mySwiper.activeIndex) {
				this.$el.querySelector(`#overlay-${i}`).classList.add('activated');
				this.$el.querySelector(`#iframe-${i}`).src += "?autoplay=1";
			} else if (i < this.mySwiper.activeIndex) {
				this.mySwiper.slidePrev();
			} else if (i > this.mySwiper.activeIndex) {
				this.mySwiper.slideNext();
			}
		},

		onResize() {
			if (!document.querySelector('.index-page')) {
				window.removeEventListener('resize', this.onResize, false);
				return;
			}

			if (window.innerWidth > 1000) {
				this.minHeight = 450;
			} else if (window.innerWidth > 900) {
				this.minHeight = 400;
			} else if (window.innerWidth > 700) {
				this.minHeight = 300;
			} else if (window.innerWidth > 600) {
				this.minHeight = 250;
			} else if (window.innerWidth > 400) {
				this.minHeight = 180;
			} else if (window.innerWidth > 350) {
				this.minHeight = 130;
			} else if (window.innerWidth >= 300) {
				this.minHeight = 100;
			}

			let slides = this.$el.querySelectorAll('.index-page__video-slider__item'),
					overlays = this.$el.querySelectorAll('.index-page__video-slider__item .overlay'),
					i;

			for (i = 0; i < slides.length; i++) {
				if (i == this.mySwiper.activeIndex) {
					this.animateHeight(slides[i], overlays[i], this.minHeight, this.minHeight+this.minMaxDifference);
				} else {
					this.animateHeight(slides[i], overlays[i], this.minHeight+this.minMaxDifference, this.minHeight);
				}
			}
		},

		animateHeight(el1, el2, from, to) {
			let duration = this.heightChangeDuration, // ms
					start = new Date().getTime(),
					runtime = 0,
					newChange,
					curChange = 0;

			if (el1.offsetHeight == to) {
				el2.style.background = 'rgba(255,255,255,.5)';
				return;
			}

			let animate = () => {
				runtime = new Date().getTime() - start;
				newChange = easeInOutQuad(runtime, 0, from > to ? from - to : to - from, duration);
				if (newChange >= curChange) {
					curChange = newChange;
					el1.style.height = `${from + (from < to ? curChange : -curChange)}px`;
					el2.style.background = `rgba(255,255,255,${(from > to ? curChange : 50-curChange)/100})`;
					window.requestAnimationFrame(animate);
				} // else { // fix the height and the opacity to the desired ones
					// el1.style.height = `${to}px`;
					// el2.style.background = `rgba(255,255,255,${from < to ? 0 : .5})`;
				// }
			}
			animate();
		}
	}
}
</script>
