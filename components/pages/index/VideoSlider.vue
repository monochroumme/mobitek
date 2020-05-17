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

			],

			swiperOption: {
				centeredSlides: true
			}
		}
	}	
}
</script>
