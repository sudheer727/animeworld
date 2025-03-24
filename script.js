// Sample user data (stored in localStorage for simplicity)
let users = JSON.parse(localStorage.getItem("users")) || [];

// Create Account Logic
function createAccount() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const countryCode = document.getElementById("signupCountryCode").value;
    const phone = document.getElementById("signupPhone").value;
    const email = document.getElementById("signupEmail").value;

    // Validations
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Invalid Email Address!");
        return;
    }

    if (!/^[1-9][0-9]{9}$/.test(phone)) {
        alert("Phone number must start with 1-9 and be exactly 10 digits.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    const fullPhoneNumber = countryCode + phone;

    users.push({ username, password, phone: fullPhoneNumber, email });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Created Successfully!");
    window.location.href = "index.html";
}

// Login Logic
function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("Login Successful!");
        window.location.href = "main.html";
    } else {
        alert("Invalid Username or Password!");
    }
}

// Forgot Password Logic
function sendOTP() {
    const countryCode = document.getElementById("forgotCountryCode").value;
    const phone = document.getElementById("forgotPhone").value;
    const fullPhoneNumber = countryCode + phone;

    const user = users.find(u => u.phone === fullPhoneNumber);

    if (user) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        alert(`OTP Sent: ${otp}`);  // For demo purposes only
        const enteredOTP = prompt("Enter OTP:");

        if (parseInt(enteredOTP) === otp) {
            const newPassword = prompt("Enter New Password:");
            
            if (newPassword.length < 6) {
                alert("Password must be at least 6 characters.");
                return;
            }

            user.password = newPassword;
            localStorage.setItem("users", JSON.stringify(users));

            alert("Password Reset Successful!");
            window.location.href = "index.html";
        } else {
            alert("Incorrect OTP!");
        }
    } else {
        alert("Phone number not found!");
    }
}
