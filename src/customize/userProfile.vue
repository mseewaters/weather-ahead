<template>
    <div>
      <h1>JWT Token</h1>
      <textarea readonly :value="jwtToken" rows="10" cols="50"></textarea>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const jwtToken = ref('');
  
  onMounted(() => {
    jwtToken.value = sessionStorage.getItem('token');
  });
  </script>
  
  <style>
  textarea {
    width: 100%;
    margin-top: 20px;
  }
  </style>
