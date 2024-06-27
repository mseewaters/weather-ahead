<template>
    <div class="slider-container">
      <div :class="['slider', { 'slider-f': isFahrenheit }]">
        <div class="option" @click="selectFahrenheit">°F</div>
        <div class="option" @click="selectCelsius">°C</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isFahrenheit = ref(true);
  
  const selectFahrenheit = () => {
    isFahrenheit.value = true;
  };
  
  const selectCelsius = () => {
    isFahrenheit.value = false;
  };
  </script>
  
  <style scoped>
  .slider-container {
    display: flex;
    align-items: center;
  }
  
  .slider {
    display: flex;
    width: 100px;
    border: 1px solid #ccc;
    border-radius: 25px;
    overflow: hidden;
    cursor: pointer;
    background-color: #eee;
  }
  
  .slider-f .option:first-child {
    background-color: #3b82f6;
    color: white;
  }
  
  .slider-f .option:last-child {
    background-color: transparent;
    color: black;
  }
  
  .slider:not(.slider-f) .option:first-child {
    background-color: transparent;
    color: black;
  }
  
  .slider:not(.slider-f) .option:last-child {
    background-color: #3b82f6;
    color: white;
  }
  
  .option {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    transition: background-color 0.3s, color 0.3s;
  }
  </style>
  