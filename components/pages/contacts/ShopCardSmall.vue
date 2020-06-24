<template>
	<div class="store-card" @click="onClick()">
		<div class="store-card__inner">
			<div class="store-card__top">
				<img class="logo" src="/pics/svg/contacts/card-logo.svg" alt="mobitek">
				<img class="bg" src="/pics/svg/contacts/card-rectangle.svg">
				<img class="bg big" src="/pics/svg/contacts/card-rectangle-big.svg">
				<img class="bg tiny" src="/pics/svg/contacts/card-rectangle-tiny.svg">
				<h2 class="title">{{ data.title[$i18n.locale] }}</h2>
			</div>
			<div class="store-card__bottom">
				<h3 class="details">{{ $t('contacts.card.details') }}</h3>
				<div class="row">
					<div class="item">
						<img src="/pics/img/contacts/map-pin.png" alt="location">
						<a @click.stop target="_blank" :href="`https://maps.google.com/?ll=${data.lat},${data.lng}&z=16`"><span>{{ data.address }}</span></a>
					</div>
				</div>
				<div class="row">
					<div class="item">
						<img src="/pics/img/contacts/phone.png" alt="phone">
						<a @click.stop class="phone" :href="`tel:${data.number ? data.number.replace('(', '').replace(')', '').replace(' ', '') : '/'}`"><span>{{ data.number }}</span></a>
					</div>
					<div class="item">
						<a @click.stop target="_blank" class="see-on-map" :href="`https://maps.google.com/?ll=${data.lat},${data.lng}&z=16`">{{ $t('contacts.card.see-address') }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['data'],

	methods: {
		onClick() {
			this.$emit('showOnMap', {lat: this.data.lat, lng: this.data.lng});
		}
	}
}
</script>
