<template>
	<div class="price-range-slider">
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
	</div>
</template>

<script>
import {debounce} from '~/utils/debounce';

export default {
	props: ['prices'],

	data() {
		return {
			minPrice: 0,
			maxPrice: this.prices ? this.prices.length-1 : 1
		}
	},

	mounted() {
		let min = this.$el.querySelector('.min'),
				max = this.$el.querySelector('.max'),
				bar = this.$el.querySelector('.bar');

		// placing the max pin at the end
		max.style.transform = `translateX(${this.getDotOffsetX(bar.offsetWidth-max.offsetWidth).offsetX}px)`;

		min.addEventListener('drag', e => {
			if (this.prices) {
				if (Math.abs(e.offsetX) > (bar.offsetWidth / this.prices.length) / 4) {
					let offset = this.getDotOffsetX(e.pageX - bar.getBoundingClientRect().left);
					if (offset.offsetX >= 0 && offset.index < this.maxPrice) {
						this.minPrice = offset.index;
						min.style.transform = `translateX(${offset.offsetX}px)`;
						this.setMin();
					}
				}
			}
		});
		max.addEventListener('drag', e => {
			if (this.prices) {
				if (Math.abs(e.offsetX) > (bar.offsetWidth / this.prices.length) / 4) {
					let offset = this.getDotOffsetX(e.pageX - bar.getBoundingClientRect().left);
					if (offset.offsetX >= 0 && offset.index > this.minPrice) {
						this.maxPrice = offset.index;
						max.style.transform = `translateX(${offset.offsetX}px)`;
						this.setMax();
					}
				}
			}
		});
	},

	methods: {
		getDotOffsetX(offsetX) {
			let dots = this.$el.querySelectorAll('.dot');

			for (let i = 0; i < dots.length; i++) {
				if (i == 0) {
					if (offsetX >= 0 && offsetX < dots[0].offsetLeft + (dots[1].offsetLeft - dots[0].offsetLeft)/2)
						return {offsetX: 0, index: 0};
				} else if (i == dots.length-1) {
					if (offsetX > dots[i].offsetLeft - (dots[i].offsetLeft - dots[i-1].offsetLeft)/2)
						return {offsetX: dots[i].offsetLeft - dots[0].offsetLeft, index: i};
				} else if (offsetX > dots[i].offsetLeft - (dots[i].offsetLeft - dots[i-1].offsetLeft)/2 && offsetX < dots[i+1].offsetLeft - (dots[i+1].offsetLeft - dots[i].offsetLeft)/2)
					return {offsetX: dots[i].offsetLeft - dots[0].offsetLeft, index: i};
			}

			return {offsetX: -1, index: -1};
		},

		setMin: debounce(async function() {
			this.$emit('setMin', this.prices[this.minPrice]);
		}, 250),

		setMax: debounce(async function() {
			this.$emit('setMax', this.prices[this.maxPrice]);
		}, 250),
	}
}
</script>
