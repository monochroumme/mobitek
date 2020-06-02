<template>
	<div class="about-page">
		<main class="about-page__about">
			<PageTitle :title="$t('about.title')" />
			<p class="about-page__text">
				Welcome to Mobitek.az . We're dedicated to providing you the very best of accessories & gadjets , with an emphasis on Quallity and Intelligence. Founded in 2016 , Mobitek has come a long way from its beginnings with technology love. When we first started out, our passion for “Quality Products for All” drove us to start our own business. We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.<br><br>Sincerely, your Loyal Company - Mobitek Azerbaijan
			</p>
			<div class="about-page__pics container content">
				<img class="left" src="/pics/img/about/1.png" alt="Mobitek store">
				<img class="right-top" src="/pics/img/about/2.png" alt="Mobitek store">
				<img class="right-bottom" src="/pics/img/about/3.png" alt="Mobitek store">
			</div>
			<div class="about-page__bottom-text">
				<p>We proudly provide WHOLESALE and RETAIL sales of products such as Speakers, Headphones, Powerbanks and etc. with well made HIGH QUALITY at AFFORDABLE PRICES which belong to the well-known Brands from all over the World</p>
			</div>
			<img class="about-page__bg" src="/pics/svg/about/bg.svg">
		</main>
		<div class="about-page__certificates">
			<PageTitle :title="$t('about.certificates')" />
			<div class="about-page__certificates__inner">
				<div class="about-page__certificates__item" @click="showCertificate(1)">
					<img src="/pics/img/about/c1.png" alt="Devia Accessories Authorization Certificate">
					<img class="onhover" src="/pics/img/about/c1h.png">
					<button class="about-page__certificates__show"><span>Show</span></button>
				</div>
				<div class="about-page__certificates__item" @click="showCertificate(2)">
					<img src="/pics/img/about/c2.png" alt="Joyroom Authorization Certificate">
					<img class="onhover" src="/pics/img/about/c2h.png">
					<button class="about-page__certificates__show"><span>Show</span></button>
				</div>
				<div class="about-page__certificates__item" @click="showCertificate(3)">
					<img src="/pics/img/about/c3.png" alt="Rock Accessories Authorization Certificate">
					<img class="onhover" src="/pics/img/about/c3h.png">
					<button class="about-page__certificates__show"><span>Show</span></button>
				</div>
			</div>
		</div>
		<div class="about-page__certificates__modal" v-show="certificateShown > 0" @click="showCertificate(-1)">
			<img src="/pics/img/about/c1.jpg" alt="Devia Accessories Authorization Certificate" v-show="certificateShown == 1">
			<img src="/pics/img/about/c2.jpg" alt="Joyroom Authorization Certificate" v-show="certificateShown == 2">
			<img src="/pics/img/about/c3.jpg" alt="Rock Accessories Authorization Certificate" v-show="certificateShown == 3">
		</div>
	</div>	
</template>

<script>
import PageTitle from '~/components/global/PageTitle';

export default {
	components: {
		PageTitle
	},

	data() {
		return {
			certificateShown: -1
		}
	},

	methods: {
		showCertificate(i) {
			this.certificateShown = i;
		}
	}
}	
</script>
