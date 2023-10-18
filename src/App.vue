<template>
  <div id="app">
    <router-view />
    <FooterComp />
  </div>
</template>

<script setup>

import FooterComp from './components/FooterComp.vue';

</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
