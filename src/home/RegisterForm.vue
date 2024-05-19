<template> 
    <div>
        <h3>Sign up to create custom notifications</h3>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="name">Name:</label>
                <input v-model="nickname" type="text"  placeholder="Enter your name" pattern=".*" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input v-model="email" type="email" placeholder="Enter your email" pattern=".*" required>
            </div>
            <div class="form-group">
                <label for="password">Password: </label>
                <input v-model="password" :type="isPasswordVisible ? 'text' : 'password'" placeholder="Enter your password" pattern=".*" required>
                <p style="font-size: 0.8rem; color:var(--dkgreen);">Minimum 8 Characters: 1 number, 1 special character, 1 uppercase letter, 1 lowercase letter</p>
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirm Password:</label>
                <input v-model="confirmPassword" :type="isPasswordVisible ? 'text' : 'password'" placeholder="Confirm your password" pattern=".*" required>
            </div>
            <label for="show-password-checkbox">
                <input type="checkbox" id="show-password-checkbox" v-model="isPasswordVisible">
                Show Passwords
            </label>
            <br>
            <button type="submit">Register</button>
        </form>
        <br>
        <h5>After registering, please check your email inbox or spam folder for your verification code. </h5>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import cognitoConfig from '@/cognito-config.js';
import { toUsername } from '@/utils/shared.js';

const router = useRouter();
const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId,
  ClientId: cognitoConfig.clientId
});

const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const nickname = ref('');
const isPasswordVisible = ref(false);


const register = async () => {

    if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
    }    

    const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email.value }),
    new CognitoUserAttribute({ Name: 'nickname', Value: nickname.value })
    ];

    userPool.signUp(toUsername(email.value), password.value, attributeList, null, (err, result) => {
        if (err) {
        console.error(err.message || JSON.stringify(err));
        alert(err.message)
        return;
        }
        const cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        router.push('/verify'); // Redirect to verification page
    });
};
</script>

<style scoped>

</style>
