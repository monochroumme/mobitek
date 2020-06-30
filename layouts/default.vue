<template>
  <div>
    <Preloader />
    <Header :cart="cart" />
    <nuxt />
    <Footer />
    <GoToTop />
  </div>
</template>

<script>
import Header from '~/components/global/Header';
import Footer from '~/components/global/Footer';
import GoToTop from '~/components/global/GoToTop';
import Preloader from '~/components/global/Preloader';

export default {
  components: {
    Header,
    Footer,
    GoToTop,
    Preloader
  },

  watch: {
    $route(n, o) {
      if (this.$route.path.toLowerCase() == '/about' || this.$route.path.toLowerCase() == `/${this.$i18n.locale}/about`)
        document.body.style.background = 'white';
      else if (this.$route.path.toLowerCase() == '/catalog' || this.$route.path.toLowerCase() == `/${this.$i18n.locale}/catalog`)
        document.body.style.overflow = 'visible';
      else {
        document.body.style.overflow = '';
        document.body.style.background = '';
      }
      if (n.path.toLowerCase() != o.path.toLowerCase()) {
        let e = document.querySelector('.vue-back-to-top');
        if (e && e.click)
          e.click();
      }
    }
  },

  data() {
    return {
      cart: [
        {
          pic: '/pics/img/product.png',
          title: 'Anker PowerWave Pad & Stand 7.5W',
          price: 49
        },
        {
          pic: '/pics/img/product.png',
          title: 'Anker PowerWave Pad & Stand 7.5W',
          price: 49
        },
        {
          pic: '/pics/img/product.png',
          title: 'Anker PowerWave Pad & Stand 7.5W',
          price: 49
        },
        {
          pic: '/pics/img/product.png',
          title: 'Anker PowerWave Pad & Stand 7.5W',
          price: 49
        },
        {
          pic: '/pics/img/product.png',
          title: 'Anker PowerWave Pad & Stand 7.5W',
          price: 49
        }
      ]
    }
  },

  mounted() {
    if (this.$route.path.toLowerCase() == '/about' || this.$route.path.toLowerCase() == `/${this.$i18n.locale}/about`)
      document.body.style.background = 'white';

    window.addEventListener('resize', this.onResize);
    this.onResize();

    (function() {
      var s = document['createElement']('script');
      s.type = 'text/javascript';
      s.async = true;
      s.charset = 'utf-8';
      s.src = '//cleversite.ru/cleversite/widget_new.php?supercode=1&referer_main=' + encodeURIComponent(document.referrer) + '&clid=65205YADyb&siteNew=85200';
      var ss = document['getElementsByTagName']('script')[0];
      if (ss) {
        ss.parentNode.insertBefore(s, ss);
      } else {
        document.documentElement.firstChild.appendChild(s);
      };
    })();

    let watchForHover = () => {
      let hasHoverClass = false;
      let container = document.body;
      let lastTouchTime = 0;

      let enableHover = () => {
        // discard emulated mouseMove events coming from touch events
        if (new Date() - lastTouchTime < 500) return;
        if (hasHoverClass) return;

        container.classList.remove('touch');
        hasHoverClass = true;
        this.$bus.isMobile = false;
      }

      let disableHover = () => {
        if (!hasHoverClass) return;

        container.classList.add('touch');
        hasHoverClass = false;
        this.$bus.isMobile = true;
      }

      let updateLastTouchTime = () => {
        lastTouchTime = new Date();
      }

      document.addEventListener('touchstart', updateLastTouchTime, true);
      document.addEventListener('touchstart', disableHover, true);
      document.addEventListener('mousemove', enableHover, true);

      enableHover();
    }

    watchForHover();
  },

  methods: {
    onResize() {
      if (this.$route.path.toLowerCase() == '/catalog' || this.$route.path.toLowerCase() == `/${this.$i18n.locale}/catalog`) {
        if (window.innerWidth > 650) {
          document.body.style.overflow = 'visible';
        } else {
          document.body.style.overflow = '';
        }
      }
    }
  }
}
</script>
