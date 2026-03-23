function showMsg(text, ok = true) {
    const box = document.getElementById("msg");
    if (!box) return;

    box.className = "msg " + (ok ? "ok" : "err");
    box.style.display = "block";
    box.innerText = text;
}


// =====================
// LOGIN
// =====================
async function login(e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if (!email || !pass) {
        showMsg("Enter email and password", false);
        return;
    }

    try {

        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: pass
            })
        });

        const data = await res.json();

        if (data.success) {

            localStorage.setItem("isLoggedIn", "1");
            localStorage.setItem("userEmail", email);

            showMsg("Login successful", true);

            setTimeout(() => {
                location.href = "../hub/skillselection.html";
            }, 500);

        } else {

            showMsg(data.message || "Invalid login", false);

        }

    } catch (err) {

        console.log(err);
        showMsg("Server not running", false);

    }
}


// =====================
// SIGNUP
// =====================
async function signup(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value;
    const confirm = document.getElementById("confirm").value;

    if (name.length < 2) {
        showMsg("Name too short", false);
        return;
    }

    if (pass.length < 6) {
        showMsg("Password must be 6+ chars", false);
        return;
    }

    if (pass !== confirm) {
        showMsg("Passwords do not match", false);
        return;
    }

    try {

        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: pass
            })
        });

        const data = await res.json();

        if (data.success) {

            showMsg("Signup successful", true);

            localStorage.setItem("isLoggedIn", "1");
            localStorage.setItem("playerName", name);
            localStorage.setItem("userEmail", email);

            setTimeout(() => {
                location.href = "../hub/avatar-selection.html";
            }, 600);

        } else {

            showMsg(data.message, false);

        }

    } catch (err) {

        console.log(err);
        showMsg("Server not running", false);

    }
}
// =====================
// GUEST
// =====================

function startGuestSession(path) {

    localStorage.setItem("isLoggedIn", "guest");
    localStorage.setItem("playerName", "Guest Adventurer");

    showMsg("Starting guest session...", true);

    setTimeout(() => {
        location.href = path;
    }, 500);
}


// =====================
// AUTH CHECK
// =====================

function checkAuth(loginPath = "../auth/login.html") {

    const status = localStorage.getItem("isLoggedIn");

    if (status !== "1" && status !== "guest") {
        location.href = loginPath;
    }
}


// =====================
// LOGOUT
// =====================

function logout(loginPath = "../auth/login.html") {

    localStorage.removeItem("isLoggedIn");

    location.href = loginPath;
}


// =====================
// CLEAR FORM
// =====================

function clearForm() {

    const ids = ["name", "email", "pass", "confirm"];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    const msg = document.getElementById("msg");
    if (msg) msg.style.display = "none";
}


// =====================
// FORGOT PASSWORD
// =====================

function forgotPassword() {

    const email = prompt("Enter your email:");

    if (!email) return;

    if (email.includes("@")) {
        alert("Reset link sent to " + email);
    } else {
        alert("Invalid email");
    }
}
