<template>
    <div>
      <h1>JWT Token</h1>
      <textarea readonly :value="jwtToken" rows="10" cols="50"></textarea>
    </div>
    <div>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {{ userProfile.username }}</p>
      <p><strong>Email:</strong> {{ userProfile.email }}</p>
      <p><strong>Last Login:</strong> {{ userProfile.lastlogin }}</p>
      <p><strong>Name:</strong> {{ userProfile.name }}</p>
      <form @submit.prevent="submitForm">
        <label for="notifications">Enable Notifications:</label>
        <input type="checkbox" id="notifications" v-model="settings.enableNotifications">
        
        <label for="zip">Zip Code:</label>
        <input type="text" id="zip" v-model="settings.zipCode">

        <button type="submit">Save Settings</button>
    </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const userProfile = ref({})
  //const error = ref('')
  const settings = ref({
    enableNotifications: false,
    zipCode: ''
  });

  // Define the JWT token and API URL
  const baseApiUrl = 'https://122jfj0o5h.execute-api.us-east-1.amazonaws.com/prod/user'
  const jwtToken = sessionStorage.getItem('token');

  // const fetchUserProfile = async (username) => {
  //   try {
  //     const response = await axios.get(`${baseApiUrl}?username=${username}`, {
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`
  //       }
  //     })
  //     userProfile.value = response.data
  //   } catch (err) {
  //     error.value = 'Error fetching user profile: ' + err.message
  //     console.error('Error fetching user profile:', err)
  //   }
  // }

  const fetchUserProfile = async () => {
  try {
    const username = sessionStorage.getItem('username');
    

    const response = await axios.get(`${baseApiUrl}?username=${username}`, {
      headers: { Authorization: `Bearer ${jwtToken}` }
    });

    userProfile.value = response.data

    if (response.data) {
      settings.value.enableNotifications = response.data.enableNotifications || false;
      settings.value.zipCode = response.data.zipCode || '';
    }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      alert('Failed to load user settings.');
    }
  };

  const submitForm = async () => {
    try {
      const username = sessionStorage.getItem('username');
      const response = await axios.post(`${baseApiUrl}?username=${username}`, {
        enableNotifications: settings.value.enableNotifications,
        zipCode: settings.value.zipCode
        }, 
        {
        headers: { Authorization: `Bearer ${jwtToken}` }
        });
      alert('Settings updated successfully!');
      console.log(response)
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('Failed to update settings.');
    }
  };
  
  onMounted(() => {
    fetchUserProfile()
  })
  </script>
  
  <style>
  textarea {
    width: 100%;
    margin-top: 20px;
  }
  </style>
