<template>
    <div class="toggle-switch">
      <input type="checkbox" v-model="isCelsius" id="toggle-switch" />
      <label for="toggle-switch">
        <span class="toggle-switch-label">{{ isCelsius ? '°C' : '°F' }}</span>
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isCelsius = ref(true); // Initial value, can be set based on your requirement
  </script>
  
  <style scoped>
  .toggle-switch {
    display: inline-block;
    position: relative;
    width: 60px;
    height: 34px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-switch-label {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  
  .toggle-switch-label:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  input:checked + .toggle-switch-label {
    background-color: #2196f3;
  }
  
  input:checked + .toggle-switch-label:before {
    transform: translateX(26px);
  }
  </style>