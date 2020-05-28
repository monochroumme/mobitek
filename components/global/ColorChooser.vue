<template>
	<div class="color-chooser">
		<div class="color-chooser__item__wrapper" v-for="(item,i) in value" :key="i">
			<div class="color-chooser__item" @click="choose(i)" :class="{
				red: item.color == 'red',
				yellow: item .color== 'yellow',
				purple: item.color == 'purple',
				black: item .color== 'black',
				gray: item.color == 'gray',
				active: item.chosen
			}"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['value'],

	methods: {
		choose(i) {
			let colors = this.value.slice();
			colors[i].chosen = !colors[i].chosen;
			this.$emit('input', colors);
			colors.push({});
			this.$emit('input', colors);
			colors.pop();
			this.$emit('input', colors);
		}
	}
}
</script>
