<template>
	<header class="header" :class="{ 'header--floating': isHomePage }">
		<div class="header__content__wrapper">
			<div class="header__content container container--header">
				<div class="header__left">
					<nuxt-link to="/" class="header__logo">
						<img src="~/static/pics/svg/header/logo.svg">
					</nuxt-link>
				</div>
				<nav class="header__middle">
					<ul>
						<li>
							<nuxt-link to="/">{{ $t('header.home') }}</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/catalog">{{ $t('header.catalog') }}</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/about">{{ $t('header.about') }}</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/contacts">{{ $t('header.contacts') }}</nuxt-link>
						</li>
					</ul>
				</nav>
				<div class="header__right">
					<div class="header__search">
						<button class="header__search__button">
							<img alt="Search" src="~/static/pics/svg/header/search.svg">
						</button>
					</div>
					<div class="header__langs">
						<button class="header__langs__button">
							<img alt="Languages" src="~/static/pics/svg/header/langs.svg">
						</button>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	computed: {
		isHomePage() {
			return this.$route.path == '/';
		}
	}
}
</script>