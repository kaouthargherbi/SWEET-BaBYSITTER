document.getElementById('user-type').addEventListener('change', function () {
    let extraFields = document.getElementById('extra-fields');
    extraFields.style.display = this.value === 'babysitter' ? 'block' : 'none';
});

document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let userType = document.getElementById('user-type').value;

    let userData = { name, email, userType };

    if (userType === "babysitter") {
        userData.phone = document.getElementById('phone').value;
        userData.experience = document.getElementById('experience').value;
        userData.rate = document.getElementById('rate').value;

        let babysitters = JSON.parse(localStorage.getItem("babysitters")) || [];
        babysitters.push(userData);
        localStorage.setItem("babysitters", JSON.stringify(babysitters));
    }

    alert("Signup successful!");
    window.location.href = userType === "parent" ? "find-babysitter.html" : "profile.html";
});
