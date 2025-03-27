document.addEventListener("DOMContentLoaded", function () {
    const photoUpload = document.getElementById("photo-upload");
    const profileImg = document.getElementById("profile-img");

    // تحميل بيانات الجليسة من Local Storage
    let babysitter = JSON.parse(localStorage.getItem("currentBabysitter")) || {
        familyName: "Doe",
        firstName: "Jane",
        email: "janedoe@example.com",
        phone: "+123456789",
        price: "2000",
        bio: "",
        photo: "assets/images/default-avatar.png"
    };

    // عرض البيانات
    document.getElementById("family-name").textContent = babysitter.familyName;
    document.getElementById("first-name").textContent = babysitter.firstName;
    document.getElementById("email").textContent = babysitter.email;
    document.getElementById("phone").textContent = babysitter.phone;
    document.getElementById("price").textContent = babysitter.price;
    document.getElementById("bio").value = babysitter.bio || "";
    profileImg.src = babysitter.photo;

    // عند اختيار صورة جديدة
    photoUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result;
                babysitter.photo = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // حفظ التعديلات
    document.querySelector(".save-btn").addEventListener("click", function () {
        babysitter.bio = document.getElementById("bio").value;

        localStorage.setItem("currentBabysitter", JSON.stringify(babysitter));

        alert("Profile updated successfully!");
        window.location.href = "profile.html";
    });
});

function changePhoto() {
    document.getElementById("photo-upload").click();
}
