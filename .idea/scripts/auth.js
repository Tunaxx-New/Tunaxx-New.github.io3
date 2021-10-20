var registerButton = document.getElementById("register");

registerButton.addEventListener("click", event => {
    var loginInput = document.getElementById("regLogin");
    var PasswordInput = document.getElementById("regPassword");
    var GroupInput = document.getElementById("regGroup");

    addUser(loginInput, PasswordInput, GroupInput);
});
