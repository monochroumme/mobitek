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
              <div class="product-page__input-area__item">
                <input type="text" name="firstname" maxlength="100" :placeholder="$t('product.enter-name')" v-model="name">
                <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorName">{{ $t('product.error.fill-name') }}</span>
              </div>
              <div class="product-page__input-area__item">
                <input type="text" name="phone" maxlength="100" :placeholder="$t('product.enter-phone')" v-model="phone">
                <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorPhone">{{ $t('product.error.fill-phone') }}</span>
              </div>
            </div>
            <div class="product-page__input-area__col">
              <div class="product-page__input-area__item">
                <div class="product-page__input-area__colors">
                  <ColorChooser :colors="getColors(product.color)" :chosen="chosenColor" :radio="true" @toggleColor="toggleColor($event)" />
                  <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorColor">{{ $t('product.error.choose-color') }}</span>
                </div>
              </div>
              <div class="product-page__input-area__item">
                <input type="text" name="surname" maxlength="100" :placeholder="$t('product.enter-surname')" v-model="surname">
                <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorSurname">{{ $t('product.error.fill-surname') }}</span>
              </div>
              <div class="product-page__input-area__item">
                <input type="email" name="email" maxlength="320" :placeholder="$t('product.enter-email')" v-model="email">
                <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorEmail">{{ $t('product.error.fill-email') }}</span>
              </div>
            </div>
          </div>
          <div class="product-page__input-area__item">
            <textarea :placeholder="$t('product.enter-address')" maxlength="500" v-model="address"></textarea>
            <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorAddress">{{ $t('product.error.fill-address') }}</span>
          </div>
          <div class="product-page__input-area__bottom">
            <div class="product-page__input-area__item product-page__input-area__item--no-margin-bottom">
              <button class="add" @click="toCart()">{{ $t('product.add-to-cart') }}</button>
              <span class="product-page__input-area__item__message product-page__input-area__item__message--success" v-show="successCart">{{ $t('product.success.add-to-cart') }}</span>
            </div>
            <div class="product-page__input-area__item product-page__input-area__item--no-margin-bottom">
              <button class="buy" @click="buy()">{{ $t('product.buy-now') }}</button>
              <span class="product-page__input-area__item__message product-page__input-area__item__message--success" v-show="successBuy">{{ $t('product.success.buy') }}</span>
            </div>
          </div>
        </div>
        <div class="product-page__input-area mobile">
          <div class="product-page__input-area__top">
            <h2 class="product-page__input-area__title">{{ $t('product.fast-order') }}</h2>
            <div class="product-page__input-area__item">
              <div class="product-page__input-area__colors">
                <ColorChooser :colors="getColors(product.color)" :chosen="chosenColor" :radio="true" @toggleColor="toggleColor($event)" />
                <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorColor">{{ $t('product.error.choose-color') }}</span>
              </div>
            </div>
            <div class="product-page__input-area__item">
              <input type="text" name="firstname" maxlength="100" :placeholder="$t('product.enter-name')" v-model="name">
              <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorName">{{ $t('product.error.fill-name') }}</span>
            </div>
            <div class="product-page__input-area__item">
              <input type="text" name="surname" maxlength="100" :placeholder="$t('product.enter-surname')" v-model="surname">
              <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorSurname">{{ $t('product.error.fill-surname') }}</span>
            </div>
            <div class="product-page__input-area__item">
              <input type="text" name="phone" maxlength="100" :placeholder="$t('product.enter-phone')" v-model="phone">
              <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorPhone">{{ $t('product.error.fill-phone') }}</span>
            </div>
            <div class="product-page__input-area__item">
              <input type="email" name="email" maxlength="320" :placeholder="$t('product.enter-email')" v-model="email">
              <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorEmail">{{ $t('product.error.fill-email') }}</span>
            </div>
          </div>
          <div class="product-page__input-area__item">
            <textarea :placeholder="$t('product.enter-address')" maxlength="500" v-model="address"></textarea>
            <span class="product-page__input-area__item__message product-page__input-area__item__message--error" v-show="errorAddress">{{ $t('product.error.fill-address') }}</span>
          </div>
          <div class="product-page__input-area__bottom">
            <div class="product-page__input-area__item product-page__input-area__item--no-margin-bottom">
              <button class="add" @click="toCart()">{{ $t('product.add-to-cart') }}</button>
              <span class="product-page__input-area__item__message product-page__input-area__item__message--success" v-show="successCart">{{ $t('product.success.add-to-cart') }}</span>
            </div>
            <div class="product-page__input-area__item product-page__input-area__item--no-margin-bottom">
              <button class="buy" @click="buy()">{{ $t('product.buy-now') }}</button>
              <span class="product-page__input-area__item__message product-page__input-area__item__message--success" v-show="successBuy">{{ $t('product.success.buy') }}</span>
            </div>
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

  async fetch({ store, route, redirect }) {
    await store.dispatch('getCategories');
    await store.dispatch('getProduct', route.params.id).then(async () => {
      if (!store.state.product || !store.state.product.cat_id) {
        if (route.path.startsWith('/ru/'))
          redirect('/ru/catalog');
        else if (route.path.startsWith('/az/'))
          redirect('/az/catalog');
        else
          redirect('/catalog');
      }
      else
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

    getColors(colors) {
      if (colors.includes(', '))
        return colors.split(', ');
      else if (colors.includes(' '))
        return colors.split(' ');
      return colors.split();
    },

    formCheckers() {
      let proceed = true;

      if (this.name.trim() == '') {
        proceed = false;
        this.errorName = true;
      } else {
        this.errorName = false;
      }
      if (this.surname.trim() == '') {
        proceed = false;
        this.errorSurname = true;
      } else {
        this.errorSurname = false;
      }
      if (this.phone.trim() == '') {
        proceed = false;
        this.errorPhone = true;
      } else {
        this.errorPhone = false;
      }
      if (this.email.trim() == '') {
        proceed = false;
        this.errorEmail = true;
      } else {
        this.errorEmail = false;
      }
      if (this.address.trim() == '') {
        proceed = false;
        this.errorAddress = true;
      } else {
        this.errorAddress = false;
      }
      if (this.colors.length > 1 && this.chosenColor == '') {
        proceed = false;
        this.errorColor = true;
      } else {
        this.errorColor = false;
      }

      if (this.colors.length == 1) {
        this.chosenColor = this.colors[0].color;
      }

      return proceed;
    },

    buy() {
      this.successBuy = false;

      if (this.formCheckers()) {
        this.buyNow({
          name: this.name.trim(),
          surname: this.surname.trim(),
          phone: this.phone.trim(),
          email: this.email.trim(),
          address: this.address.trim(),
          color: this.chosenColor,
          productId: this.$route.params.id
        }).then(() => {
          this.successBuy = true;
          this.name = ''
          this.surname = ''
          this.phone = ''
          this.email = ''
          this.address = ''
          this.chosenColor = ''
        });
      }
    },

    toCart() {
      this.successCart = false;

      if (this.formCheckers()) {
        this.successCart = true;
        // add to cookies
        // adding the index of a new order to the cart in the cookies
        let orders = this.$cookies.get('cart'),
            orderIndex = 1;

        if (!orders || orders.length == 0)
          orders = [];
        else
          orderIndex = orders[orders.length-1]+1;

        orders.push(orderIndex);

        let order = {
          name: this.name.trim(),
          surname: this.surname.trim(),
          phone: this.phone.trim(),
          email: this.email.trim(),
          address: this.address.trim(),
          color: this.chosenColor,
          productId: this.product.slug,
          amount: 1,
          index: orderIndex
        };

        this.$cookies.set('cart', orders, {
          maxAge: 60 * 60 * 24 * 30 * 6 // six month
        });
        this.$cookies.set(`orders[${orderIndex}]`, order, {
          maxAge: 60 * 60 * 24 * 30 * 6 // six month
        });

        this.$bus.$emit('update-cart');
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

      errorColor: false,
      errorName: false,
      errorSurname: false,
      errorPhone: false,
      errorEmail: false,
      errorAddress: false,
      successCart: false,
      successBuy: false,

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
