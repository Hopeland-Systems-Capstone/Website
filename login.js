document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Replace these values with the correct username and password
    const correctUsername = "admin";
    const correctPassword = "password";

    if (username === correctUsername && password === correctPassword) {
        window.location.href = "main.html";
    } else {
        alert("Incorrect username or password!");
    }
});
