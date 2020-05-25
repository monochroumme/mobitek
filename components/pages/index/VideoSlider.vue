<template>
	<div class="index-page__video-slider">
		<div class="channel-button">
			<button>
				<img src="~/static/pics/svg/index/youtube.svg" alt="Youtube: Mobitek TV">
			</button>
		</div>
		<div v-swiper:mySwiper="swiperOption">
  		<div class="swiper-wrapper">
  			<div class="swiper-slide" v-for="(video, i) in videos" :key="i">
  				<div class="overlay">
  					<button class="play"></button>
  				</div>
  				<iframe :src="`https://www.youtube.com/embed/${video}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
				centeredSlides: true
			}
		}
	}	
}
</script>
