<template>
  <div>
  	<Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';

export default {
	components: {
		Header,
		Footer
	},

	watch: {
		$route(n, o) {
			if (n.path.toLowerCase() == '/about')
				document.body.style.background = 'white';
			else
				document.body.style.background = '#EDEDED';
		}
	},

	mounted() {
		if (this.$route.path.toLowerCase() == '/about')
			document.body.style.background = 'white';
	}
}
</script>
