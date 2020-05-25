<template>
	<div class="catalog-page__search">
		<div class="catalog-page__search__bar">
			<div class="catalog-page__search__bar__input-area">
				<input type="text" name="search-input" :placeholder="$t('catalog.enter-product-name')">
			</div>
			<button>
				<span>{{ $t('catalog.search') }}</span>
			</button>
		</div>
		<span class="catalog-page__search__tip">{{ $t('catalog.example') }}</span>
	</div>
</template>

<script>
export default {
	props: ['value']
}
</script>
