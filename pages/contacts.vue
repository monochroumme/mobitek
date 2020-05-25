<template>
	<div class="contacts-page container">
		<PageTitle :title="$t('contacts.title')" />
		<main class="contacts-page__content">
			<div class="contacts-page__quadro">
				<ShopCardSmall class="contacts-page__card-small" :data="item" v-for="(item,i) in stores.quadro" :key="i" />
			</div>
			<ShopCardBig class="contacts-page__card-big" :data="stores.head" />
			<div class="contacts-page__locations">
				<h2>{{ $t('contacts.locations') }}</h2>
				<!-- TODO -->
			</div>
		</main>
	</div>
</template>

<script>
import PageTitle from '~/components/global/PageTitle';
import ShopCardSmall from '~/components/pages/contacts/ShopCardSmall';
import ShopCardBig from '~/components/pages/contacts/ShopCardBig';

export default {
	components: {
		PageTitle,
		ShopCardSmall,
		ShopCardBig
	},

	data() {
		return {
			stores: {
				quadro: [
					{
						title: 'shops.mall',
						address: 'Af Mall, Samad Vurgun, Baku, Azerbaijan',
						phone: '(070) 215 12 89',
						mapLink: ''
					},
					{
						title: 'shops.caspian',
						address: 'Caspian Plaza, Zivarbey Ahmadbeyov Street, Baku, Azerbaijan',
						phone: '(077) 621 07 77',
						mapLink: ''
					},
					{
						title: 'shops.mark-1',
						address: '200 Dilara Aliyeva Street, Baku, Azerbaijan',
						phone: '(077) 540 00 05',
						mapLink: ''
					},
					{
						title: 'shops.duty',
						address: 'Duty Free, Heydar Aliyev International Airport, Baku, Azerbaijan',
						phone: '(xxx) xxx xx xx',
						mapLink: ''
					}
				],
				head: {
					title: 'shops.head',
					address: '186 Dilara Aliyeva Street, Baku, Azerbaijan',
					phone: '(077) 460 00 00',
					mapLink: '',
					email: 'office@mobitek.az'
				}
			}
		}
	}
}
</script>
