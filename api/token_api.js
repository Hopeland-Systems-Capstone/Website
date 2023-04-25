const crypto = require('crypto');

async function generateToken() {
    const token = new Uint8Array(32);
    crypto.getRandomValues(token);
    return Array.from(token, b => b.toString(16).padStart(2, '0')).join('');
}

async function storeToken(user_id, token) {
    try {
        const response = await fetch(`http://localhost:3000/users/${user_id}/token/${token}?key=9178ea6e1bfb55f9a26edbb1f292e82d`, {
            method: 'PUT'
        });
        return await response.json();
    } catch (error) {
        return false;
    }
}

module.exports = {
    generateToken,
    storeToken,
}