const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("user").value;

  const data = { user };

  fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        window.location.href = "/productos";
      }
    })
    .catch((err) => console.log(err));
});
