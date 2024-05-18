import { ref } from 'vue';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import cognitoConfig from '@/cognito-config.js';

const isAuthenticated = ref(false);
const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.userPoolId,
    ClientId: cognitoConfig.clientId
  });

export function checkUserSession() {
    const cognitoUser = userPool.getCurrentUser();
    console.log(cognitoUser);
    if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
        if (err) {
            console.error(err);
            isAuthenticated.value = false;
            return;
        }
        isAuthenticated.value = session.isValid();
        });
    } else {
        isAuthenticated.value = false;
    }
}

export default isAuthenticated;