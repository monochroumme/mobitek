<template>
	<div class="catalog-page">
		<ProductShowcase class="catalog-page__product-showcase" />
		<div class="catalog-page__inner container">
			<h1 class="catalog-page__title">{{ $t('catalog.search-for-products') }}</h1>
			<CatalogSearch @search="search" v-model="searchInput" />
			<div class="catalog-page__double">
				<aside class="catalog-page__filter">
					<div class="catalog-page__filter__inner">
						<h2 class="catalog-page__filter__section-title">{{ $t('catalog.color') }}</h2>
						<div class="catalog-page__filter__colors">
							<div class="catalog-page__filter__colors__item__wrapper" v-for="(item,i) in colors" :key="i">
								<div class="catalog-page__filter__colors__item" @click="item.chosen = !item.chosen" :class="{
									red: item.color == 'red',
									yellow: item .color== 'yellow',
									purple: item.color == 'purple',
									black: item .color== 'black',
									gray: item.color == 'gray',
									active: item.chosen
								}"></div>
							</div>
						</div>
						<h2 class="catalog-page__filter__section-title">{{ $t('catalog.brand') }}</h2>
						<div class="catalog-page__filter__brands">
							<div class="catalog-page__filter__choosable catalog-page__filter__brands__item" v-for="(brand,i) in brands" :key="i" @click="brand.chosen = !brand.chosen" :class="{ active: brand.chosen }">{{ brand.title }}</div>
						</div>
						<h2 class="catalog-page__filter__section-title">{{ $t('catalog.connector') }}</h2>
						<div class="catalog-page__filter__connectors">
							<div class="catalog-page__filter__choosable catalog-page__filter__connectors__item" v-for="(connector,i) in connectors" @click="connector.chosen = !connector.chosen" :class="{ active: connector.chosen }">{{ connector.title }}</div>
						</div>
						<h2 class="catalog-page__filter__section-title">{{ $t('catalog.price') }}</h2>
						<div class="catalog-page__filter__price">
							<div class="bar">
								<div class="min">
									<img src="/pics/img/catalog/range-slider-pin.png">
								</div>
								<div class="max">
									<img src="/pics/img/catalog/range-slider-pin.png">
								</div>
							</div>
							<div class="catalog-page__filter__prices">
								<div class="catalog-page__filter__price__item" v-for="(price,i) in prices" :key="i">
									<div class="dot"></div>
									<div class="price">
										<span>{{ price }}</span>
										<img src="/pics/svg/catalog/manat.svg">
									</div>
								</div>
							</div>
						</div>
					</div>
				</aside>
				<main class="catalog-page__content">
					<div class="catalog-page__top-filters">
						<DropdownFilter v-model="filterByPrice" :options="filtersByPrice" />
						<DropdownFilter v-model="filterByProductNewness" :options="filtersByProductNewness" />
					</div>
					<div class="catalog-page__products">
						<div class="index-page__product-slider__card" v-for="(product,i) in products.slice((page-1)*perPage, Math.min(page*perPage, products.length))" :key="i">
							<nuxt-link :to="product.link" class="index-page__product-slider__card__inner">
								<div class="editors-choice" v-show="product.editorsChoice">
									<img src="/pics/img/editors-choice.png" alt="Editor's choice">
								</div>
								<div class="pic">
									<img :src="product.pic" :alt="product.title">
								</div>
								<div class="info">
									<div class="top">
										<div class="stars">
											<img src="~/static/pics/svg/star.svg" alt="Star" v-for="rating in 5" :key="rating" :class="{ active: rating < product.rating }">
										</div>
										<span>({{ product.reviews }} {{ getReviewsText(product.reviews) }})</span>
									</div>
									<div class="title">{{ product.title }}</div>
									<div class="description">{{ product.description }}</div>
								</div>
								<div class="price">{{ product.price }} azn</div>
							</nuxt-link>
						</div>
					</div>
					<Pagination v-model="page" :perPage="perPage" :totalElems="4" :emptyText="$t('catalog.empty')" />
				</main>
			</div>
		</div>
	</div>
</template>

<script>
import ProductShowcase from '~/components/pages/index/ProductShowcase';
import CatalogSearch from '~/components/pages/catalog/CatalogSearch';
import DropdownFilter from '~/components/global/DropdownFilter';
import Pagination from '~/components/global/Pagination';

export default {
	components: {
		ProductShowcase,
		CatalogSearch,
		DropdownFilter,
		Pagination
	},

	data() {
		return {
			searchInput: '',
			
			minPrice: 0,
			maxPrice: 500,

			filterByPrice: 'ascending',
			filterByProductNewness: 'new',

			page: 1,
			perPage: 3,

			filtersByPrice: [
				'ascending',
				'descending'
			],

			filtersByProductNewness: [
				'new',
				'old'
			],

			colors: [
				{
					color: 'red',
					chosen: false	
				},
				{
					color: 'yellow',
					chosen: false
				},
				{
					color: 'purple',
					chosen: false
				},
				{
					color: 'black',
					chosen: false
				},
				{
					color: 'gray',
					chosen: false
				}
			],

			brands: [
				{
					title: 'Baseus',
					chosen: false
				},
				{
					title: 'Samsung',
					chosen: false
				},
				{
					title: 'RAVpower',
					chosen: false
				},
				{
					title: 'Apple',
					chosen: false
				},
				{
					title: 'Joyroom',
					chosen: false
				},
				{
					title: 'Anker',
					chosen: false
				},
				{
					title: 'Milli',
					chosen: false
				},
				{
					title: 'Remax',
					chosen: false
				},
			],

			connectors: [
				{
					title: 'Lightning',
					chosen: false
				},
				{
					title: 'Micro',
					chosen: false
				},
				{
					title: 'Type-C',
					chosen: false
				},
				{
					title: 'Power Delivery (PD)',
					chosen: false
				}
			],

			products: [
        {
          reviews: 79,
          title: 'PD Pioneer 20000mAh Portable Charger',
          description: 'Substantial 60W PD output means it can charge your MacBook Pro perfectly, just as good as the original charger',
          rating: 5,
          pic: 'pics/img/index/p1.png',
          link: '/products/xz',
          price: 45
        },
        {
          reviews: 79,
          title: 'Anker PowerWave Pad & Stand 7.5W',
          description: 'Qi-Certified 7.5W for iPhone Xs Max XR XS X 8/8 Plus, 10W Fast Charging Samsungs',
          rating: 5,
          pic: 'pics/img/index/p2.png',
          link: '/products/xz',
          price: 45
        },
        {
          reviews: 79,
          title: 'Anker PowerPort Speed PD 5',
          description: 'Premium 60W 5-Port Desktop Charger with One 30W Power Delivery',
          rating: 5,
          pic: 'pics/img/index/p3.png',
          link: '/products/xz',
          editorsChoice: true,
          price: 45
        },
        {
          reviews: 79,
          title: 'Baseus Encok True Wireless Earphones W07',
          description: 'Automatic Switching of Primary and Secondary Earphone;Dual Mic noise reduction design',
          rating: 5,
          pic: 'pics/img/index/p4.png',
          link: '/products/xz',
          price: 45
        }
			],

			prices: [0,25,50,100,500]
		}
	},

	methods: {
		search() {

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
		}
	}
}
</script>
