import { CognitoUserPool } from 'amazon-cognito-identity-js';
import cognitoConfig from '@/cognito-config.js';

const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.userPoolId,
    ClientId: cognitoConfig.clientId
  });

export function isTokenValid() {
    return new Promise((resolve) => {
    const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            console.error('Failed to get session:', err);
            resolve(false);
          } else {
            const isValid = session.isValid();
            if (!isValid) {
              // Attempt to refresh the token
              cognitoUser.refreshSession(session.getRefreshToken(), (refreshErr, newSession) => {
                if (refreshErr) {
                  console.error('Failed to refresh session:', refreshErr);
                  resolve(false);
                } else {
                  console.log('Session refreshed successfully.');
                  // Optionally update sessionStorage if you are keeping tokens there
                  sessionStorage.setItem('token', newSession.getIdToken().getJwtToken());
                  sessionStorage.setItem('token_expiration', newSession.getIdToken().getExpiration() * 1000);
                  resolve(true);
                }
              });
            } else {
              // Session is valid, optionally update sessionStorage
              sessionStorage.setItem('token', session.getIdToken().getJwtToken());
              sessionStorage.setItem('token_expiration', session.getIdToken().getExpiration() * 1000);
              resolve(true);
            }
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  export function signOut() {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
        cognitoUser.signOut();
    }
    // Clear session storage or any other local storage used
    sessionStorage.clear();
    // More clean-up if necessary
  }