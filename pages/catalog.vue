<template>
  <div class="catalog-page">
    <ProductShowcase class="catalog-page__product-showcase" :data="categories" :chosen="category" @chooseCat="chooseCat($event)" />
    <div class="catalog-page__inner container">
      <h1 class="catalog-page__title">{{ $t('catalog.search-for-products') }}</h1>
      <CatalogSearch @search="updateQuery()" v-model="searchInput" />
      <div class="catalog-page__double">
        <aside class="catalog-page__filter">
          <button class="catalog-page__filter__mobile-toggler" @click="toggleMobileFilters()">
            <span>{{ $t('catalog.filters') }}</span>
          </button>
          <div class="catalog-page__filter__inner">
            <div class="catalog-page__filter__content">
              <h2 class="catalog-page__filter__section-title">{{ $t('catalog.color') }}</h2>
              <ColorChooser :colors="colors" :chosen="chosenColors" @toggleColor="toggleColor($event)" />
              <h2 class="catalog-page__filter__section-title">{{ $t('catalog.brand') }}</h2>
              <div class="catalog-page__filter__brands">
                <div class="catalog-page__filter__choosable catalog-page__filter__brands__item" v-for="(brand,i) in brands" :key="i" @click="chooseBrand(brand.slug)" :class="{ active: chosenBrand == brand.slug }">{{ brand.title[$i18n.locale] }}</div>
              </div>
              <h2 class="catalog-page__filter__section-title">{{ $t('catalog.connector') }}</h2>
              <div class="catalog-page__filter__connectors">
                <div class="catalog-page__filter__choosable catalog-page__filter__connectors__item" v-for="(connector,i) in connectors" @click="chooseConnector(connector.slug)" :class="{ active: chosenConnector == connector.slug }">{{ connector.title }}</div>
              </div>
              <PriceRangeSlider @setMin="setMinimumPrice($event)" @setMax="setMaximumPrice($event)" :prices="prices" />
            </div>
          </div>
        </aside>
        <main class="catalog-page__content">
          <div class="catalog-page__top-filters">
            <DropdownFilter v-model="filterByPrice" :options="filtersByPrice" class="filter-left" />
            <DropdownFilter v-model="filterByProductNewness" :options="filtersByProductNewness" class="filter-right" />
          </div>
          <div class="catalog-page__products">
            <div class="index-page__product-slider__card" v-for="(product,i) in products" :key="i">
              <clink :to="`/product/${product.slug}`" class="index-page__product-slider__card__inner">
                <div class="editors-choice" v-show="product.type == 'editor_choice'">
                  <img src="/pics/img/editors-choice.png" alt="Editor's choice">
                </div>
                <div class="pic">
                  <img :src="`${$specImgUrl}${JSON.parse(product.images)[0].url}`" :alt="product.title[$i18n.locale]">
                </div>
                <div class="info">
                  <div class="top">
                    <div class="stars">
                      <img src="~/static/pics/svg/star.svg" alt="Star" v-for="rating in parseInt(product.star)" :key="rating" :class="{ active: rating < product.star }">
                    </div>
                    <span>({{ product.interesting }} {{ getReviewsText(product.interesting) }})</span>
                  </div>
                  <div class="title">{{ product.title[$i18n.locale] }}</div>
                  <div class="description">{{ product.description[$i18n.locale] }}</div>
                </div>
                <div class="price">{{ product.price }} azn</div>
              </clink>
            </div>
          </div>
          <Pagination v-model="page" :perPage="perPage" :totalElems="totalProducts" emptyText="catalog.empty" />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import ProductShowcase from '~/components/pages/index/ProductShowcase';
import CatalogSearch from '~/components/pages/catalog/CatalogSearch';
import PriceRangeSlider from '~/components/pages/catalog/PriceRangeSlider';
import DropdownFilter from '~/components/global/DropdownFilter';
import Pagination from '~/components/global/Pagination';
import ColorChooser from '~/components/global/ColorChooser';

import {mapState,mapActions} from 'vuex';

export default {
  components: {
    ProductShowcase,
    CatalogSearch,
    DropdownFilter,
    Pagination,
    ColorChooser,
    PriceRangeSlider
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

  data() {
    return {
      searchInput: '',

      mobileFiltersShown: false,

      minPrice: 0,
      maxPrice: 500,

      filterByPrice: 'ascending',
      filterByProductNewness: 'new',

      page: 1,
      perPage: 15,

      filtersByPrice: [
        'ascending',
        'descending'
      ],

      filtersByProductNewness: [
        'new',
        'old'
      ],

      chosenBrand: '',
      chosenConnector: '',
      chosenColors: [],
      prices: [0, 50, 100, 500, 'inf'],

      category: null,

      windowSize: 0
    }
  },

  watch: {
    minPrice(n, o) {
      this.updateQuery();
    },

    maxPrice(n, o) {
      this.updateQuery();
    },

    filterByPrice(n, o) {
      this.updateQuery();
    },

    filterByProductNewness(n, o) {
      this.updateQuery();
    },

    page(n, o) {
      this.updateQuery(true);
    }
  },

  watchQuery(n, o) {
    this.search();
  },

  async fetch() {
  	await this.$store.dispatch('catalog/getBrands');
  	await this.$store.dispatch('catalog/getConnectors');
  	await this.$store.dispatch('catalog/getColors');
    await this.$store.dispatch('getCategories');
  },

  mounted() {
    window.addEventListener('resize', this.onResize, false);
    this.onResize();

    this.chosenColors = new Array(this.colors.length).fill(false);
  	this.readURLQuery();
    this.search();

    this.$bus.$on('search', searchInput => {
      this.searchInput = searchInput;
      this.updateQuery();
    });

    let stateCheck = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        // document ready
        setTimeout(() => {
          this.$bus.$emit('setMin', this.minPrice);
          this.$bus.$emit('setMax', this.maxPrice);
        }, 500);
      }
    }, 100);
  },

  computed: {
  	...mapState('catalog', ['products', 'brands', 'connectors', 'totalProducts', 'colors']),
    ...mapState(['categories'])
  },

  methods: {
  	...mapActions('catalog', ['getProducts']),

    chooseBrand(brand) {
      if (this.chosenBrand != brand)
        this.chosenBrand = brand;
      else this.chosenBrand = '';
      this.updateQuery();
    },

    chooseConnector(connector) {
      if (this.chosenConnector != connector)
        this.chosenConnector = connector;
      else this.chosenConnector = '';
      this.updateQuery();
    },

    chooseCat(cat) {
      if (this.category != cat)
        this.category = cat;
      else this.category = null;
      this.updateQuery();
    },

  	toggleColor(i) {
  		this.chosenColors[i] = !this.chosenColors[i];
  		this.chosenColors.push({});
  		this.chosenColors.pop();
  		this.updateQuery();
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

    setMinimumPrice(price) {
      this.minPrice = price;
    },

    setMaximumPrice(price) {
      this.maxPrice = price;
    },

    search() {
      this.getProducts(this.getSearchQuery());
    },

    readURLQuery() {
      let cur;

      if (this.$route.query.cat)
        this.category = this.$route.query.cat;

      if (this.$route.query.brand)
        this.chosenBrand = this.$route.query.brand;

      if (this.$route.query.connector)
      	this.chosenConnector = this.$route.query.connector;

      if (this.$route.query.color) {
      	if (this.$route.query.color.forEach) { // means it's an array
      		this.$route.query.color.forEach(slug => {
      			if (cur = this.colors.findIndex(c => c.slug == slug))
      				this.chosenColors[cur] = true;
      		});
	      } else {
	      	if (cur = this.colors.findIndex(c => c.slug == this.$route.query.color))
	      		this.chosenColors[cur] = true;
	      }
      }

      if (this.$route.query.title)
        this.searchInput = this.$route.query.title;

      if (this.$route.query.min_price) {
        this.minPrice = this.$route.query.min_price;
      }

      if (this.$route.query.max_price) {
        this.maxPrice = this.$route.query.max_price;
      }

      if (this.$route.query.order == 'asc')
        this.filterByProductNewness = 'old';
      else if (this.$route.query.order == 'desc')
        this.filterByProductNewness = 'new';

      if (this.$route.query.price == 'asc')
        this.filterByPrice = 'ascending';
      else if (this.$route.query.price == 'desc')
        this.filterByPrice = 'descending';
    },

    updateQuery(savePage) {
      if (!savePage)
        this.curPage = 1;
      this.$router.push({ query: this.getURLQuery() });
    },

    getURLQuery() {
      // brand=Anker&color=%23A1A1A1&title=PowerDrive&type=editor_choice&cat=19&lang=en&min_price=10&max_price=60&order=asc&connector=lightning

      let query = {};

      for (let i = 0; i < this.colors.length; i++) {
      	if (this.chosenColors[i]) {
      		if (!query.color)
            query.color = [];
          query.color.push(this.colors[i].title);
      	}
      }

      if (this.chosenBrand.length > 0)
        query.brand = this.chosenBrand;

      if (this.chosenConnector.length > 0)
        query.connector = this.chosenConnector;

      if (this.filterByProductNewness == 'old')
        query.order = 'asc';
      else if (this.filterByProductNewness == 'new')
        query.order = 'desc';

      if (this.filterByPrice == 'ascending')
        query.price = 'asc';
      else if (this.filterByPrice == 'descending')
        query.price = 'desc';

      if (this.category)
        query.cat = this.category;

      if (this.type)
        query.type = this.type;

      if (this.searchInput.trim().length > 0)
        query.title = this.searchInput.trim();

      query.min_price = this.minPrice;
      query.max_price = this.maxPrice;

      query.page = this.page;

      return query;
    },

    getSearchQuery() {
      let query = this.getURLQuery();

      if (this.$i18n)
        query.lang = this.$i18n.locale;
      query.per_page = this.perPage;

      return query;
    },

    toggleMobileFilters() {
      if (this.mobileFiltersShown)
        this.hideMobileFilters();
      else this.showMobileFilters();
    },

    showMobileFilters() {
      this.mobileFiltersShown = true;
      let filters = this.$el.querySelector('.catalog-page__filter__inner');
      if (filters)
        filters.style.height = filters.scrollHeight + 'px';
    },

    hideMobileFilters() {
      this.mobileFiltersShown = false;
      let filters = this.$el.querySelector('.catalog-page__filter__inner');
      if (filters)
        filters.style.height = 0;
    },

    onResize() {
      if (!document.querySelector('.catalog-page')) {
        window.removeEventListener('resize', this.onResize, false);
        return;
      }

      if (this.windowSize != window.innerWidth) {
        this.windowSize = window.innerWidth;

        if (window.innerWidth > 650) {
          this.mobileFiltersShown = true;
          let filters = this.$el.querySelector('.catalog-page__filter__inner');
          if (filters)
            filters.style.height = '';
        } else {
          this.hideMobileFilters();
        }
      }
    }
  }
}

</script>
