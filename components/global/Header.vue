<template>
	<header class="header" :class="{ 'header--floating': isExactPage('/'), 'header--transparent': isExactPage('/') && transparent }">
		<div class="header__content__wrapper">
			<div class="header__content container container--header">
				<div class="header__left desktop-1000">
					<clink to="/" class="header__logo">
						<img src="~/static/pics/svg/header/logo.svg">
					</clink>
				</div>
				<div class="header__mobile__bg" :class="{active: mobileMenuBgActive, visible: mobileMenuBgVisible}" @click="hideMobileMenu()"></div>
				<div class="header__left mobile">
					<button class="header__mobile__menu__button" @click="showMobileMenu()">
						<img src="/pics/img/header/mobile-menu-button.png">
					</button>
					<div class="header__mobile__menu" :class="{active: mobileMenuShown}">
						<div class="header__mobile__menu__logo" v-body-scroll-lock="mobileMenuShown">
							<a href="/" @click.prevent="mobileLink('/')">
								<img src="/pics/svg/header/logo-raw.svg">
							</a>
							<div class="header__mobile__menu__logo__side">
								<button class="header__mobile__menu__logo__side__cart" @click="toggleCart()">
									<img src="/pics/img/header/cart.png">
								</button>
								<div class="header__langs">
									<button class="header__langs__button" @click="toggleLangs()">
										<img alt="Languages" src="/pics/img/header/langs.png">
									</button>
									<div class="header__langs__outer" v-show="langsOuterShown">
										<div class="header__langs__inner" :class="{active: langsShown}">
											<div class="header__langs__wrapper">
												<button class="header__langs__item" @click="chooseLang('ru')" :class="{active: activeLang == 'ru'}">RU</button>
												<button class="header__langs__item" @click="chooseLang('az')" :class="{active: activeLang == 'az'}">AZ</button>
												<button class="header__langs__item" @click="chooseLang('en')" :class="{active: activeLang == 'en'}">EN</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="header__mobile__menu__content">
							<ul>
								<li>
									<a href="/" @click.prevent="mobileLink('/')" :class="{ active: isExactPage('/') }">{{ $t('header.home') }}</a>
								</li>
								<li>
									<a href="/catalog" @click.prevent="mobileLink('/catalog')" :class="{ active: isExactPage('/catalog') }">{{ $t('header.catalog') }}</a>
								</li>
								<li>
									<a href="/about" @click.prevent="mobileLink('/about')" :class="{ active: isExactPage('/about') }">{{ $t('header.about') }}</a>
								</li>
								<li>
									<a href="/contacts" @click.prevent="mobileLink('/contacts')" :class="{ active: isExactPage('/contacts') }">{{ $t('header.contacts') }}</a>
								</li>
							</ul>
							<div class="header__mobile__menu__close" @click="hideMobileMenu()">
								<img src="/pics/svg/header/close.svg">
							</div>
						</div>
					</div>
				</div>
				<nav class="header__middle desktop-1000">
					<ul>
						<li>
							<clink to="/" :class="{ active: isExactPage('/') }">{{ $t('header.home') }}</clink>
						</li>
						<li>
							<clink to="/catalog" :class="{ active: isExactPage('/catalog') }">{{ $t('header.catalog') }}</clink>
						</li>
						<li>
							<clink to="/about" :class="{ active: isExactPage('/about') }">{{ $t('header.about') }}</clink>
						</li>
						<li>
							<clink to="/contacts" :class="{ active: isExactPage('/contacts') }">{{ $t('header.contacts') }}</clink>
						</li>
					</ul>
				</nav>
				<div class="header__middle mobile">
					<clink to="/" class="header__logo" :class="{ active: searchBarShown || isCartShown() }">
						<img src="~/static/pics/svg/header/logo.svg">
					</clink>
				</div>
				<div class="header__right">
					<div class="header__search" :class="{aside: langsShown}">
						<button class="header__search__button" @click="search()">
							<img alt="Search" src="/pics/img/header/search.png">
						</button>
						<div class="header__search__outer" v-show="searchOuterShown">
							<div class="header__search__inner" :class="{active: searchBarShown}">
								<div class="header__search__wrapper">
									<input type="text" name="search" v-model="searchInput" @keydown.enter="search()">
								</div>
							</div>
						</div>
					</div>
					<div class="header__cart" :class="{aside: langsShown, active: cartShown}">
						<button class="header__cart__button" @click="toggleCart()">
							<img alt="Search" src="/pics/img/header/cart.png">
						</button>
						<div class="header__cart__outer" :class="{active: cartShown}" v-show="cartOuterShown">
							<div class="header__cart__inner">
								<div class="header__cart__wrapper">
									<h3 class="header__cart__title">{{ $t('cart.title') }}</h3>
									<div class="header__cart__line"></div>
									<div class="header__cart__content">
										<div class="header__cart__item" v-for="(item, i) in cart" :key="i">
											<div class="header__cart__item__colors">
												<div class="header__cart__item__colors__item" v-for="(color, k) in item.colors" :key="k" :style="{background: color}" :class="{chosen: color == item.color}"></div>
											</div>
											<div class="header__cart__item__content">
												<clink to="/" class="header__cart__item__left">
													<img :src="item.pic">
												</clink>
												<div class="header__cart__item__middle">
													<clink to="/" class="header__cart__item__title">{{ item.title }}</clink>
													<div class="header__cart__item__amount">
														<button @click="decreaseAmount(item.index, item.amount)">
															<img src="/pics/svg/header/minus.svg">
														</button>
														<input type="number" name="amount" :value="item.amount" @input="setAmount(item.index, $event.target.value)">
														<button @click="increaseAmount(item.index, item.amount)">
															<img src="/pics/svg/header/plus.svg">
														</button>
													</div>
												</div>
												<div class="header__cart__item__right">
													<div class="header__cart__item__price">
														<span>{{ item.price }} azn</span>
													</div>
													<div class="header__cart__item__remove" @click="removeOrder(item.index)">
														<img src="/pics/svg/header/cross.svg">
													</div>
												</div>
											</div>
										</div>
									</div>
									<button class="header__cart__order" v-if="cart.length > 0" @click="onOrder()">
										<span>{{ $t('cart.order') }}</span>
									</button>
									<span class="header__cart__empty" v-if="cart.length == 0">
										{{ $t('cart.empty') }}
									</span>
								</div>
							</div>
							<div class="header__cart__outer__bg" @click="toggleCart()"></div>
						</div>
					</div>
					<div class="header__langs desktop-500">
						<button class="header__langs__button" @click="toggleLangs()">
							<img alt="Languages" src="/pics/img/header/langs.png">
						</button>
						<div class="header__langs__outer" v-show="langsOuterShown">
							<div class="header__langs__inner" :class="{active: langsShown}">
								<div class="header__langs__wrapper">
									<button class="header__langs__item" @click="chooseLang('ru')" :class="{active: activeLang == 'ru'}">RU</button>
									<button class="header__langs__item" @click="chooseLang('az')" :class="{active: activeLang == 'az'}">AZ</button>
									<button class="header__langs__item" @click="chooseLang('en')" :class="{active: activeLang == 'en'}">EN</button>
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
import {mapActions} from 'vuex';

export default {
	data() {
		return {
			searchBarShown: false,
			searchOuterShown: false,
			langsShown: false,
			langsOuterShown: false,
			cartShown: false,
			cartOuterShown: false,
			transparent: false,
			mobileMenuShown: false,
			mobileMenuBgActive: false,
			mobileMenuBgVisible: false,

			searchInput: '',

			mobileMenuTransform: 'transform .2s ease',
			mobileMenuOrientationChangeWidth: 400,

			cart: []
		}
	},

	mounted() {
		window.addEventListener('scroll', this.onScroll, false);
		window.addEventListener('resize', this.onResize, false);
		this.onScroll();

		let mobileMenuCloser = document.querySelector('.header__mobile__menu__close'),
				mobileMenu = document.querySelector('.header__mobile__menu'),
				drag = false,
				curLoc = 0,
				startLoc = 0,
				touchStartTime = 0;

		let onMouseMove = e => {
			if (drag) {
				if (window.innerWidth > this.mobileMenuOrientationChangeWidth)
					curLoc = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
				else
					curLoc = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

				curLoc -= startLoc;

				if (curLoc > 0)
					curLoc = 0;
				
				if (window.innerWidth > this.mobileMenuOrientationChangeWidth)
					mobileMenu.style.transform = `translateX(${curLoc}px)`;
				else
					mobileMenu.style.transform = `translateY(${curLoc}px)`;
			}
		};

		let onMouseUp = e => {
			if (!drag) return;

			if (window.innerWidth > this.mobileMenuOrientationChangeWidth && curLoc < -mobileMenu.getBoundingClientRect().width / 4) {
				mobileMenu.style.transition = '';
				setTimeout(() => {
					mobileMenu.style.transform = '';
					this.hideMobileMenu();
				}, 1);
			} else if (window.innerWidth <= this.mobileMenuOrientationChangeWidth && curLoc < -mobileMenu.getBoundingClientRect().height / 4) {
				mobileMenu.style.transition = '';
				setTimeout(() => {
					mobileMenu.style.transform = '';
					this.hideMobileMenu();
				}, 1);
			} else {
				mobileMenu.style.transition = '';
				setTimeout(() => {
					mobileMenu.style.transform = '';
					if (new Date() - touchStartTime < 199) {
						this.hideMobileMenu();
					}
				}, 1);
			}

			drag = false;
		};

		let onCloser = e => {
			e.preventDefault();
			mobileMenu.style.transition = 'none';
			touchStartTime = new Date();
			if (window.innerWidth > this.mobileMenuOrientationChangeWidth) {
				startLoc = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
				startLoc -= mobileMenu.getBoundingClientRect().x;
			} else {
				startLoc = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
				startLoc -= mobileMenu.getBoundingClientRect().y;
			}
			drag = true;
		};

		mobileMenuCloser.addEventListener('mousedown', e => {
			onCloser(e);
		});
		mobileMenuCloser.addEventListener('touchstart', e => {
			onCloser(e);
		});

		window.addEventListener('mousemove', onMouseMove, false);
		window.addEventListener('touchmove', onMouseMove, false);
		window.addEventListener('mouseup', onMouseUp, false);
		window.addEventListener('touchend', onMouseUp, false);

		this.updateCart();
		this.$bus.$on('update-cart', () => { this.updateCart(); });
	},

	computed: {
		activeLang() {
			if (this.$i18n)
				return this.$i18n.locale;
			return '';
		}
	},

	methods: {
		...mapActions(['getTempProduct']),

		isCartShown() {
			if (process.browser && window && window.innerWidth <= 890 && this.cartShown)
				return true;
			return false;
		},

		onOrder() {
			
		},
 
		updateCart() {
			this.cart = [];
			// filling the cart
			let cart = this.$cookies.get('cart');
			if (cart && cart.forEach) {
				cart.forEach(async index => {
					let order = this.$cookies.get(`orders[${index}]`);
					if (order) {
						let product = await this.getTempProduct(order.productId);
						if (product) {
							console.log(product);
							this.cart.push({
								pic: product.images && JSON.parse(product.images)[0] ? `${this.$specImgUrl}${JSON.parse(product.images)[0].url}` : '',
								color: order.color,
								colors: product.color ? this.getColors(product.color) : [...order.color],
								price: product.price,
								amount: order.amount,
								title: product.title[this.$i18n.locale],
								index
							});
						} else {
							// remove the item from the cookies
							this.removeOrder(index);
						}
					}
				});
			}
		},

    getColors(colors) {
      if (colors.includes(', '))
        return colors.split(', ');
      else if (colors.includes(' '))
        return colors.split(' ');
      return colors.split();
    },

		removeOrder(index) {
			// remove from the cart cookie
			let cart = this.$cookies.get('cart');
			if (cart) {
				let indexInCartCookie = cart.indexOf(index);
				if (indexInCartCookie != -1) {
					cart.splice(indexInCartCookie, 1);
					// remove the old cookie
					this.$cookies.set('cart', {}, {
						maxAge: 0 // six month
					});
					// set the new cookie
					this.$cookies.set('cart', cart, {
						maxAge: 60 * 60 * 24 * 30 * 6 // six month
					});
				}
			}

			// remove the order cookie
			let order = this.$cookies.get(`orders[${index}]`);
			if (order != undefined) {
				this.$cookies.set(`orders[${index}]`, {}, {
					maxAge: 0
				});
			}

			// remove from the cart
			let indexInCart = this.cart.findIndex(order => order.index == index);
			if (indexInCart != undefined)
				this.cart.splice(indexInCart, 1);
		},

		increaseAmount(index, value) {
			if (value < 101)
				this.setAmount(index, value+1);
		},

		decreaseAmount(index, value) {
			if (value > 1)
				this.setAmount(index, value-1);
		},

		setAmount(index, value) {
			// update in the cart
			let indexInCart = this.cart.findIndex(order => order.index == index);
			if (indexInCart != undefined) {
				this.cart[indexInCart].amount = value;
				this.cart.push({});
				this.cart.pop();
			}

			// update in the order cookie
			let order = this.$cookies.get(`orders[${index}]`);
			if (order != undefined) {
				this.$cookies.set(`orders[${index}]`, this.cart[indexInCart], {
					maxAge: 60 * 60 * 24 * 30 * 6 // six month
				});
			} else {
				// remove the item from the cart
				this.removeOrder(index);
			}
		},

		search() {
			if (this.searchBarShown && this.searchInput.trim().length > 0) {
				if (this.$route.path.toLowerCase() != '/catalog' && this.$route.path.toLowerCase() != '/catalog/' + this.$i18n.locale)
					this.$router.push(`/catalog?title=${this.searchInput}`);
				else this.$bus.$emit('search', this.searchInput);
			}
			if (!this.searchBarShown) {
				this.searchOuterShown = true;
				setTimeout(() => { this.searchBarShown = true; }, 1);
			} else {
				this.searchBarShown = false;
				setTimeout(() => {
					if (!this.searchBarShown) {
						this.searchOuterShown = false;
						this.searchInput = '';
					}
				}, 300);
			}
		},

		toggleCart() {
			if (!this.cartShown) {
				this.cartOuterShown = true;
				setTimeout(() => { this.cartShown = true; }, 1);
			} else {
				this.cartShown = false;
				setTimeout(() => {
					if (!this.cartShown)
						this.cartOuterShown = false;
				}, 300);
			}
		},

		chooseLang(lang) {
			this.toggleLangs();
			setTimeout(() => {
				this.$router.push(this.switchLocalePath(lang));
			}, 200);
		},

		toggleLangs() {
			if (!this.langsShown) {
				this.langsOuterShown = true;
				setTimeout(() => { this.langsShown = true; }, 1);
			} else {
				this.langsShown = false;
				setTimeout(() => {
					if (!this.langsShown)
						this.langsOuterShown = false;
				}, 300);
			}
		},

		isExactPage(page) {
			return this.$route.path.toLowerCase() == page || this.$route.path.toLowerCase() == page + this.$i18n.locale || this.$route.path.toLowerCase() == `/${this.$i18n.locale}${page}`;
		},

		showMobileMenu() {
			this.mobileMenuShown = true;
			this.mobileMenuBgActive = true;
			setTimeout(() => {
				this.mobileMenuBgVisible = true;
			}, 1);
		},

		hideMobileMenu() {
			this.mobileMenuBgVisible = false;
			this.mobileMenuShown = false;
			setTimeout(() => {
				if (!this.mobileMenuBgVisible)
					this.mobileMenuBgActive = false;
			}, 250);
		},

		mobileLink(link) {
			this.hideMobileMenu();
			this.$router.push(link);
		},

		onResize() {
			this.langsShown = false;
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
