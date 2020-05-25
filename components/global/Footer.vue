<template>
  <footer class="footer">
    <div class="footer__content container">
      <div class="footer__left">
        <div class="footer__left__item">
        	<div class="footer__left__item__inner">
	          <span class="title">{{ $t('footer.information') }}</span>
	          <ul>
	            <li>
	              <nuxt-link to="/">{{ $t('footer.home') }}</nuxt-link>
	            </li>
	            <li>
	              <nuxt-link to="/catalog">{{ $t('footer.catalog') }}</nuxt-link>
	            </li>
	            <li>
	              <nuxt-link to="/about">{{ $t('footer.about-us') }}</nuxt-link>
	            </li>
	            <li>
	              <nuxt-link to="/contacts">{{ $t('footer.contact-us') }}</nuxt-link>
	            </li>
	          </ul>
	        </div>
        </div>
        <div class="footer__left__item">
        	<div class="footer__left__item__inner">
	          <span class="title">{{ $t('footer.to-clients') }}</span>
	          <ul>
	            <li>
	              <nuxt-link to="/rules">{{ $t('footer.delivery-rules') }}</nuxt-link>
	            </li>
	            <li>
	              <nuxt-link to="/promotions">{{ $t('footer.our-promotions') }}</nuxt-link>
	            </li>
	            <li>
	              <nuxt-link to="/bonuses">{{ $t('footer.bonuses') }}</nuxt-link>
	            </li>
	          </ul>
	        </div>
        </div>
        <div class="footer__left__item">
        	<div class="footer__left__item__inner">
	          <span class="title">{{ $t('footer.follow-us') }}</span>
	          <ul>
	            <li>
	              <a href="https://www.instagram.com/mobitek.az/" class="social">
	                <img src="/pics/img/footer/ig.png" alt="Instagram">
	                <span>Instagram</span>
	              </a>
	            </li>
	            <li>
	              <a href="https://www.facebook.com/mobitekaz-633079990499384" class="social">
	                <img src="/pics/img/footer/fb.png" alt="Facebook">
	                <span>Facebook</span>
	              </a>
	            </li>
	            <li>
	              <a href="https://www.youtube.com/" class="social">
	                <img src="/pics/img/footer/yt.png" alt="Youtube">
	                <span>Youtube</span>
	              </a>
	            </li>
	          </ul>
	        </div>
        </div>
        <div class="footer__left__item">
        	<div class="footer__left__item__inner">
	          <span class="title">{{ $t('footer.contacts') }}</span>
	          <ul>
	            <li>
	              <a href="tel:+994774600000" class="social">
	                <span>{{ $t('footer.phone') }}: +994 77 460 00 00</span>
	              </a>
	            </li>
	            <li>
	              <a target="_blank" href="https://g.page/mobitekazerbaijan?share" class="social">
	                <span>{{ $t('footer.office') }}: Dilara Aliyeva 176</span>
	              </a>
	            </li>
	            <li>
	              <a href="mail:office@mobitek.az" class="social">
	                <span>{{ $t('footer.mail') }}: Office@mobitek.az</span>
	              </a>
	            </li>
	          </ul>
	        </div>
        </div>
      </div>
      <div class="footer__stay-connected">
        <span class="title">{{ $t('footer.stay-connected.title') }}</span>
        <span class="text">{{ $t('footer.stay-connected.text') }}</span>
        <div class="send">
          <input type="email" name="email" placeholder="Email address">
          <button><span>{{ $t('footer.stay-connected.send') }}</span></button>
        </div>
      </div>
    </div>
  </footer>
</template>
