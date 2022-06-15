<template>
 <navigation />
  <router-view />
</template>

<script>
import navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    navigation
  },
  created() {
    //this.$store.dispatch('autologin');
  },
}
</script>

<style>

</style>