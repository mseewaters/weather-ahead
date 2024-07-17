<template>
    <div class="toggle-container">
        <label class="toggle-label">
        <input type="radio" name="units" value="F" v-model="selectedUnit">
        <span class="toggle-option">°F</span>
        </label>
        <label class="toggle-label">
        <input type="radio" name="units" value="C" v-model="selectedUnit">
        <span class="toggle-option">°C</span>
        </label>
    </div>
</template>

<script setup>
    import { ref } from 'vue'

    const selectedUnit = ref('F')
</script>

<style>
.toggle-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 25px;
    overflow: hidden;
    width: 100px;
    }

.toggle-label {
    position: relative;
    margin: 0;
    padding: 10px 20px;
    cursor: pointer;
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    color: #007bff; /* Blue color for unselected options */
    }

.toggle-label input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    }

.toggle-label .toggle-option {
    position: relative;
    z-index: 1;
    }

.toggle-label input:checked + .toggle-option {
    color: white;
    }

.toggle-label input:checked + .toggle-option::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #007bff; /* Blue background for selected option */
    border-radius: 25px;
    z-index: 0;
    }

.toggle-label .toggle-option::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    transition: background-color 0.3s;
    z-index: -1;
    }
</style>
