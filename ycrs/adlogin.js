document.getElementById("adminLoginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let username = document.getElementById("adminUsername").value;
  let password = document.getElementById("adminPassword").value;

  // Dummy Admin Credentials (You can replace this with a backend check)
  const adminUser = "admin";
  const adminPass = "password123";

  if (username === adminUser && password === adminPass) {
      alert("Login Successful!");
      window.location.href = "dashboard.html"; // Redirect to Admin Dashboard
  } else {
      alert("Invalid username or password!");
  }
});
