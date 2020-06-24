<template>
  <div class="index-page">
    <Welcome :data="welcome" />
    <ProductShowcase :data="categories" />
    <ProductSlider :data="productSlides" :types="types" />
    <Banners :data="banners" />
    <VideoSlider :data="videos" />
    <BottomFeatures />
  </div>
</template>

<script>
import Welcome from '~/components/pages/index/Welcome';
import ProductShowcase from '~/components/pages/index/ProductShowcase';
import ProductSlider from '~/components/pages/index/ProductSlider';
import Banners from '~/components/pages/index/Banners';
import VideoSlider from '~/components/pages/index/VideoSlider';
import BottomFeatures from '~/components/pages/index/BottomFeatures';

import {mapState} from 'vuex';

export default {
  components: {
    Welcome,
    ProductShowcase,
    ProductSlider,
    Banners,
    VideoSlider,
    BottomFeatures
  },
  head() {
    return {
      title: `${this.$t('MetaTitle')}`,
      meta: [
        { name: 'description', content: `${this.$t('metaDescription')}` || '' },
        { property: 'og:title', content: `${this.$t('MetaTitle')}` || '' } ,
        { property: 'og:description', content: `${this.$t('metaDescription')}` || '' } ,
        { property: 'og:image', content: '/seo/seo.jpg' || '' } ,
        { property: 'og:url', content: `https://mobitek.az/${this.$route.fullPath}` || '' } ,
        { property: 'twitter:card', content: '/seo/seo.jpg' || '' } ,
        { name: 'keywords', content: `${this.$t('keywords')}` || '' },
      ]
    }
  },
  async fetch({store}) {
    await store.dispatch('getSlides');
    await store.dispatch('getBanners');
    await store.dispatch('getVideos');
    await store.dispatch('getCategories');
  },

  async created() {
    await this.$store.dispatch('getProductsSlides', {
      lang: this.$i18n.locale,
      type: this.types[1].type
    });
  },

  computed: {
    ...mapState(['welcome','banners','videos','productSlides', 'categories'])
  },

  data() {
    return {
      types: [
        {type: 'top_rated', name: 'index.product-slider.top-rated'},
        {type: 'best_sellers', name: 'index.product-slider.best-sellers'},
        {type: 'editor_choice', name: 'index.product-slider.editors-choice'}
      ]
    }
  }
}
</script>
