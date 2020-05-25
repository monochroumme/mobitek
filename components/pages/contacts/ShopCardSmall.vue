<template>
	<div class="store-card">
		<div class="store-card__inner">
			<div class="store-card__top">
				<img class="logo" src="/pics/svg/contacts/card-logo.svg" alt="mobitek">
				<img class="bg" src="/pics/svg/contacts/card-rectangle.svg">
				<h2 class="title">{{ $t(data.title) }}</h2>
			</div>
			<div class="store-card__bottom">
				<h3 class="details">{{ $t('contacts.card.details') }}</h3>
				<div class="row">
					<div class="item">
						<img src="/pics/img/contacts/map-pin.png" alt="location">
						<a href="/"><span>{{ data.address }}</span></a>
					</div>
				</div>
				<div class="row">
					<div class="item">
						<img src="/pics/img/contacts/phone.png" alt="phone">
						<a class="phone" :href="`tel:${data.phone ? data.phone.replace(' ', '').replace('(', '').replace(')', '') : '/'}`"><span>{{ data.phone }}</span></a>
					</div>
					<div class="item">
						<a class="see-on-map" :href="data.mapLink">{{ $t('contacts.card.see-address') }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['data']
}
</script>