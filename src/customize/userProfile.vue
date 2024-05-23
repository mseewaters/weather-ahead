<template>
  <main>
    <div class="container">
      <div class="left-side">
        <div>
          <h2>Welcome, {{ userProfile.name }}</h2>
          <h5>Add/modify your location and notification preferences</h5>
          <h4 style="color: var(--dkgreen)" v-if="isLoading">Loading your data ...</h4>
        </div>
        <div v-if="!isLoading">
          <form @submit.prevent="submitForm">
            <div class="toggle-container">
              <label for="notificationToggle" class="toggle-label">Enable weather emails</label>
              <label class="switch">
                <input type="checkbox" id="notificationToggle" v-model="settings.enableNotifications">
                <span class="slider"></span>
              </label>
            </div>
            <br>
            <div class="form-group">
              <label for="city" class="fixed-label">City:</label>
              <input type="text" id="city" v-model="settings.city">
            </div>
            <div class="country-selector">
              <label for="country-dropdown" class="fixed-label">Country:</label>
              <select id="country-dropdown" v-model="settings.country" class="country-dropdown">
                <option disabled value="">Please select one</option>
                <option v-for="country in countries" :key="country.code" :value="country.code">
                  {{ country.name }}
                </option>
              </select>
            </div>
            <br>
            <h4>Select days to receive notifications</h4>
            <div>
              <label v-for="day in daysOfWeek" :key="day" class="checkbox-container">
                <input type="checkbox" v-model="selectedDays" :value="day">
                {{ day }}
              </label>
            </div>
            <br>
            <br>
            <button type="submit">Update profile</button>
          </form>
          <br>
          <br>
          <div style="font-size: 0.8rem">
            <b>Your location: </b>
            <p>{{ settings.location }}</P>
          </div>
        </div>
<!--         <br>
        <div>
          <h3>JWT Token</h3>
          <textarea readonly :value="jwtToken" rows="10" cols="50"></textarea>
        </div> -->
      </div>
      <div class="vertical-line"></div>
      <div class="right-side2">
        <h2>Customized events coming soon</h2>
        <div class="centered-image">
            <img src="../assets/logo-final-removebg.png" alt="Logo" width=50% height=auto>
        </div>
        <div>
          <img src="../assets/cold-temperature.png" alt="Cold" width=10% height=auto>
          <img src="../assets/running.png" alt="Running" width=10% height=auto>
          <p><a href="https://iconscout.com/icons/running" class="text-underline font-size-sm" target="_blank">running </a> by maninderkaur on IconScout</p>
        </div>
      </div>

    </div>
    </main>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import '@/assets/global.css'

  const isLoading = ref(true);

  const userProfile = ref({})
  //const error = ref('')
  const retrySettings = {
    retryDelay: 2000,  // Initial delay for retries in milliseconds
    retryCount: 0     // Initial retry counter
  };
  const settings = ref({
    enableNotifications: false,
    city: '',
    country:'',
    location: ''
  });
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const selectedDays = ref([]);

  const countries = [
  {name: 'United States', code: 'US' },
  {name: 'Bangladesh', code: 'BD'}, 
  {name: 'Brazil', code: 'BR'}, 
  {name: 'Canada', code: 'CA' },
  {name: 'China', code: 'CN'}, 
  {name: 'Czechia', code: 'CZ'}, 
  {name: 'Germany', code: 'DE'}, 
  {name: 'Egypt', code: 'EG'}, 
  {name: 'Ethiopia', code: 'ET'}, 
  {name: 'France', code: 'FR'}, 
  {name: 'United Kingdom', code: 'GB'}, 
  {name: 'Indonesia', code: 'ID'}, 
  {name: 'India', code: 'IN'}, 
  {name: 'Italy', code: 'IT'}, 
  {name: 'Japan', code: 'JP'}, 
  {name: 'Mexico', code: 'MX'}, 
  {name: 'Nigeria', code: 'NG'}, 
  {name: 'Pakistan', code: 'PK'}, 
  {name: 'Philippines', code: 'PH'}, 
  {name: 'Singapore', code: 'SG'}, 
  {name: 'Thailand', code: 'TH'}, 
  {name: 'United States', code: 'US'}, 
  {name: 'South Africa', code: 'ZA'}
  // Add more countries
];

  // Define the JWT token and API URL
  const baseApiUrl = 'https://122jfj0o5h.execute-api.us-east-1.amazonaws.com/prod/user'
  const jwtToken = sessionStorage.getItem('token');

  const fetchUserProfile = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
        

      const response = await axios.get(`${baseApiUrl}?userId=${userId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });

      userProfile.value = response.data
      console.log(userProfile.value)

      if (response.data) {
        retrySettings.retryCount = 0;
        settings.value.enableNotifications = response.data.enableNotifications || false;
        settings.value.city = response.data.locationInfo?.city|| '';
        settings.value.country = response.data.locationInfo?.country|| '';
        settings.value.location = response.data.locationInfo?.locationName|| '';
        selectedDays.value = response.data.dayOfWeek|| '';
        isLoading.value = false;
      } else {
          if (retrySettings.retryCount < 5) {
            retrySettings.retryCount++;
            setTimeout(fetchUserProfile, retrySettings.retryDelay);
            retrySettings.retryDelay += 1000;  // Increment delay for the next retry
          } else {
              alert('Please check your network connection or try again later.');
          }
      }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        console.log("Retry count", retrySettings.retryCount)
        // Optional: Increment a retry counter and stop retrying after a maximum number of attempts
        if (retrySettings.retryCount < 5) {
          retrySettings.retryCount++;
            setTimeout(fetchUserProfile, retrySettings.retryDelay);
        } else {
            alert('Please check your network connection or try again later.');
        }
      }
    };

  const submitForm = async () => {
    if (settings.value.enableNotifications && (!settings.value.city || settings.value.city.trim() === '')) {
    alert("A city and country are required for notifications");
    return;
    }
    try {
      const userId = sessionStorage.getItem('userId');
      const response = await axios.post(`${baseApiUrl}?userId=${userId}`, {
        enableNotifications: settings.value.enableNotifications,
        city: encodeURIComponent(settings.value.city),
        country: settings.value.country,
        days: selectedDays.value
        }, 
        {
        headers: { Authorization: `Bearer ${jwtToken}` }
        });
      alert('Settings updated successfully!');
      fetchUserProfile();
      console.log(response)
    } catch (error) {
      console.error('Failed to update settings in submitForm:', error);
      alert('Failed to update settings.');
    }
  };
  
  onMounted(() => {
    fetchUserProfile()
  })
  </script>
  
  <style scoped>

  header {
    background-color: var(--medblue2);
    width: 100%;
    height: var(--fixedheight);
    color: var(--ltyellow);
    box-sizing: border-box;
  }
  ul {
    padding: 0px;
    margin: 0;
    list-style: none;
    display: flex;
    align-items: center;
  }

  .logo {
    vertical-align: middle;
    width: 50px;
    margin-right: 20px;
  }
  .toggle-container {
    display: flex;
    align-items: center; /* Aligns label and switch vertically */
  }

  .toggle-label {
    margin-right: 25px; /* Adds space between the label and the switch */
    font-weight: bold;
  }

  .checkbox-container {
    display: block;
    margin-bottom: 5px;
    margin-left: 25px;
  }
  .container {
      display: flex;
      flex-direction: row;
      min-height: calc(100vh - var(--fixedheight) - 24px); /* 100% of viewport height */
  }

  .left-side {
    flex: 0 0 20%; /* 35% width */
    display: flex;
    flex-direction: column;
    background-color: var(--ltyellow); /* Just for visualization */
    padding: 10px;
  }

  .right-side2 {
    flex: 1; /* Takes remaining space */
    background-color: var(--ltblue2); /* Just for visualization */
    padding: 10px 20px; /* Optional: Add some padding */
    line-height: 1.2;
      
  }
  .vertical-line {
    width: 6px;
    background-color: var(--dkblue); /* Color of the line */
  }
  .centered-image {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: flex-start; /* Center vertically */
  }

  form {
    padding: 5px 20px;
    width: 90%; /* Fixed width */
  }

  .form-group {
    display: flex;
    align-items: center; /* Center aligns items vertically */
    margin-bottom: 30px; /* Space between form fields */
  }

  .label {
    margin-right: 10px; /* Space between label and input */
    color: var(--dkblue);
    white-space: nowrap; /* Prevents label from wrapping */
  }

  .fixed-label {
    width: 100px;
    font-size: 1.0rem;
    font-weight: bold;
    text-align: left;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
      flex-grow: 1;
      padding: 4px;
      border: none; /* Removes all borders */
      border-bottom: 2px solid var(--dkblue); /* Only bottom border */
      background-color: transparent; /* Ensures no background color */
      outline: none; /* Removes the outline on focus */
      color: var(--dkblue);
      font-size: 1.0rem; /* Adjusts font size of input text */
  }

  /* Styling placeholders */
  input[type="text"]::placeholder,
  input[type="email"]::placeholder,
  input[type="password"]::placeholder {
      color: var(--medblue); /* Light grey color for placeholder */
      font-size: 1.0rem; /* Adjusts font size of placeholder */
      font-style: italic;

  }

  button {
      display: block;
      width: 80%; 
      padding: 5px;
      background-color: var(--dkgreen); /* Blue background */
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      border: var(--dkblue);
      border-radius: 15px;
      cursor: pointer; /* Pointer cursor on hover */
      margin: 0 auto; /* Center horizontally */

  }

  button:hover {
      background-color: var(--dkblue); /* Darker blue on hover */
  }
  textarea {
    width: 100%;
    margin-top: 20px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    margin: 0;
  }
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px; /* Fully rounded edges */
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%; /* Circle shape */
  }
  input:checked + .slider {
    background-color: var(--medblue);
  }
  input:focus + .slider {
    box-shadow: 0 0 1px var(--medblue)3;
  }
  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .country-selector {
    display: flex;
    align-items: center;
  }

  .country-dropdown {
    flex-grow: 1;
    background-color: var(--ltyellow);
    border: none;
    outline: none; /* Removes focus outline */
    border-bottom: 2px solid var(--dkblue); /* Only bottom border */
    font-size: 1.0rem;
  }

  
  </style>
