<template>
  <main>
    <router-view/>
  </main>
</template>

<script setup>
import '@/assets/global.css';
</script>


<style>

html, body {
  font-family: 'Roboto', Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  color: var(--dkblue);
  background: var(--ltgreen);
}

main {
  width: 100%;
  min-height: 300px;
}


</style>
