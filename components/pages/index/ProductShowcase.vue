<template>
	<div class="index-page__product-showcase container container--page">
		<div class="index-page__product-showcase__card">
			<div class="index-page__product-showcase__card__content">
				<nuxt-link to="/" class="index-page__product-showcase__card__item">
					<div class="index-page__product-showcase__card__item__icon">
						<img src="~/static/pics/svg/index/ps-charger.svg" :alt="$t('index.product-showcase.charger')">
					</div>
					<span>{{ $t('index.product-showcase.charger') }}</span>
				</nuxt-link>
				<nuxt-link to="/" class="index-page__product-showcase__card__item">
					<div class="index-page__product-showcase__card__item__icon">
						<img src="~/static/pics/svg/index/ps-car.svg" :alt="$t('index.product-showcase.car')">
					</div>
					<span>{{ $t('index.product-showcase.car') }}</span>
				</nuxt-link>
				<nuxt-link to="/" class="index-page__product-showcase__card__item">
					<div class="index-page__product-showcase__card__item__icon">
						<img src="~/static/pics/svg/index/ps-audio.svg" :alt="$t('index.product-showcase.audio')">
					</div>
					<span>{{ $t('index.product-showcase.audio') }}</span>
				</nuxt-link>
				<nuxt-link to="/" class="index-page__product-showcase__card__item">
					<div class="index-page__product-showcase__card__item__icon">
						<img src="~/static/pics/svg/index/ps-protectors-cases.svg" :alt="$t('index.product-showcase.protectors-cases')">
					</div>
					<span>{{ $t('index.product-showcase.protectors-cases') }}</span>
				</nuxt-link>
				<nuxt-link to="/" class="index-page__product-showcase__card__item">
					<div class="index-page__product-showcase__card__item__icon">
						<img src="~/static/pics/svg/index/ps-usb.svg" :alt="$t('index.product-showcase.usb')">
					</div>
					<span>{{ $t('index.product-showcase.usb') }}</span>
				</nuxt-link>
				<nuxt-link to="/" class="index-page__product-showcase__card__item">
					<div class="index-page__product-showcase__card__item__icon">
						<img src="~/static/pics/svg/index/ps-home.svg" :alt="$t('index.product-showcase.home')">
					</div>
					<span>{{ $t('index.product-showcase.home') }}</span>
				</nuxt-link>
				<nuxt-link to="/" class="index-page__product-showcase__card__item">
					<div class="index-page__product-showcase__card__item__icon">
						<img src="~/static/pics/svg/index/ps-game.svg" :alt="$t('index.product-showcase.game')">
					</div>
					<span>{{ $t('index.product-showcase.game') }}</span>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>
