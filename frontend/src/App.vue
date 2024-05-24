<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Nav.vue'


</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-E9QY5M2G75"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-E9QY5M2G75');
</script>

<template>
  <header>
  </header>

  <v-app>
    <v-container>
      <Navbar />
    <div class="container">
      <RouterView />
    </div>
  </v-container>
  </v-app>
</template>

<style scoped>

</style>
