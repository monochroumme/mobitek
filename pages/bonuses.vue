<template>
	<div class="bonuses-page">
		<text-page :html="html" page="/bonuses" />
	</div>
</template>

<script>
import textPage from '~/components/global/text-page';

export default {
	components: {
		'text-page': textPage
	},

	data() {
		return {
			html: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sollicitudin, justo eu venenatis vestibulum, libero mi consequat nulla, eget blandit quam orci ut enim. Phasellus consequat tristique elit, sit amet luctus orci imperdiet non. Nam sollicitudin nibh et felis convallis, dictum dignissim nunc gravida. Cras purus neque, porttitor eu nibh nec, vulputate laoreet augue. Quisque a arcu diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque hendrerit, turpis eget tempor suscipit, neque augue gravida enim, eget porta erat turpis a justo. Suspendisse euismod laoreet lacus vel efficitur. Cras facilisis quam ac leo luctus, ac posuere ipsum elementum. Aenean suscipit elit at ligula feugiat feugiat. Vivamus tempus nunc id tellus varius blandit. Fusce at est facilisis, condimentum metus vitae, congue lectus.

Phasellus fermentum lacus eget ultrices auctor. Aenean nec fermentum enim. Sed faucibus mauris sem, vitae vestibulum dolor tristique a. Aenean sed leo purus. Duis ac nunc et mauris ullamcorper euismod. Quisque dui metus, volutpat sit amet est eu, sodales tempus lorem. Aenean hendrerit lobortis tortor, pulvinar dictum elit.

Phasellus vel nulla est. Nam hendrerit elit nec faucibus porta. Etiam sed porttitor felis, vitae vehicula enim. Donec in velit tempus, gravida risus id, molestie turpis. Sed posuere odio euismod cursus scelerisque. Cras accumsan ultricies velit, ut elementum ipsum tincidunt sit amet. Curabitur sollicitudin rhoncus mi, nec sagittis nibh faucibus sit amet. Sed sed lacus nibh. Ut placerat massa eu quam eleifend, nec bibendum libero sollicitudin. Curabitur eros libero, tempus tempor placerat et, sollicitudin vel lorem. Fusce pellentesque lectus eu posuere lobortis. Suspendisse sed ex tincidunt massa viverra dictum id at risus. Maecenas sed rutrum turpis.

Suspendisse luctus libero dolor, sit amet auctor arcu ullamcorper vitae. Suspendisse at suscipit neque, sed elementum diam. Fusce dapibus, turpis at placerat vulputate, orci lectus tristique quam, at facilisis nunc purus vehicula ante. Nullam felis sem, dignissim ut nunc quis, pretium tristique enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Quisque nec vestibulum felis, eleifend fermentum quam. Aliquam ut consequat quam, vitae semper diam. Nullam sit amet tortor lectus. Nulla eget dolor lectus.

Morbi rutrum lobortis suscipit. Vivamus euismod tristique euismod. Nam facilisis accumsan magna quis mollis. Quisque sit amet ex ligula. Nulla facilisi. Pellentesque in ligula nisl. Donec sed nulla ligula. Nunc a porta velit. Curabitur luctus mattis erat. Donec imperdiet mi sed tellus aliquet mattis. Sed sit amet sagittis risus. Sed non dolor commodo, aliquam nunc vitae, rutrum erat.</p>`
		};
	}
}
</script>
