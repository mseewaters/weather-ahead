<template> 
    <div class="right-side2">
        <h3>Verify your email</h3>
        <h5>After registering, please check your email inbox or spam folder for your verification code. </h5>
        <form @submit.prevent="verifyEmail">
            <div class="form-group">
                <label for="emailverify">Email:</label>
                <input v-model="emailVerify" type="email" placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="codeInputVerify">Verification Code:</label>
                <input v-model="codeInputVerify" type="text" placeholder="Verification Code" pattern=".*" required>
            </div>
            <br>
            <button type="submit">Verify</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import cognitoConfig from '@/cognito-config.js';
import { toUsername } from '@/utils/shared.js';

const router = useRouter();

const codeInputVerify = ref('');
const emailVerify = ref('');

const verifyEmail = async () => {

    const userPool = new CognitoUserPool({
        UserPoolId: cognitoConfig.userPoolId,
        ClientId: cognitoConfig.clientId
        });

    const userData = {
        Username: toUsername(emailVerify.value),
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(codeInputVerify.value, true, (err, result) => {
        if (err) {
        console.error(err.message || JSON.stringify(err));
        alert("Failed to verify code: " + err.message);
        return;
        }
        console.log('Call result: ' + result);
        alert("Email verified successfully!");
        router.push('/'); // Redirect to verification page
    });
};
</script>

<style scoped>


</style>