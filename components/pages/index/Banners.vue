<template>
	<div class="index-page__banners">
		<div class="content container">
			<div class="how flip-card">
				<div class="flip-card__inner">
					<div class="flip-card__front">
						<img src="~/static/pics/img/index/banner-how.png" :alt="$t('index.banners.how.alt')">
					</div>
					<div class="flip-card__back f-white b-dark">
						<h2>{{ $t('index.banners.how.title') }}</h2>
						<p>{{ $t('index.banners.how.text') }}</p>
					</div>
				</div>
			</div>
			<div class="apple flip-card">
				<div class="flip-card__inner">
					<div class="flip-card__front">
						<img src="~/static/pics/img/index/banner-apple.png" :alt="$t('index.banners.apple.alt')">
					</div>
					<div class="flip-card__back f-dark b-yellow">
						<h2>{{ $t('index.banners.apple.title') }}</h2>
						<p>{{ $t('index.banners.apple.text') }}</p>
					</div>
				</div>
			</div>
			<div class="smart flip-card">
				<div class="flip-card__inner">
					<div class="flip-card__front">
						<img src="~/static/pics/img/index/banner-smart-home.png" :alt="$t('index.banners.smart.alt')">
					</div>
					<div class="flip-card__back f-dark b-orange">
						<h2>{{ $t('index.banners.smart.title') }}</h2>
						<p>{{ $t('index.banners.smart.text') }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
