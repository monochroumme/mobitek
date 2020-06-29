<template>
  <div class="index-page__welcome">
    <div v-swiper:mySwiper="swiperOption" class="index-page__welcome__bg">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, i) in data" :key="i">
          <img :src="`${$imagesUrl}/${item.image}`" :alt="item.title[$i18n.locale]">
        </div>
      </div>
    </div>
    <div class="index-page__welcome__bottom">
      <div class="index-page__welcome__bottom__item--empty"></div>
      <div class="index-page__welcome__bottom__item" v-for="(item, i) in data" :key="i" :class="{ active: activeIndex == i }" @click="mySwiper.slideTo(i)">
        <span>{{ item.title[$i18n.locale] }}</span>
      </div>
      <div class="index-page__welcome__bottom__item--empty"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],

  data() {
    return {
      swiperOption: {
        allowTouchMove: false,
        autoplay: true,
        init: false
      },
      activeIndex: 0
    }
  },

  mounted() {
    let bottom = document.querySelector('.index-page__welcome__bottom');

    this.mySwiper.on('slideChange', () => {
      this.activeIndex = this.mySwiper.activeIndex;

      // bottom items scroll when a small screen
      if (window.innerWidth > 600) {
        bottom.scrollTo({
          left: bottom.scrollLeft + this.mySwiper.slides[this.mySwiper.activeIndex].getBoundingClientRect().x - this.mySwiper.slides[this.mySwiper.activeIndex].getBoundingClientRect().width/3,
          behavior: 'smooth'
        });
      } else {
        bottom.scrollTo({
          left: bottom.scrollLeft + this.mySwiper.slides[this.mySwiper.activeIndex].getBoundingClientRect().x,
          behavior: 'smooth'
        });
      }
    });

    this.mySwiper.init();

    if (!this.$bus.isMobile) {
      const items = document.querySelectorAll('.index-page__welcome__bottom');
      let isDown = false;
      let startX;
      let scrollLeft;

      function dragOnElem(elems) {
        elems.forEach(el => {
          el.addEventListener('mousedown', (e) => {
          	e.preventDefault();
            isDown = true;
            startX = e.pageX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
          });
          el.addEventListener('mouseleave', () => {
            isDown = false;
          });
          el.addEventListener('mouseup', () => {
            isDown = false;
          });
          el.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            const walk = (x - startX); //scroll-fast
            el.scrollLeft = scrollLeft - walk;
          });
        });
      }

      dragOnElem(items);
    }
  }
}
</script>
