<template>
  <div class="index-page__welcome">
    <div v-swiper:mySwiper="swiperOption" class="index-page__welcome__bg">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, i) in data" :key="i">
          <img :src="`${$imagesUrl}/${item.image}`" :alt="item.title[$i18n.locale]">
        </div>
      </div>
    </div>
    <div class="index-page__welcome__bottom">
      <div v-swiper:titleSwiper="titleSwiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide index-page__welcome__bottom__item" v-for="(item, i) in data" :key="i" :class="{ active: activeIndex == i }" @click="mySwiper.slideTo(i)">
            <span>{{ item.title[$i18n.locale] }}</span>
          </div>
        </div>
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
      titleSwiperOption: {
        init: false,
        slidesPerView: 1,
        spaceBetween: 0,

        breakpoints: {
          501: {
            slidesPerView: 'auto',
            spaceBetween: 10
          }
        }
      },
      activeIndex: 0
    }
  },

  mounted() {
    let bottom = document.querySelector('.index-page__welcome__bottom');

    this.mySwiper.on('slideChange', () => {
      this.activeIndex = this.mySwiper.activeIndex;
      this.titleSwiper.slideTo(this.activeIndex);
    });

    this.titleSwiper.on('slideChange', () => {
      if (window.innerWidth <= 500) {
        if (this.activeIndex != this.titleSwiper.activeIndex)
          this.mySwiper.slideTo(this.titleSwiper.activeIndex);
      }
    });

    this.mySwiper.init();
    this.titleSwiper.init();
  }
}
</script>
