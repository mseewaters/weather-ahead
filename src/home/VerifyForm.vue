<template> 
    <div class="container">
        <div class="left-side">
            <div class="centered-image">
                <img src="../assets/logo-final-inverted.png" alt="Logo" width=70% height=auto>
            </div>
        </div>
        <div class="vertical-line"></div>
        <div class="right-side2">
            <h1>Verify your email</h1>
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
                <button type="submit">Verify email</button>
            </form>
        </div>
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
.container {
    display: flex;
    flex-direction: row;
    min-height: calc(100vh - var(--fixedheight) - 24px); /* 100% of viewport height */
}

.left-side {
    flex: 0 0 20%; /* 35% width */
    display: flex;
    background-color: var(--ltyellow); /* Just for visualization */
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
    padding: 5px 0px;
    width: 75%; /* Fixed width */
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