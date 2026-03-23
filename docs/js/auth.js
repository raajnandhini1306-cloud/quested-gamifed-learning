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

function login(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if (!email || !pass) {
        showMsg("Enter email and password", false);
        return;
    }

    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("playerName", "Adventurer");
    localStorage.setItem("userEmail", email);

    showMsg("Logged in! Loading skill selection...", true);

    setTimeout(() => {
        location.href = "../hub/skillselection.html";
    }, 500);
}


// =====================
// SIGNUP
// =====================
function signup(e) {
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

    const user = {
        name: name,
        email: email
    };

    localStorage.setItem("questedUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("playerName", name);

    showMsg("Account created! Choose your avatar...", true);

    setTimeout(() => {
        location.href = "../hub/avatar-selection.html";
    }, 600);
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
