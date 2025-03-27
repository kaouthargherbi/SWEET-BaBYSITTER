document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const babysitterId = params.get("id");

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push({ babysitterId, date, time });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking confirmed!");
    window.location.href = "index.html";
});
