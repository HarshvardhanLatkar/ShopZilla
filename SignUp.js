document.getElementById('signUp-form').addEventListener("submit", (event) => {
    
    event.preventDefault();

    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();

    if (email && password) {
        let data = JSON.parse(localStorage.getItem("Data")) || [];

        let formData = {
            email: email,
            password: password
        };

        data.push(formData);

        localStorage.setItem("Data", JSON.stringify(data));

        alert("Sign Up Successful!!");

        window.location.href = "./login.html";
    } else {
        alert("Invalid Data. Please check the Details");
    }
});
