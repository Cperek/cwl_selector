<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Nav.vue'
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
