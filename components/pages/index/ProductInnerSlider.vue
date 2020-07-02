<template>
	<div v-swiper:productSwiper="productSwiperOption" class="index-page__product-slider__inner">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(product,i) in data" :key="i">
				<div class="index-page__product-slider__card">
					<clink :to="`/product/${product.slug}`" class="index-page__product-slider__card__inner">
						<div class="editors-choice" v-if="product.type == 'editor_choice'">
							<img src="/pics/img/editors-choice.png" alt="Editor's choice">
						</div>
						<div class="pic">
							<img
								:src="`${$specImgUrl}${JSON.parse(product.images)[0].url}`"
					    	:alt="`${JSON.parse(product.images)[0].image}`"
							>
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
		</div>
	</div>
</template>

<script>
export default {
	props: ['data', 'sliderNumber'],

	data() {
		return {
			productSwiperOption: {
				slidesPerView: 'auto',
				spaceBetween: 15,
				loop: true,
				observer: true,
				observeParents: true,
				centeredSlides: true,
				init: false,
				navigation: {
        	nextEl: `.index-page__product-slider__arrow-right--${this.sliderNumber}`,
					prevEl: `.index-page__product-slider__arrow-left--${this.sliderNumber}`
        },

				breakpoints: {
					1151: {
						spaceBetween: 25,
						slidesPerView: 4,
						loopedSlides: 4,
						centeredSlides: false
					},
					901: {
						spaceBetween: 25,
						slidesPerView: 3,
						loopedSlides: 3,
						centeredSlides: false
					},
					651: {
						spaceBetween: 25,
						slidesPerView: 2,
						loopedSlides: 2,
						centeredSlides: false
					},
					451: {
						spaceBetween: 25,
						slidesPerView: 'auto',
						centeredSlides: true
					}
				}
			}
		}
	},

	mounted() {
		this.productSwiper.on('init', () => {
      this.productSwiper.slideTo(1);
    });

    this.productSwiper.init(this.productSwiperOption);
	},

	methods: {
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
