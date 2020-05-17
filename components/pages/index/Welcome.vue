<template>
	<div class="index-page__welcome">
		<div v-swiper:mySwiper="swiperOption" class="index-page__welcome__bg">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item, i) in data" :key="i">
  					<img :src="item.pic" :alt="item.title">
				</div>
			</div>
		</div>
  		<div class="index-page__welcome__bottom">
  			<div class="index-page__welcome__bottom__item" v-for="(item, i) in data" :key="i" :class="{ active: activeIndex == i }" @click="mySwiper.slideTo(i)">
  				<span>{{ item.title }}</span>
  			</div>
  		</div>
  	</div>
</template>

<script>
export default {
	props: ['data'],

	data() {
		return {
			swiperOption: {
				allowTouchMove: false,
				autoplay: true,
				init: false
			},
			activeIndex: 0
		}
	},

	mounted() {
		this.mySwiper.on('slideChange', () => {
            this.activeIndex = this.mySwiper.activeIndex;
        });

		this.mySwiper.init();
	}
}
</script>
