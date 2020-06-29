<template>
	<div class="delivery-page">
		<text-page :data="data" />
	</div>
</template>

<script>
	import textPage from '~/components/global/text-page';

	export default {
		components: {
			'text-page': textPage
		},

		computed: {
			data() {
				return {};
			}
		}
	}
</script>
