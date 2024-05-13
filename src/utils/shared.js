// src/utils/sharedFunctions.js

export function formatDateTime(date) {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Create username from email for consistency
export function toUsername(email) {
    return email.replace('@', '-at-');
}