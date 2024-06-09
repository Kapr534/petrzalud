document.getElementById("showRegister").addEventListener("click", function() {
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
});

document.getElementById("showLogin").addEventListener("click", function() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
});

document.getElementById("registerButton").addEventListener("click", function() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    
    if (username && password) {
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = `kaprify.html?username=${username}`;
            } else {
                document.getElementById("registerOutput").innerText = data.message;
            }
        });
    } else {
        document.getElementById("registerOutput").innerText = "Vyplňte prosím všechna pole.";
    }
});

document.getElementById("loginButton").addEventListener("click", function() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    if (username && password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = `kaprify.html?username=${username}`;
            } else {
                document.getElementById("loginOutput").innerText = data.message;
            }
        });
    } else {
        document.getElementById("loginOutput").innerText = "Vyplňte prosím všechna pole.";
    }
});
