<template>
	<div class="go-to-top" :class="{ active : show }">
		<client-only>
			<back-to-top :visibleoffsetbottom="10">
				<img src="/pics/svg/go-to-top.svg" alt="go to top">
			</back-to-top>
		</client-only>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		},

		mounted() {
			window.addEventListener('scroll', this.toggleShow);
			this.toggleShow();
		},

		methods: {
			toggleShow() {
				if (window.scrollY > 0)
					this.show = true;
				else this.show = false;
			}
		}
	}
</script>
