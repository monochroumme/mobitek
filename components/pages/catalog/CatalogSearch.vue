<template>
	<div class="catalog-page__search">
		<div class="catalog-page__search__bar">
			<div class="catalog-page__search__bar__input-area">
				<input type="text" :placeholder="$t('catalog.enter-product-name')" @keydown.enter="search()" @focus="showAutocomplete = true" @blur="showAutocomplete = false" :value="value" @input="setValue($event.target.value)">
			</div>
			<button @click="search()">
				<span>{{ $t('catalog.search') }}</span>
			</button>
		</div>
		<span class="catalog-page__search__tip">{{ $t('catalog.example') }}</span>
<!--		<div class="catalog-page__search__autocomplete" v-show="showAutocomplete">-->
<!--			<div class="catalog-page__search__autocomplete__top-line"></div>-->
<!--			<div class="catalog-page__search__autocomplete__inner">-->
<!--				<clink class="catalog-page__search__autocomplete__item" v-for="(item, i) in results" :key="i" :to="item.link">-->
<!--					<span>{{ item.title }}</span>-->
<!--				</clink>-->
<!--			</div>-->
<!--		</div>-->
	</div>
</template>

<script>
export default {
	props: ['value'],

	data() {
		return {
			showAutocomplete: false,

			results: [
				{
					title: 'Baseus Encok True Wireless Earphones W07',
					link: '/'
				},
				{
					title: 'Baseus Encok True Wireless Earphones W07',
					link: '/'
				},
				{
					title: 'Baseus Encok True Wireless Earphones W07',
					link: '/'
				},
				{
					title: 'Baseus Encok True Wireless Earphones W07',
					link: '/'
				},
				{
					title: 'Baseus Encok True Wireless Earphones W07',
					link: '/'
				}
			]
		}
	},

	methods: {
		setValue(value) {
			this.$emit('input', value);
		},

		search() {
			this.$emit('search');
		}
	}
}
</script>
