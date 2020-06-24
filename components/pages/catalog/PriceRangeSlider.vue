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
							<span>{{ price == 'inf' && prices.length >= 2 ? `${prices[prices.length-2]}+` : price }}</span>
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
				bar = this.$el.querySelector('.bar'),
				tempOffset,
				tempX,
				curLoc = 0,
				drag = false,
				dragee = null,
				drageeName = null;

		let onMouseMove = e => {
			if (!document.querySelector('.catalog-page')) {
				window.removeEventListener('mousemove', this.onMouseMove, false);
				window.removeEventListener('touchmove', this.onMouseMove, false);
				return;
			}

			if (drag && this.prices) {
				if (e.changedTouches)
					curLoc = e.changedTouches[0].clientX - bar.getBoundingClientRect().x - 7;
				else
					curLoc = e.clientX - bar.getBoundingClientRect().x - 7;

				if (drageeName == 'min') {
					if (curLoc > (tempX = max.getBoundingClientRect().x - bar.getBoundingClientRect().x)) {
						curLoc = tempX;
					}
				} else if (drageeName == 'max') {
					if (curLoc < (tempX = min.getBoundingClientRect().x - bar.getBoundingClientRect().x)) {
						curLoc = tempX;
					}
				}

				if (curLoc < 0)
					curLoc = 0;
				else if (curLoc > (tempOffset = this.getDotOffsetX(9999).offsetX))
					curLoc = tempOffset;

				dragee.style.transform = `translateX(${curLoc}px)`;
			}
		};

		let onMouseUp = e => {
			if (!document.querySelector('.catalog-page')) {
				window.removeEventListener('mouseup', onMouseUp, false);
				window.removeEventListener('touchend', onMouseUp, false);
				return;
			}

			if (!drag) return;

			let offset = this.getDotOffsetX(dragee.getBoundingClientRect().x - bar.getBoundingClientRect().x);
			if (offset.offsetX >= 0) {
				if (drageeName == 'min') {
					this.minPrice = offset.index;
					min.style.transform = `translateX(${offset.offsetX}px)`;
					this.setMin();
				} else if (drageeName == 'max') {
					this.maxPrice = offset.index;
					max.style.transform = `translateX(${offset.offsetX}px)`;
					this.setMax();
				}
			}

			drag = false;
			dragee = null;
			drageeName = null;
		};

		window.addEventListener('mousemove', onMouseMove, false);
		window.addEventListener('touchmove', onMouseMove, false);
		window.addEventListener('mouseup', onMouseUp, false);
		window.addEventListener('touchend', onMouseUp, false);

		min.addEventListener('mousedown', e => {
			e.preventDefault();
			dragee = min;
			drageeName = 'min';
			drag = true;
		});
		min.addEventListener('touchstart', e => {
			e.preventDefault();
			dragee = min;
			drageeName = 'min';
			drag = true;
		});

		max.addEventListener('mousedown', e => {
			e.preventDefault();
			dragee = max;
			drageeName = 'max';
			drag = true;
		});
		max.addEventListener('touchstart', e => {
			e.preventDefault();
			dragee = max;
			drageeName = 'max';
			drag = true;
		});

		window.addEventListener('resize', this.barResize, false);
		this.barResize();

		this.$bus.$on('setMin', min => {
			this.minPrice = this.getClosestIndexInArray(this.prices, min);
			this.barResize();
		});
		this.$bus.$on('setMax', max => {
			this.maxPrice = this.getClosestIndexInArray(this.prices, max);
			this.barResize();
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

		barResize() {
			if (!document.querySelector('.bar')) {
				window.removeEventListener('resize', this.barResize, false);
				return;
			}

			let min = this.$el.querySelector('.min'),
				max = this.$el.querySelector('.max'),
				dots = this.$el.querySelectorAll('.dot');

			// place the pins at their correct spots
			min.style.transform = `translateX(${this.getDotOffsetX(dots[this.minPrice].offsetLeft).offsetX}px)`;
			max.style.transform = `translateX(${this.getDotOffsetX(dots[this.maxPrice].offsetLeft).offsetX}px)`;
		},

		getClosestIndexInArray(array, val) {
			if (val == 'inf')
				return array.length - 1;

			return array.indexOf(array.reduce(function(prev, curr) {
			  return (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
			}));
		}
	}
}
</script>
