<template>
  <nuxt-link :href="localePath(`${to ? to : '/'}`)" :to="localePath(`${to ? to : '/'}`)">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: String
  },
  name: "clink"
}
</script>
