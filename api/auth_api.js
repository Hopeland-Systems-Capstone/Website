const crypto = require('crypto');

const cookie_api = require('./cookie_api');

async function checkLoggedIn(req, res) {

    const token = cookie_api.getCookie(req, 'token');
    if (token !== null && token != '') {

        const user_id = await getUserIdByToken(token);
        console.log("User connected with token " + token + " associated with user_id " + user_id);
        
        if (user_id === null || user_id == -1) {
            console.log("Token resulted in invalid user. Logging out.");
            cookie_api.setCookie(res, 'token', '', { maxAge: 0, path: '/' });
            if (!req.originalUrl.endsWith('index.html')) {
                throw new Error('/index.html');
            }
        }

        if (req.originalUrl.endsWith('index.html')) {
            throw new Error('/main.html');
        }

    } else if (!req.originalUrl.endsWith('index.html')) {
        console.log("Not logged in");
        throw new Error('/index.html');
    }
}

async function hashPassword(password) {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getUserIdByToken(token) {
    try {
        const response = await fetch(`http://localhost:3000/users/token/${token}?key=9178ea6e1bfb55f9a26edbb1f292e82d`);
        return await response.json();
    } catch (error) {
        return -1;
    }
}

async function getUserIdByEmail(email) {
    try {
        const response = await fetch(`http://localhost:3000/users/email/${email}?key=9178ea6e1bfb55f9a26edbb1f292e82d`);
        return await response.json();
    } catch (error) {
        return -1;
    }
}

async function checkPassword(user_id, hashed_password) {
    try {
        const response = await fetch(`http://localhost:3000/users/${user_id}/password/${hashed_password}?key=9178ea6e1bfb55f9a26edbb1f292e82d`);
        const isPasswordCorrect = await response.json();
        return isPasswordCorrect;
    } catch (error) {
        return false;
    }
}

module.exports = {
    hashPassword,
    checkLoggedIn,
    getUserIdByToken,
    getUserIdByEmail,
    checkPassword,
}