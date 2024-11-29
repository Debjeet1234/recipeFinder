// Toggle Sign In and Sign Up
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Sign Up Logic
document.querySelector(".sign-up form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.querySelector(".sign-up input[placeholder='Name']").value.trim();
  const email = document.querySelector(".sign-up input[placeholder='Email']").value.trim();
  const password = document.querySelector(".sign-up input[placeholder='Password']").value.trim();

  if (!name || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  if (localStorage.getItem(email)) {
    alert("An account with this email already exists.");
    return;
  }

  const user = { name, email, password };
  localStorage.setItem(email, JSON.stringify(user));
  alert("Registration successful! Please sign in.");
  container.classList.remove("active"); // Switch to sign-in view
});

// Sign In Logic
document.querySelector(".sign-in form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.querySelector(".sign-in input[placeholder='Email']").value.trim();
  const password = document.querySelector(".sign-in input[placeholder='Password']").value.trim();

  if (!email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  const storedUser = localStorage.getItem(email);

  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user.password === password) {
      alert(`Welcome back, ${user.name}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Set current user
      window.location.href = "home.html"; // Redirect to home
    } else {
      alert("Invalid password.");
    }
  } else {
    alert("No account found with this email. Please register.");
  }
});

// Function to check if user is logged in
function checkAuthentication() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("You need to log in to access this page.");
    window.location.href = "login.html"; // Redirect to login page
  }
}

// Ensure all navigation clicks check authentication
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navigation a");

  navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      if (!loggedInUser) {
        event.preventDefault(); // Prevent navigation
        alert("You must log in to access this page.");
        window.location.href = "login.html"; // Redirect to login
      }
    });
  });

  // Enforce authentication for the current page
  if (!window.location.pathname.endsWith("login.html")) {
    checkAuthentication();
  }
});
