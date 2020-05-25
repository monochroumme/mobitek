<template>
  <div class="index-page__product-slider container container--page">
    <div class="index-page__product-slider__top">
      <div class="index-page__product-slider__top__item" v-for="(item, i) in data" :key="i" @click="showSection(i)" :class="{ active: currentSlider == i }">
        <span>{{ item.title }}</span>
      </div>
    </div>
    <div class="index-page__product-slider__middle">
      <div v-swiper:sectionSwiper="sectionSwiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(section, i) in data" :key="i">
            <ProductInnerSlider :data="section" :index="i" />
          </div>
        </div>
      </div>
      <button class="index-page__product-slider__arrow-left" @click="slidePrevProduct()">
        <img src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go left">
      </button>
      <button class="index-page__product-slider__arrow-right" @click="slideNextProduct()">
        <img src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go right">
      </button>
    </div>
    <div class="index-page__product-slider__bottom">
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
