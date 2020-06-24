<template>
  <div class="about-page">
    <main class="about-page__about">
      <PageTitle :title="about.title[$i18n.locale]" />
      <p class="about-page__text">
        {{about.text[$i18n.locale]}}
      </p>
      <div class="about-page__pics container content">
        <img v-for="(item,i) in JSON.parse(about.images)" :key="i" :class="[{'left': i === 0, 'right-top': i === 1,'right-bottom': i === 2}]" :src="`${$specImgUrl}${item.url}`" :alt="item.url">
      </div>
      <div class="about-page__bottom-text">
        <p> {{about.quote[$i18n.locale]}}</p>
      </div>
      <img class="about-page__bg desktop-500" src="/pics/svg/about/bg.svg">
      <img class="about-page__bg mobile" src="/pics/svg/about/bg-mobile.svg">
    </main>
    <div class="about-page__certificates">
      <PageTitle :title="$t('about.certificates')" />
      <div class="about-page__certificates__inner">
        <div class="about-page__certificates__item" @click="showCertificate(i)" v-for="(certificate,i) in certificates" :key="i">
          <div class="about-page__certificates__item__wrapper">
            <div class="about-page__certificates__item__inner">
              <img :src="`${$imagesUrl}/${certificate.image}`" :alt="`${certificate.title[$i18n.locale]} ${certificate.type[$i18n.locale]}`">
            </div>
            <div class="about-page__certificates__item__triangle">
              <div class="about-page__certificates__item__triangle__info">
                <span class="title">{{ certificate.title[$i18n.locale] }}</span>
                <span class="subtitle">{{ certificate.type[$i18n.locale] }}</span>
              </div>
              <img src="/pics/svg/about/certificate-triangle.svg">
            </div>
          </div>
          <button class="about-page__certificates__show"><span>{{ $t('about.show') }}</span></button>
        </div>
      </div>
    </div>
    <div class="about-page__certificates__modal" v-show="certificateShown >= 0" @click="showCertificate(-1)">
      <img :src="`${$imagesUrl}/${certificate.image}`" :alt="`${certificate.title[$i18n.locale]} ${certificate.type[$i18n.locale]}`" v-show="certificateShown == i" v-for="(certificate,i) in certificates" :key="i">
    </div>
  </div>
</template>

<script>
import PageTitle from '~/components/global/PageTitle';
import { mapState } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('getAbout');
    await store.dispatch('getCertificates');
  },
  head() {
    return {
      title: `${this.$t('MetaTitle')}`,
      meta: [
        { name: 'description', content: `${this.$t('metaDescription')}` || '' },
        { property: 'og:title', content: `${this.$t('MetaTitle')}` || '' } ,
        { property: 'og:description', content: `${this.$t('metaDescription')}` || '' } ,
        { property: 'og:image', content: '/seo/seo.jpg' || '' } ,
        { property: 'og:url', content: `https://mobitek.az/${this.$route.fullPath}` || '' } ,
        { property: 'twitter:card', content: '/seo/seo.jpg' || '' } ,
        { name: 'keywords', content: `${this.$t('keywords')}` || '' },
      ]
    }
  },
  components: {
    PageTitle
  },

  data() {
    return {
      certificateShown: -1
    }
  },
  computed: {
    ...mapState(['about', 'certificates']),
  },
  methods: {
    showCertificate(i) {
      this.certificateShown = i;
    }
  }
}
</script>
