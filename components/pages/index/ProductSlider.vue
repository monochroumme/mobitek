<template>
  <div class="index-page__product-slider">
    <div class="index-page__product-slider__top container container--page">
      <div class="index-page__product-slider__top__item" v-for="(item, i) in types" :key="i" @click="showSlider(i,item)" :class="{ active: currentSlider == i, center: i == Math.floor(types.length / 2) }">
        <span>{{ $t(item.name) }}</span>
      </div>
    </div>
    <div class="index-page__product-slider__middle container container--page">
      <div v-swiper:sectionSwiper="sectionSwiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <ProductInnerSlider :data="data.top" sliderNumber="first" />
          </div>
          <div class="swiper-slide">
            <ProductInnerSlider :data="data.best" sliderNumber="second" />
          </div>
          <div class="swiper-slide">
            <ProductInnerSlider :data="data.editor" sliderNumber="third" />
          </div>
        </div>
      </div>
      <button class="index-page__product-slider__arrow-left index-page__product-slider__arrow-left--first" v-show="currentSlider == 0">
        <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go left">
        <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go left">
      </button>
      <button class="index-page__product-slider__arrow-right  index-page__product-slider__arrow-right--first" v-show="currentSlider == 0">
        <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go right">
        <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go right">
      </button>
      <button class="index-page__product-slider__arrow-left index-page__product-slider__arrow-left--second" v-show="currentSlider == 1">
        <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go left">
        <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go left">
      </button>
      <button class="index-page__product-slider__arrow-right  index-page__product-slider__arrow-right--second" v-show="currentSlider == 1">
        <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go right">
        <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go right">
      </button>
      <button class="index-page__product-slider__arrow-left index-page__product-slider__arrow-left--third" v-show="currentSlider == 2">
        <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go left">
        <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go left">
      </button>
      <button class="index-page__product-slider__arrow-right  index-page__product-slider__arrow-right--third" v-show="currentSlider == 2">
        <img class="half" src="~/static/pics/svg/index/slider-arrow-right.svg" alt="Go right">
        <img class="full" src="~/static/pics/svg/slider-round-arrow-right.svg" alt="Go right">
      </button>
    </div>
    <div class="index-page__product-slider__bottom container container--page">
      <clink :to="`/catalog?type=${activeCatQuery}`">
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

  computed: {
    activeCatQuery() {
      if (this.currentSlider == 0)
        return 'top_rated';
      else if (this.currentSlider == 1)
        return 'best_sellers';
      else if (this.currentSlider == 2)
        return 'editor_choice';
      return '';
    }
  },

  methods: {
    showSlider(i, item) {
      this.currentSlider = i;
      let body = {
        lang: this.$i18n.locale,
        type: item.type
      }
      this.$store.dispatch('getProductsSlides', body);
      this.sectionSwiper.slideTo(this.currentSlider);
    }
  }
}
</script>
