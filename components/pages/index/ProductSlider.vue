<template>
  <div class="index-page__product-slider">
    <div class="index-page__product-slider__top container container--page">
      <div class="index-page__product-slider__top__item" v-for="(item, i) in types" :key="i" @click="showSection(i,item)" :class="{ active: currentSlider == i, center: i == Math.floor(types.length / 2) }">
        <span>{{ $t(item.name) }}</span>
      </div>
    </div>
    <div class="index-page__product-slider__middle container container--page">
      <div v-swiper:sectionSwiper="sectionSwiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <ProductInnerSlider :data="data.top" />
          </div>
          <div class="swiper-slide">
            <ProductInnerSlider :data="data.best" />
          </div>
          <div class="swiper-slide">
            <ProductInnerSlider :data="data.editor" />
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
      <clink to="/catalog">
        <span>{{ $t('index.product-slider.see-more') }}</span>
      </clink>
    </div>
  </div>
</template>

<script>
import ProductInnerSlider from '~/components/pages/index/ProductInnerSlider';
import { mapState } from 'vuex'

export default {
  props: ['data', 'types'],

  components: {
    ProductInnerSlider
  },

  data() {
    return {
      sectionSwiperOption: {
        allowTouchMove: false,
        observer: true,
        observeParents: true,
        init: false
      },

      currentSlider: 1
    }
  },

  mounted() {
    this.sectionSwiper.on('init', () => {
      this.sectionSwiper.slideTo(this.currentSlider);
    });

    this.sectionSwiper.init(this.sectionSwiperOption);
  },

  methods: {
    showSection(i, item) {
      this.currentSlider = i;
      let body = {
        lang: this.$i18n.locale,
        type: item.type
      }
      this.$store.dispatch('getProductsSlides', body);
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
