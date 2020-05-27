<template>
	<div class="product-page">
		<ProductShowcase class="catalog-page__product-showcase" />

		<ProductSlider :data="otherProducts" />
	</div>
</template>

<script>
import ProductShowcase from '~/components/pages/index/ProductShowcase';
import ProductSlider from '~/components/pages/product/ProductSlider';

export default {
	components: {
		ProductShowcase,
		ProductSlider
	},

	data() {
		return {
			otherProducts: [
        {
          reviews: 79,
          title: 'PD Pioneer 20000mAh Portable Charger',
          description: 'Substantial 60W PD output means it can charge your MacBook Pro perfectly, just as good as the original charger',
          rating: 5,
          pic: '/pics/img/index/p1.png',
          link: '/products/xz',
          price: 45
        },
        {
          reviews: 79,
          title: 'Anker PowerWave Pad & Stand 7.5W',
          description: 'Qi-Certified 7.5W for iPhone Xs Max XR XS X 8/8 Plus, 10W Fast Charging Samsungs',
          rating: 5,
          pic: '/pics/img/index/p2.png',
          link: '/products/xz',
          price: 45
        },
        {
          reviews: 79,
          title: 'Anker PowerPort Speed PD 5',
          description: 'Premium 60W 5-Port Desktop Charger with One 30W Power Delivery',
          rating: 5,
          pic: '/pics/img/index/p3.png',
          link: '/products/xz',
          editorsChoice: true,
          price: 45
        },
        {
          reviews: 79,
          title: 'Baseus Encok True Wireless Earphones W07',
          description: 'Automatic Switching of Primary and Secondary Earphone;Dual Mic noise reduction design',
          rating: 5,
          pic: '/pics/img/index/p4.png',
          link: '/products/xz',
          price: 45
        }
			]
		}
	}
}
</script>