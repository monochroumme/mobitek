<template>
  <div class="index-page">
    <Welcome :data="welcomePics" />
    <ProductShowcase />
    <ProductSlider :data="products" />
    <Banners />
    <VideoSlider />
    <BottomFeatures />
  </div>
</template>

<script>
import Welcome from '~/components/pages/index/Welcome';
import ProductShowcase from '~/components/pages/index/ProductShowcase';
import ProductSlider from '~/components/pages/index/ProductSlider';
import Banners from '~/components/pages/index/Banners';
import VideoSlider from '~/components/pages/index/VideoSlider';
import BottomFeatures from '~/components/pages/index/BottomFeatures';

export default {
  components: {
    Welcome,
    ProductShowcase,
    ProductSlider,
    Banners,
    VideoSlider,
    BottomFeatures
  },

  data() {
    return {
      welcomePics: [
        {
          pic: 'pics/img/index/bg.png',
          title: 'Charge Everything Faster'
        },
        {
          pic: 'pics/img/index/bg.png',
          title: 'Stay Smart at Home'
        },
        {
          pic: 'pics/img/index/bg.png',
          title: 'Charge While You Call'
        }
      ],

      products: [
        {
          title: 'Best Sellers',
          products: [
            {
              reviews: 79,
              title: 'PD Pioneer 20000mAh Portable Charger',
              description: 'Substantial 60W PD output means it can charge your MacBook Pro perfectly, just as good as the original charger',
              rating: 5,
              pic: 'pics/img/index/p1.png',
              link: '/product/xz',
              price: 45
            },
            {
              reviews: 79,
              title: 'Anker PowerWave Pad & Stand 7.5W',
              description: 'Qi-Certified 7.5W for iPhone Xs Max XR XS X 8/8 Plus, 10W Fast Charging Samsungs',
              rating: 5,
              pic: 'pics/img/index/p2.png',
              link: '/product/xz',
              price: 45
            },
            {
              reviews: 79,
              title: 'Anker PowerPort Speed PD 5',
              description: 'Premium 60W 5-Port Desktop Charger with One 30W Power Delivery',
              rating: 5,
              pic: 'pics/img/index/p3.png',
              link: '/product/xz',
              price: 45,
              editorsChoice: true
            },
            {
              reviews: 79,
              title: 'Baseus Encok True Wireless Earphones W07',
              description: 'Automatic Switching of Primary and Secondary Earphone;Dual Mic noise reduction design',
              rating: 5,
              pic: 'pics/img/index/p4.png',
              link: '/product/xz',
              price: 45
            }
          ]
        },
        {
          title: 'Top rated products',
          products: [
            {
              reviews: 79,
              title: 'PD Pioneer 20000mAh Portable Charger',
              description: 'Substantial 60W PD output means it can charge your MacBook Pro perfectly, just as good as the original charger',
              rating: 5,
              pic: 'pics/img/index/p1.png',
              link: '/product/xz',
              price: 45
            },
            {
              reviews: 79,
              title: 'Anker PowerWave Pad & Stand 7.5W',
              description: 'Qi-Certified 7.5W for iPhone Xs Max XR XS X 8/8 Plus, 10W Fast Charging Samsungs',
              rating: 3,
              pic: 'pics/img/index/p2.png',
              link: '/product/xz',
              price: 45
            },
            {
              reviews: 79,
              title: 'Anker PowerPort Speed PD 5',
              description: 'Premium 60W 5-Port Desktop Charger with One 30W Power Delivery',
              rating: 2,
              pic: 'pics/img/index/p3.png',
              link: '/product/xz',
              price: 45,
              editorsChoice: true
            },
            {
              reviews: 79,
              title: 'Baseus Encok True Wireless Earphones W07',
              description: 'Automatic Switching of Primary and Secondary Earphone;Dual Mic noise reduction design',
              rating: 4,
              pic: 'pics/img/index/p4.png',
              link: '/product/xz',
              price: 45
            }
          ]
        },
        {
          title: 'Editors’ Choices',
          products: [
            {
              reviews: 79,
              title: 'PD Pioneer 20000mAh Portable Charger',
              description: 'Substantial 60W PD output means it can charge your MacBook Pro perfectly, just as good as the original charger',
              rating: 5,
              pic: 'pics/img/index/p1.png',
              link: '/product/xz',
              price: 45,
              editorsChoice: true
            },
            {
              reviews: 79,
              title: 'Anker PowerWave Pad & Stand 7.5W',
              description: 'Qi-Certified 7.5W for iPhone Xs Max XR XS X 8/8 Plus, 10W Fast Charging Samsungs',
              rating: 5,
              pic: 'pics/img/index/p2.png',
              link: '/product/xz',
              price: 45,
              editorsChoice: true
            },
            {
              reviews: 79,
              title: 'Anker PowerPort Speed PD 5',
              description: 'Premium 60W 5-Port Desktop Charger with One 30W Power Delivery',
              rating: 5,
              pic: 'pics/img/index/p3.png',
              link: '/product/xz',
              price: 45,
              editorsChoice: true
            },
            {
              reviews: 79,
              title: 'Baseus Encok True Wireless Earphones W07',
              description: 'Automatic Switching of Primary and Secondary Earphone;Dual Mic noise reduction design',
              rating: 5,
              pic: 'pics/img/index/p4.png',
              link: '/product/xz',
              price: 45,
              editorsChoice: true
            }
          ]
        }
      ]
    }
  }
}
</script>
