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

        const res = await fetch(
            "https://quested-backend-production.up.railway.app/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: pass
                })
            }
        );

        const data = await res.json();

        if (data.success) {

            localStorage.setItem("isLoggedIn", "1");
            localStorage.setItem("userEmail", email);

            showMsg("Login successful", true);

            setTimeout(() => {
                location.href = "../hub/skillselection.html";
            }, 500);

        } else {

            showMsg("Invalid login", false);

        }

    } catch (err) {

        console.log(err);
        showMsg("Server not reachable", false);

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

    if (pass !== confirm) {
        showMsg("Passwords do not match", false);
        return;
    }

    try {

        const res = await fetch(
            "https://quested-backend-production.up.railway.app/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: pass
                })
            }
        );

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

            showMsg("Signup failed", false);

        }

    } catch (err) {

        console.log(err);
        showMsg("Server error", false);

    }
}


// =====================
// GUEST
// =====================

function startGuestSession(path) {

    localStorage.setItem("isLoggedIn", "guest");
    localStorage.setItem("playerName", "Guest Adventurer");

    location.href = path;
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
