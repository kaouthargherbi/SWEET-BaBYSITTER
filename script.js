document.addEventListener("DOMContentLoaded", function () {
    setupLanguageSwitching();
    setupFormSteps();
    loadBabysitterProfiles();
});

// Multi-language translations
const translations = {
    en: {
        home: "Home",
        login: "Login",
        signup: "Sign Up",
        contact: "Contact Us",
        about: "About Us",
        findBabysitter: "Find a Babysitter",
        signUpHeader: "Sign Up",
        fullName: "Full Name",
        email: "Email",
        password: "Password",
        next: "Next",
        back: "Back",
        phone: "Phone Number",
        experience: "Experience (years)",
        rate: "Rate (per hour)",
        rating: "Rating",
        resume: "Upload Resume (Optional)",
        searchPlaceholder: "Search for a babysitter...",
    },
    ar: {
        home: "الرئيسية",
        login: "تسجيل الدخول",
        signup: "إنشاء حساب",
        contact: "اتصل بنا",
        about: "معلومات عنا",
        findBabysitter: "ابحث عن جليسة أطفال",
        signUpHeader: "إنشاء حساب",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        next: "التالي",
        back: "رجوع",
        phone: "رقم الهاتف",
        experience: "الخبرة (بالسنوات)",
        rate: "السعر (للساعة)",
        rating: "التقييم",
        resume: "تحميل السيرة الذاتية (اختياري)",
        searchPlaceholder: "ابحث عن جليسة أطفال...",
    },
};

// Language switching logic
function setupLanguageSwitching() {
    const languageSelect = document.getElementById("language-select");
    if (!languageSelect) return;

    languageSelect.addEventListener("change", function () {
        changeLanguage(this.value);
    });

    function changeLanguage(lang) {
        document.querySelectorAll(".translatable").forEach(element => {
            const key = element.getAttribute("data-key");
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Change placeholders
        let searchBox = document.getElementById("search-box");
        if (searchBox) {
            searchBox.placeholder = translations[lang].searchPlaceholder;
        }

        // Adjust text direction
        document.body.style.direction = lang === "ar" ? "rtl" : "ltr";
    }
}

// Sign-up form step handling
function setupFormSteps() {
    const nextBtn = document.getElementById("next-step");
    const prevBtn = document.getElementById("prev-step");
    const form = document.getElementById("signup-form");
    if (!nextBtn || !form) return;

    nextBtn.addEventListener("click", function () {
        const userType = document.getElementById("user-type").value;
        if (userType === "babysitter") {
            document.getElementById("step-1").style.display = "none";
            document.getElementById("step-2").style.display = "block";
        } else {
            form.submit(); // Submit immediately if parent
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            document.getElementById("step-2").style.display = "none";
            document.getElementById("step-1").style.display = "block";
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const userType = document.getElementById("user-type").value;
        if (userType === "babysitter") {
            saveBabysitterData();
        }

        alert("Signup successful!");
        window.location.href = "find-babysitter.html";
    });
}

// Save babysitter data in localStorage
function saveBabysitterData() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const experience = document.getElementById("experience").value;
    const rate = document.getElementById("rate").value;

    const babysitterData = { name, email, phone, experience, rate };

    let babysitters = JSON.parse(localStorage.getItem("babysitters")) || [];
    babysitters.push(babysitterData);
    localStorage.setItem("babysitters", JSON.stringify(babysitters));
}

// Load babysitter profiles on "Find a Babysitter" page
function loadBabysitterProfiles() {
    const listContainer = document.querySelector(".babysitter-list");
    if (!listContainer) return;

    const babysitters = JSON.parse(localStorage.getItem("babysitters")) || [];

    listContainer.innerHTML = ""; // Clear before adding

    babysitters.forEach(babysitter => {
        const card = document.createElement("div");
        card.classList.add("babysitter-card");

        card.innerHTML = `
            <h3>${babysitter.name}</h3>
            <p><strong>Email:</strong> ${babysitter.email}</p>
            <p><strong>Phone:</strong> ${babysitter.phone}</p>
            <p><strong>Experience:</strong> ${babysitter.experience} years</p>
            <p><strong>Rate:</strong> $${babysitter.rate}/hour</p>
            <p class="rating">⭐⭐⭐⭐☆</p>
        `;
        listContainer.appendChild(card);
    });
}
