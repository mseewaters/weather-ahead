<template> 
    <div class="right-side2">
        <h3>Forgot your password?</h3>
        <h5>Consider using a password service like <a href="https://www.dashlane.com" target="_blank">Dashlane</a> or <a href="https://1password.com" target="_blank">1Password</a></h5>
        <br>
        <div>
            <form @submit.prevent="sendCode">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <button type="submit">Send reset code</button>
            </form>
        </div>
        <div v-if="codeSent">
            <form @submit.prevent="resetPassword">
                <div class="form-group">
                    <label for="code">Verification Code:</label>
                    <input type="text" id="code" v-model="code" required>
                </div>
                <div class="form-group">
                    <label for="newPassword">New Password:</label>
                    <input type="password" id="newPassword" v-model="newPassword" required>
                </div>
                <button type="submit">Reset Password</button>
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

const email = ref('');
const code = ref('');
const newPassword = ref('');
const codeSent = ref(false);

const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.userPoolId,
    ClientId: cognitoConfig.clientId
});


const sendCode = async () => {

    const userData = {
        Username: toUsername(email.value),
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
    console.log(cognitoUser)
    cognitoUser.forgotPassword({
        onSuccess: function (result) {
          console.log('Code sent successfully', result);
          codeSent.value = true;
        },
        onFailure: function(err) {
          alert(err.message || JSON.stringify(err));
        },
        inputVerificationCode(data) {
          console.log('Code delivery details:', data);
          codeSent.value = true;
        }
      });
};

const resetPassword = () => {
 
    const userData = {
        Username: toUsername(email.value),
        Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);
   cognitoUser.confirmPassword(code.value, newPassword.value, {
    onSuccess() {
        console.log('Password changed successfully');
        alert('Password has been changed successfully!');
        router.push('/'); // Redirect to verification page
    },
    onFailure(err) {
        alert(err.message || JSON.stringify(err));
    }
    });
};

</script>

<style scoped>


</style>