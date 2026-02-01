// if (localStorage.getItem("isLoggedIn") === "1") {
//     location.href = "skillselection.html";
// }

function showMsg(text, ok = true) {
    const box = document.getElementById("msg");
    box.className = "msg " + (ok ? "ok" : "err");
    box.style.display = "block";
    box.innerText = text;

}

function fillDemo() {
    const saved = localStorage.getItem("questedUser");
    if (!saved) {
        showMsg("❌ No saved account found. Please Sign Up first.", false);
        return;
    }
    const user = JSON.parse(saved);
    const emailInput = document.getElementById("email");
    if (emailInput) emailInput.value = user.email || "";

    const passInput = document.getElementById("pass");
    if (passInput) passInput.value = "******";

    showMsg("✅ Loaded saved account email. Type your password.", true);
}

// Auth Redirects tailored for "docs/auth" -> "docs/hub" structure

function login(e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("pass");

    if (!emailInput || !passInput) return;

    const email = emailInput.value.trim().toLowerCase();
    const pass = passInput.value.trim();

    const saved = localStorage.getItem("questedUser");
    if (!saved) {
        showMsg("❌ No account exists. Please Sign Up first.", false);
        return;
    }

    const user = JSON.parse(saved);

    // NOTE: In localStorage auth, we are not storing real password in secure way.
    if (email !== (user.email || "").toLowerCase()) {
        showMsg("❌ Email not found. Try again.", false);
        return;
    }

    if (pass.length < 3) {
        showMsg("❌ Enter a valid password.", false);
        return;
    }

    // Login 
    localStorage.setItem("isLoggedIn", "1");
    // Ensure we keep the player name consistent
    localStorage.setItem("playerName", user.name || "Adventurer");

    // Handle Remember Me
    const rememberCheckbox = document.getElementById("remember");
    if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem("rememberedEmail", email);
    } else {
        localStorage.removeItem("rememberedEmail");
    }

    showMsg("✅ Logged in! Loading skill selection...", true);
    // Redirect to Hub
    setTimeout(() => location.href = "../hub/skillselection.html", 700);
}

function clearForm() {
    const ids = ["name", "email", "pass", "confirm"];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
    const msg = document.getElementById("msg");
    if (msg) msg.style.display = "none";
}

function signup(e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("pass");
    const confirmInput = document.getElementById("confirm");

    if (!nameInput || !emailInput || !passInput || !confirmInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const pass = passInput.value;
    const confirm = confirmInput.value;

    if (name.length < 2) {
        showMsg("❌ Name too short.", false);
        return;
    }

    if (pass.length < 6) {
        showMsg("❌ Password must be at least 6 characters.", false);
        return;
    }

    if (pass !== confirm) {
        showMsg("❌ Passwords do not match.", false);
        return;
    }

    const user = { name, email };
    localStorage.setItem("questedUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "1");
    localStorage.setItem("playerName", name);

    showMsg("✅ Account created! Heading to Character Creation...", true);

    setTimeout(() => {
        // Redirect to Hub -> Avatar
        location.href = "../hub/avatar-selection.html";
    }, 900);
}

function checkAuth(loginPath = "login.html") {
    const status = localStorage.getItem("isLoggedIn");
    if (status !== "1" && status !== "guest") {
        location.href = loginPath;
    }
}

function isGuest() {
    return localStorage.getItem("isLoggedIn") === "guest";
}

function startGuestSession(redirectPath) {
    localStorage.setItem("isLoggedIn", "guest");
    localStorage.setItem("playerName", "Guest Adventurer");
    // Optional: Clear previous progress to ensure a fresh trial?
    // localStorage.clear(); // No, might wipe other stuff. keeping as is.

    showMsg("✨ Starting Guest Session...", true);
    setTimeout(() => {
        location.href = redirectPath;
    }, 500);
}

function forgotPassword() {
    const email = prompt("Enter your email address to reset password:");
    if (email) {
        if (email.includes("@")) {
            alert(`🦄 A magic scroll with password reset instructions has been sent to ${email}!`);
        } else {
            alert("❌ That doesn't look like a valid email address.");
        }
    }
}

function logout(loginPath = "login.html") {
    localStorage.removeItem("isLoggedIn");
    location.href = loginPath;
}

// Auto-fill remembered email on load
(function () {
    const emailInput = document.getElementById("email");
    const rememberCheckbox = document.getElementById("remember");
    if (emailInput && rememberCheckbox) {
        const remembered = localStorage.getItem("rememberedEmail");
        if (remembered) {
            emailInput.value = remembered;
            rememberCheckbox.checked = true;
        }
    }
})();
