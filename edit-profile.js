document.addEventListener("DOMContentLoaded", function () {
    const photoUpload = document.getElementById("upload-photo");
    const profileImg = document.getElementById("profile-img");
    const bioField = document.getElementById("bio");
    const saveButton = document.getElementById("save-profile");

    // تحميل بيانات الجليسة من الخادم
    fetch("get_babysitter_profile.php") // ملف PHP سيجلب بيانات الجليسة
        .then(response => response.json())
        .then(data => {
            bioField.value = data.bio || "";
            profileImg.src = data.photo || "assets/images/default-avatar.png";
        })
        .catch(error => console.error("Error loading profile:", error));

    // عند اختيار صورة جديدة
    photoUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // عند الضغط على زر "Save"
    saveButton.addEventListener("click", function () {
        let bio = bioField.value;
        let photo = photoUpload.files[0];

        let formData = new FormData();
        formData.append("bio", bio);
        if (photo) {
            formData.append("photo", photo);
        }

        fetch("edit_profile.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert("Profile updated successfully!");
            window.location.href = "profile.html";
        })
        .catch(error => console.error("Error:", error));
    });
});
