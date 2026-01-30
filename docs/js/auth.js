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
    setTimeout(() => location.href = "skillselection.html", 700);
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
        location.href = "avatar-selection.html";
    }, 900);
}

function checkAuth() {
    if (localStorage.getItem("isLoggedIn") !== "1") {
        location.href = "login.html";
    }
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

function logout() {
    localStorage.removeItem("isLoggedIn");
    location.href = "login.html";
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
