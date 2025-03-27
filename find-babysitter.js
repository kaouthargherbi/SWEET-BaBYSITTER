document.addEventListener("DOMContentLoaded", function () {
    const babysitters = JSON.parse(localStorage.getItem("babysitters")) || [];

    const listContainer = document.getElementById("babysitter-list");
    listContainer.innerHTML = ""; // مسح القائمة قبل إعادة الإضافة

    babysitters.forEach((babysitter, index) => {
        const div = document.createElement("div");
        div.classList.add("babysitter-card");
        div.innerHTML = `
            <img src="${babysitter.photo || 'assets/images/default-avatar.png'}" alt="Photo of ${babysitter.firstName}">
            <h3>${babysitter.firstName} ${babysitter.familyName}</h3>
            <p><strong>Experience:</strong> ${babysitter.experience} years</p>
            <p><strong>Rate:</strong> $${babysitter.price}/hour</p>
            <p><strong>Bio:</strong> ${babysitter.bio || "No bio available."}</p>
            <button onclick="viewProfile(${index})">View Profile</button>
            <button onclick="bookNow(${index})">Book Now</button>`;
        listContainer.appendChild(div);
    });
});

function viewProfile(index) {
    localStorage.setItem("currentBabysitterIndex", index);
    window.location.href = "profile.html";
}

function bookNow(index) {
    window.location.href = `booking.html?id=${index}`;
}
