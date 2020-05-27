<template>
	<div class="dropdown-filter" v-click-outside="() => {dropdownOpen = false}">
		<div class="dropdown-filter__top" @click="dropdownOpen = !dropdownOpen">
			<div class="dropdown-filter__top__left">
				<span>{{ value }}</span>
			</div>
			<div class="dropdown-filter__top__right">
				<img src="/pics/img/dropdown.png">
			</div>
		</div>
		<div class="dropdown-filter__dropdown" v-show="dropdownOpen">
			<div class="dropdown-filter__dropdown__item" v-for="(option,i) in options" :key="i" @click="choose(i)" :class="{ active: value == option }">
				<span>{{ option }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
	props: ['value', 'options'],

	directives: {
    ClickOutside
  },

	data() {
		return {
			dropdownOpen: false
		}
	},

	methods: {
		choose(i) {
			this.$emit('input', this.options[i]);
		}
	}
}
</script>
