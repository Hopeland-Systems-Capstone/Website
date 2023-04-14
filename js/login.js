document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user_id = await getUserIdByEmail(email);

    if (user_id === -1) {
        alert('Incorrect email or password!');
        return;
    }

    const hashed_password = await hashPassword(password);
    const isPasswordCorrect = await checkPassword(user_id, hashed_password);

    if (isPasswordCorrect) {
        login(user_id);
        window.location.href = "main.html";
    } else {
        alert("Incorrect email or password!");
        return;
    }
});
  
async function getUserIdByEmail(email) {
    const response = await fetch(`http://localhost:3000/users/email/${email}?key=9178ea6e1bfb55f9a26edbb1f292e82d`);
    return await response.json();
}

async function checkPassword(user_id, hashed_password) {
    const response = await fetch(`http://localhost:3000/users/${user_id}/password/${hashed_password}?key=9178ea6e1bfb55f9a26edbb1f292e82d`);
    const isPasswordCorrect = await response.json();
    return isPasswordCorrect;
}
  
async function hashPassword(password) {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}
  
function login(user_id) {
    localStorage.setItem('user_id', user_id);
}