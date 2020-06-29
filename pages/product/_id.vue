<template>
  <div class="product-page">
    <ProductShowcase class="catalog-page__product-showcase" :data="categories" />
    <div class="product-page__content container">
      <div class="product-page__content__row">
        <div class="product-page__sliders">
          <div class="product-page__sliders__left">
            <div v-swiper:leftSwiper="leftSwiperOption">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, i) in JSON.parse(product.images)" :key="i" @click="rightSwiper.slideTo(i)">
                  <img :src="`${$specImgUrl}${item.url}`">
                </div>
              </div>
            </div>
          </div>
          <div class="product-page__sliders__right">
            <div v-swiper:rightSwiper="rightSwiperOption">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, i) in JSON.parse(product.images)" :key="i">
                  <vue-magnifier class="product-page__sliders__right__slide" :src="`${$specImgUrl}${item.url}`"></vue-magnifier>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main class="product-page__product-info">
          <h1>{{ product.title[$i18n.locale]}}</h1>
          <h2>{{ product.description[$i18n.locale] }}</h2>
          <div class="product-page__product-info__reviews-price">
            <div class="product-page__product-info__rating">
              <div class="stars">
                <img class="star" v-for="i in parseInt(product.star)" :key="i" v-if="i <= product.star" :src="i <= product.star ? '/pics/svg/star.svg': ''" alt="star(s)">
              </div>
              <span>({{ product.interesting }} {{ getReviewsText(product.interesting) }})</span>
            </div>
            <div class="product-page__product-info__price">
              <span>{{ product.price }} azn</span>
            </div>
          </div>
          <ul v-html="product.text[$i18n.locale]">
          </ul>
        </main>
      </div>
      <div class="product-page__content__row">
        <div class="product-page__props">
          <h2>{{ $t('product.properties') }}</h2>
          <div class="product-page__props__content">
            <div class="product-page__props__col">
              <span class="prop" v-for="(prop,i) in JSON.parse(product.property[$i18n.locale])" :key="i" v-if="prop.key">{{ prop.key }}:</span>
            </div>
            <div class="product-page__props__col">
              <span class="value" v-for="(prop,i) in JSON.parse(product.property[$i18n.locale])" :key="i" v-if="prop.value">{{ prop.value }}</span>
            </div>
          </div>
        </div>
        <div class="product-page__input-area desktop-450">
          <div class="product-page__input-area__top">
            <div class="product-page__input-area__col">
              <h2 class="product-page__input-area__title">{{ $t('product.fast-order') }}</h2>
              <input type="text" name="name" maxlength="100" :placeholder="$t('product.enter-name')" v-model="name">
              <input type="text" name="phone" maxlength="100" :placeholder="$t('product.enter-phone')" v-model="phone">
            </div>
            <div class="product-page__input-area__col">
              <div class="product-page__input-area__colors">
                <ColorChooser :colors="product.color.split(' ')" :chosen="chosenColor" :radio="true" @toggleColor="toggleColor($event)" />
              </div>
              <input type="text" name="surname" maxlength="100" :placeholder="$t('product.enter-surname')" v-model="surname">
              <input type="email" name="email" maxlength="320" :placeholder="$t('product.enter-email')" v-model="email">
            </div>
          </div>
          <textarea :placeholder="$t('product.enter-address')" maxlength="500" v-model="address"></textarea>
          <div class="product-page__input-area__bottom">
            <button class="add" @click="toCart()">{{ $t('product.add-to-cart') }}</button>
            <button class="buy" @click="buy()">{{ $t('product.buy-now') }}</button>
          </div>
        </div>
        <div class="product-page__input-area mobile">
          <div class="product-page__input-area__top">
            <h2 class="product-page__input-area__title">{{ $t('product.fast-order') }}</h2>
            <div class="product-page__input-area__colors">
              <ColorChooser :colors="product.color.split(' ')" :chosen="chosenColor" :radio="true" @toggleColor="toggleColor($event)" />
            </div>
            <input type="text" name="name" maxlength="100" :placeholder="$t('product.enter-name')" v-model="name">
            <input type="text" name="surname" maxlength="100" :placeholder="$t('product.enter-surname')" v-model="surname">
            <input type="text" name="phone" maxlength="100" :placeholder="$t('product.enter-phone')" v-model="phone">
            <input type="email" name="email" maxlength="320" :placeholder="$t('product.enter-email')" v-model="email">
          </div>
          <textarea :placeholder="$t('product.enter-address')" maxlength="500" v-model="address"></textarea>
          <div class="product-page__input-area__bottom">
            <button class="add" @click="toCart()">{{ $t('product.add-to-cart') }}</button>
            <button class="buy" @click="buy()">{{ $t('product.buy-now') }}</button>
          </div>
        </div>
      </div>
    </div>
    <ProductSlider :data="catsProducts" />
  </div>
</template>

<script>
import ProductShowcase from '~/components/pages/index/ProductShowcase';
import ProductSlider from '~/components/pages/product/ProductSlider';
import ColorChooser from '~/components/global/ColorChooser';

import { mapState, mapActions } from 'vuex';
import vueMagnifier from '~/components/global/vue-magnifier';

export default {
  components: {
    ProductShowcase,
    ProductSlider,
    ColorChooser,
    'vue-magnifier': vueMagnifier
  },

  async fetch({ store, route }) {
    await store.dispatch('getCategories');
    await store.dispatch('getProduct', route.params.id).then(async () => {
      await store.dispatch('getCatsProducts', store.state.product.cat_id)
    });
  },

  head() {
    return {
      title: this.product.title[this.$i18n.locale],
      meta: [
        { property: 'og:title', content: `${this.product.title[this.$i18n.locale]} | Mobitek` || '' },
        {
          property: 'og:description',
          content: `${this.product.description[this.$i18n.locale]}` || ''
        },
        { name: 'description', content: `${this.product.description[this.$i18n.locale]}` || '' },
        {
          property: 'og:image',
          content: `https://mobitek.az${JSON.parse(this.product.images)[0].url}` || ''
        },
        { name: 'keywords', content: `${this.$t('keywords')}` || '' },
        { property: 'og:url', content: `https://mobitek.az/${this.$route.fullPath}` || '' },
        {
          property: 'twitter:card',
          content: `https://mobitek.az${JSON.parse(this.product.images)[0].url}` || ''
        },
      ]
    }
  },

  mounted() {
    this.rightSwiper.on('slideChange', () => {
      this.leftSwiper.slideTo(this.rightSwiper.activeIndex);
    });

    this.leftSwiper.init(this.leftSwiperOption);
    this.rightSwiper.init(this.rightSwiperOption);

    this.product.color.split(' ').forEach(color => {
      this.colors.push({
        color: color,
        chosen: false
      });
    });
  },

  methods: {
    ...mapActions(['buyNow', 'addToCart']),

    buy() {
      if (this.name !== '' && this.surname !== '' && this.phone !== '' && this.email !== '' && this.address !== '') {
        this.buyNow({
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          email: this.email,
          address: this.address,
          color: this.chosenColor,
          productId: this.$route.params.id
        }).then(() => {
          this.$toast.success(this.$t('validate.success'));
          this.name = ''
          this.surname = ''
          this.phone = ''
          this.email = ''
          this.address = ''
          this.chosenColor = ''
        });
      } else if (this.chosenColor === '') {
        this.$toast.error(this.$t('validate.chosenColor'))
      } else {
        this.$toast.error(this.$t('validate.notAll'))
      }
    },

    toCart() {
      if (this.name !== '' && this.surname !== '' && this.phone !== '' && this.email !== '' && this.address !== '') {
        this.addToCart({
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          email: this.email,
          address: this.address,
          color: this.chosenColor
        });
      } else {
        this.$toast.error('Мейл не может быть пустым')
      }
    },

    getReviewsText(reviewCount) {
      if (this.$i18n.locale == 'en') {
        if (reviewCount % 10 == 1)
          return 'review';
        else return 'reviews';
      } else if (this.$i18n.locale == 'ru') {
        return 'ревью';
      } else if (this.$i18n.locale == 'az') {
        return 'revyu';
      }

      return '';
    },

    toggleColor(color) {
      this.chosenColor = color;
    }
  },

  computed: {
    ...mapState(['product', 'catsProducts', 'categories'])
  },

  data() {
    return {
      name: '',
      surname: '',
      phone: '',
      email: '',
      address: '',
      chosenColor: '',

      colors: [],
      activeSlide: 0,

      leftSwiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: true,
        direction: 'horizontal',
        init: false,
        observer: true,
        observeParents: true,

        breakpoints: {
          1201: {
            direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 15
          },

          1001: {
            slidesPerView: 4,
            spaceBetween: 15
          },

          901: {
            slidesPerView: 3,
            spaceBetween: 10
          },

          701: {
            slidesPerView: 6,
            spaceBetween: 15
          },

          571: {
            slidesPerView: 5,
            spaceBetween: 10
          }
        }
      },

      rightSwiperOption: {
        spaceBetween: 10,
        init: false,
        observer: true,
        observeParents: true,
      }
    }
  }
}
</script>
