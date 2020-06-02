<template>
  <div class="index-page__product-slider">
    <div class="index-page__product-slider__top container container--page">
      <div class="index-page__product-slider__top__item" v-for="(item, i) in data" :key="i" @click="showSection(i)" :class="{ active: currentSlider == i, center: i == Math.floor(data.length / 2) }">
        <span>{{ item.title }}</span>
      </div>
    </div>
    <div class="index-page__product-slider__middle container container--page">
      <div v-swiper:sectionSwiper="sectionSwiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(section, i) in data" :key="i">
            <ProductInnerSlider :data="section" :index="i" />
          </div>
        </div>
      </div>
      <button class="index-page__product-slider__arrow-left" @click="slidePrevProduct()">
        <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go left">
        <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go left">
      </button>
      <button class="index-page__product-slider__arrow-right" @click="slideNextProduct()">
        <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go right">
        <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go right">
      </button>
    </div>
    <div class="index-page__product-slider__bottom container container--page">
      <nuxt-link to="/catalog">
        <span>{{ $t('index.product-slider.see-more') }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import ProductInnerSlider from '~/components/pages/index/ProductInnerSlider';

export default {
  props: ['data'],

  components: {
    ProductInnerSlider
  },

  data() {
    return {
      sectionSwiperOption: {
        spaceBetween: 10,
        allowTouchMove: false,
        observer: true,
        observeParents: true
      },

      currentSlider: 1
    }
  },

  mounted() {
    this.showSection(this.currentSlider);
  },

  methods: {
    showSection(i) {
      this.currentSlider = i;
      this.sectionSwiper.slideTo(this.currentSlider);
    },

    slideNextProduct() {
      this.$bus.$emit('product-slide', {
        index: this.currentSlider,
        left: false
      });
    },

    slidePrevProduct() {
      this.$bus.$emit('product-slide', {
        index: this.currentSlider,
        left: true
      });
    }
  }
}
</script>
