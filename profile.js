document.addEventListener("DOMContentLoaded", function () {
    const babysitters = JSON.parse(localStorage.getItem("babysitters")) || [];
    const index = localStorage.getItem("currentBabysitterIndex");

    if (babysitters[index]) {
        const sitter = babysitters[index];

        document.getElementById("sitter-photo").src = sitter.photo || "assets/images/default-avatar.png";
        document.getElementById("family-name").textContent = sitter.familyName;
        document.getElementById("first-name").textContent = sitter.firstName;
        document.getElementById("email").textContent = sitter.email;
        document.getElementById("phone").textContent = sitter.phone;
        document.getElementById("price").textContent = sitter.price;
        document.getElementById("bio").textContent = sitter.bio || "No bio available.";

        // السماح بتعديل الـ Bio
        document.getElementById("edit-bio-btn").addEventListener("click", function () {
            document.getElementById("bio").style.display = "none";
            document.getElementById("bio-edit").style.display = "block";
            document.getElementById("bio-edit").value = sitter.bio;
            document.getElementById("save-bio-btn").style.display = "block";
            this.style.display = "none";
        });

        document.getElementById("save-bio-btn").addEventListener("click", function () {
            const newBio = document.getElementById("bio-edit").value;
            sitter.bio = newBio;
            document.getElementById("bio").textContent = newBio;
            document.getElementById("bio").style.display = "block";
            document.getElementById("bio-edit").style.display = "none";
            document.getElementById("edit-bio-btn").style.display = "block";
            this.style.display = "none";

            // حفظ التعديل في localStorage
            babysitters[index] = sitter;
            localStorage.setItem("babysitters", JSON.stringify(babysitters));
        });

        // السماح بتعديل الصورة
        document.getElementById("change-photo-btn").addEventListener("click", function () {
            document.getElementById("photo-upload").click();
        });

        document.getElementById("photo-upload").addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    sitter.photo = e.target.result;
                    document.getElementById("sitter-photo").src = e.target.result;

                    // حفظ التعديل في localStorage
                    babysitters[index] = sitter;
                    localStorage.setItem("babysitters", JSON.stringify(babysitters));
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

function bookNow() {
    alert("Redirecting to booking page...");
    window.location.href = "booking.html";
}
