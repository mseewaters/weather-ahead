<template>
    <div>
        <h3>Log in to customize notifications</h3>
        <form @submit.prevent="signIn">
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
        <div> 
            <br>
            <p><router-link to="/register" style="color:var(--dkgreen); font-weight: bold;">Sign up</router-link> to create an account</p>
            <p><router-link to="/verify" style="color:var(--dkgreen); font-weight: bold;">Verify</router-link> an account with email code</p>
            <p><router-link to="/forgot" style="color:var(--dkgreen); font-weight: bold;">Forgot password? </router-link></p>
        </div>
        <br>
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
      alert("Sign in successful!");
      sessionStorage.setItem('token', result.getIdToken().getJwtToken());
      sessionStorage.setItem('username', toUsername(email.value));
      sessionStorage.setItem('token_expiration', result.getIdToken().getExpiration() * 1000);
      console.log('user name is ' + cognitoUser.getUsername());
      router.push('/profile');
    },
    onFailure: (err) => {
      console.error('Error:', err.message || JSON.stringify(err));
      alert("Failed to sign in: " + err.message);
    }
  });
};
</script>

<style scoped>

</style>