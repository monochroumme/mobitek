<template>
	<div class="color-chooser">
		<div class="color-chooser__item__wrapper" v-for="(item,i) in colors" :key="i">
			<div class="color-chooser__item" @click="choose(radio ? item : i)" :style="{background: (radio ? item : item.title) }" :class="{ active: chosen.forEach && chosen[i] || chosen == item && radio }"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['colors', 'chosen', 'radio'],

	methods: {
		choose(i) {
			this.$emit('toggleColor', i);
		}
	}
}
</script>
