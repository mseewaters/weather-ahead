<template>
  <div class="main-container">
    <div class="left-side">
      <p>Personalized notifications </p>
      <p>that keep you informed </p>
      <p>of weather events</p>
      <p>that impact <u>you</u>.</p>
    </div>
    <div class="vertical-line"></div>
    <div class="right-side" >
        <div>
            <div class="top-section">
                <form @submit.prevent="signIn">
                    <h3>Log in to customize notifications</h3>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input v-model="email" type="email" placeholder="Enter your email" pattern=".*" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password: </label>
                        <input v-model="password" type="password" placeholder="Enter your password" pattern=".*" required>
                    </div>
                    <div>
                      <button type="submit" id="loginButton">Sign in</button>
                    </div>
                </form>
                <p>Don't have an account?   <router-link to="/register">Sign up</router-link></p>
                <p>Need to verify an account   <router-link to="/verify">Verify</router-link></p>
                <br>
            </div>
            <div class="bottom-section" style="text-align: center;">
                <img src="../assets/logo-final-inverted.png" alt="Logo" width=70% height=auto>
            </div>
        </div>
    </div>      
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import cognitoConfig from '@/cognito-config.js';
import { toUsername } from '@/utils/shared.js';

const router = useRouter();

const email = ref('');
const password = ref('');

// Function to handle user sign-in
const signIn = async () => {
  const authenticationData = {
    Username: toUsername(email.value),
    Password: password.value
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.userPoolId,
    ClientId: cognitoConfig.clientId
  });

  const userData = {
    Username: toUsername(email.value),
    Pool: userPool
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      alert("Sign in successful!");
      router.push('/profile');
      sessionStorage.setItem('token', result.getIdToken().getJwtToken());
    },
    onFailure: (err) => {
      console.error('Error:', err.message || JSON.stringify(err));
      alert("Failed to sign in: " + err.message);
    }
  });
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main-container {
    display: flex;
    flex-direction: row;
    min-height: 100vh; /* 100% of viewport height */
}
.left-side {
    flex: 1; /* Takes remaining space */
    background-color: var(--ltblue2); /* Just for visualization */
    padding: 0px 50px; /* Optional: Add some padding */
    text-align: center;
    line-height: 0.4;   
    font-size: 64px; 
    font-weight: 700; 
    font-style: italic;
}
.vertical-line {
    width: 6px;
    background-color: var(--medblue2); /* Color of the line */
}
.right-side {
    flex: 0 0 20%; /* 20% width */
    display: flex;
    background-color: var(--ltyellow); /* Just for visualization */
    padding: 0px 10px; /* Optional: Add some padding */
    
}

.top-section {
    flex: 0 0 25%; /* Takes up 25% of the vertical space */
    justify-content: flex-start;
}

.bottom-section {
    flex: 1; /* Takes the remaining 75% of the vertical space */
    justify-content:center;
    align-items: center;
}

form {
    padding: 5px 0px;
    width: 90%; /* Fixed width */
}

.form-group {
    margin-bottom: 30px; /* Space between form fields */
}

label {
    display: block; /* Ensures the label is on its own line */
    margin-bottom: 5px; /* Small space between label and input field */
    color: var(--dkblue);
    font-size: 0.8rem; /* Smaller font size for labels */
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%; /* Makes input fields take up the full container width */
    padding: 4px;
    border: none; /* Removes all borders */
    border-bottom: 2px solid var(--dkblue); /* Only bottom border */
    background-color: transparent; /* Ensures no background color */
    outline: none; /* Removes the outline on focus */
    color: var(--dkblue);
    font-size: 1.2rem; /* Adjusts font size of input text */
}

/* Styling placeholders */
input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder {
    color: var(--medblue); /* Light grey color for placeholder */
    font-size: 1.2rem; /* Adjusts font size of placeholder */
    font-style: italic;

}

button {
    display: block;
    width: 40%; 
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






</style>
