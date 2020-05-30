<template>
	<header class="header" :class="{ 'header--floating': floatPage, 'header--transparent': floatPage && transparent }">
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
					<div class="header__search" :class="{aside: showLangs}">
						<button class="header__search__button" @click="showSearchBar = !showSearchBar">
							<img alt="Search" src="/pics/img/header/search.png">
						</button>
						<div class="header__search__outer">
							<div class="header__search__inner" :class="{active: showSearchBar}">
								<div class="header__search__wrapper">
									<input type="text" name="search">
								</div>
							</div>
						</div>
					</div>
					<div class="header__langs">
						<button class="header__langs__button" @click="showLangs = !showLangs">
							<img alt="Languages" src="/pics/img/header/langs.png">
						</button>
						<div class="header__langs__outer">
							<div class="header__langs__inner" :class="{active: showLangs}">
								<div class="header__langs__wrapper">
									<button class="header__langs__item" @click="chooseLang('ru')">RU</button>
									<button class="header__langs__item" @click="chooseLang('az')">AZ</button>
									<button class="header__langs__item" @click="chooseLang('en')">EN</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			showSearchBar: false,
			showLangs: false,
			transparent: false
		}
	},

	mounted() {
		window.addEventListener('scroll', this.onScroll, false);
		this.onScroll();
	},

	computed: {
		floatPage() {
			return this.$route.path.toLowerCase() == '/' || this.$route.path.toLowerCase() == '/' + this.$i18n.locale;
		}
	},

	methods: {
		chooseLang(lang) {
			this.showLangs = false;
			setTimeout(() => {
				this.$router.push(this.switchLocalePath(lang));
			}, 200);
		},

		onScroll() {
			if (!document.querySelector('.index-page')) {
        return;
      }

      let scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop > window.innerHeight) {
      	this.transparent = false;
      } else {
      	this.transparent = true;
      }
    }
	}
}
</script>