<template>
	<div class="index-page__video-slider">
		<div class="channel-button">
			<a href="https://youtube.com">
				<img class="hover" src="~/static/pics/svg/index/youtube.svg" alt="Youtube: Mobitek TV">
				<img class="no-hover" src="~/static/pics/svg/index/youtube-hover.svg" alt="Youtube: Mobitek TV">
			</a>
		</div>
		<div class="index-page__video-slider__content container">
			<div v-swiper:mySwiper="swiperOption">
	  		<div class="swiper-wrapper">
	  			<div class="swiper-slide" v-for="(video, i) in videos" :key="i">
	  				<div class="index-page__video-slider__item">
		  				<div class="overlay" @click="onClick(i)" :id="`overlay-${i}`">
		  					<button class="play">
		  						<img src="/pics/img/index/play.png" alt="Play">
		  					</button>
		  				</div>
		  				<div class="video-wrapper">
		  					<iframe :src="`https://www.youtube.com/embed/${video}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen :id="`iframe-${i}`"></iframe>
		  				</div>
		  			</div>
	  			</div>
	  		</div>
	  	</div>
	  </div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			videos: [
				'ynyKcAvvQ1w',
				'itnLOlQ2QFo',
				'fmtapsFI6Jc',
				'CBmz8Juk0fk',
				'Qw9HO5Iaios'
			],

			swiperOption: {
				spaceBetween: 25,
				speed: 500,
				init: false
			}
		}
	},

	mounted() {
		let slides = this.$el.querySelectorAll('.index-page__video-slider__item'),
				overlays = this.$el.querySelectorAll('.index-page__video-slider__item .overlay'),
				i;	

		this.mySwiper.on('slideChange', () => {
			// loop through all slides and change heights
			for (i = 0; i < slides.length; i++) {
				if (i == this.mySwiper.activeIndex) {
					this.animateHeight(slides[i], overlays[i], 450, 500);
				} else {
					this.animateHeight(slides[i], overlays[i], 500, 450);
				}
			}
		});

		this.mySwiper.init(this.swiperOption);

		this.mySwiper.slideTo(this.mySwiper.slides.length / 2);
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

		animateHeight(el1, el2, from, to) {
			let duration = 500, // ms
					start = new Date().getTime(),
					runtime = 0,
					progress = 0,
					newChange,
					curChange = 0;

			if (el1.offsetHeight == to) {
				el2.style.background = 'rgba(255,255,255,.5)';
				return;
			}

			let animate = () => {
				runtime = new Date().getTime() - start;
				newChange = this.easeInOutQuad(runtime, 0, from > to ? from - to : to - from, duration);
				if (newChange >= curChange) {
					curChange = newChange;
					el1.style.height = `${from + (from < to ? curChange : -curChange)}px`;
					el2.style.background = `rgba(255,255,255,${(from > to ? curChange : 50-curChange)/100})`;
					window.requestAnimationFrame(animate);
				} else {
					// el1.style.height = `${to}px`;
					// el2.style.background = `rgba(255,255,255,${from < to ? 0 : .5})`;
				}
			}
			animate();
		},

		easeInOutQuad(t, b, c, d) {
		  t /= d/2;
			if (t < 1) return c/2*t*t + b;
			t--;
			return -c/2 * (t*(t-2) - 1) + b;
		}
	}
}
</script>
