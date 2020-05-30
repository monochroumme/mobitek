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
		  				<iframe :src="`https://www.youtube.com/embed/${video}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen :id="`iframe-${i}`"></iframe>
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
				init: false
			}
		}
	},

	mounted() {
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
		}
	}
}
</script>
