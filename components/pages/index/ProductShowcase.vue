<template>
	<div class="index-page__product-showcase container container--page">
		<div class="index-page__product-showcase__card">
			<div class="index-page__product-showcase__card__content">
				<a :href="`/catalog?cat=${cat.id}`" class="index-page__product-showcase__card__item" v-for="(cat,i) in data" :key="i" :class="{active: cat.id == chosen}" @click.prevent="chooseCat(cat.id)">
					<div class="index-page__product-showcase__card__item__icon">
						<img v-if="cat.slug.toLowerCase() != 'car'" :src="`/pics/svg/index/ps-${cat.slug.toLowerCase()}.svg`" :alt="cat.title[$i18n.locale]">
						<div v-else class="bodymovin" :data-icon="`/animations/${cat.slug.toLowerCase()}/anim.json`"></div>
					</div>
					<span>{{ cat.title[$i18n.locale] }}</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import lottie from 'lottie-web/build/player/lottie';

export default {
	props: ['data', 'chosen'],

	mounted() {
		let bodymovins = document.querySelectorAll('.bodymovin'),
			animation;
		bodymovins.forEach(e => {
			animation = lottie.loadAnimation({
				container: e,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				path: e.getAttribute('data-icon')
			});

			e.addEventListener('mouseover', () => { 
				if (animation.isPaused)
					animation.goToAndPlay(0);
			});
		});
	},

	methods: {
		chooseCat(id) {
			// if not on the catalog page
			if (this.$route.path.toLowerCase() != '/catalog' && this.$route.path.toLowerCase() != `/${this.$i18n.locale}/catalog`) {
				this.$router.push(this.$i18n.locale == 'en' ? `/catalog?cat=${id}` : `/${this.$i18n.locale}/catalog?cat=${id}`);
			} else this.$emit('chooseCat', id);
		}
	}
}
</script>
