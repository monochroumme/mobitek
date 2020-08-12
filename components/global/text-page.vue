<template>
	<main class="text-page">
		<div class="text-page__top">
			<clink to="/delivery" class="page__top__item" :class="{active: page == '/delivery'}">
				<span>{{ $t('footer.delivery-rules') }}</span>
			</clink>
			<clink to="/promotions" class="page__top__item" :class="{active: page == '/promotions'}">
				<span>{{ $t('footer.our-promotions') }}</span>
			</clink>
			<clink to="/bonuses" class="page__top__item" :class="{active: page == '/bonuses'}">
				<span>{{ $t('footer.bonuses') }}</span>
			</clink>
		</div>
		<div class="text-page__content" v-html="html"></div>
	</main>
</template>

<script>
	export default {
		props: ['html', 'page']
	}
</script>
