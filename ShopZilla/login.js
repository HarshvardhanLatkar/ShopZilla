document.getElementById('login-form').addEventListener('submit', (event) => {

    event.preventDefault();

    let loginemail = document.getElementById('email').value.trim();
    let loginpassword = document.getElementById('password').value.trim();
    let data = JSON.parse(localStorage.getItem("formData")) || [];

    let userExists = data.map((formData) => {
        return loginemail === formData.email && loginpassword === formData.password;
    });
    
    
    if (userExists) {
        window.location.href = "./Home.html";
    } else {
        alert("Invalid Data. Please check the Details");
    }
});
