// ===============================
// Active Navbar on Scroll
// ===============================

const navAnchors = document.querySelectorAll(".navbar-nav .nav-link");
const sections = document.querySelectorAll("section[id], main[id]");

window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;

        if (window.pageYOffset >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navAnchors.forEach((anchor) => {
        anchor.classList.remove("active");

        if (anchor.getAttribute("href") === "#" + currentSectionId) {
            anchor.classList.add("active");
        }
    });
});

// ===============================
// Contact Form
// ===============================

const form = document.getElementById("contactForm");

if (form) {

    const submitBtn = form.querySelector("button[type='submit']");
    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        formMessage.classList.add("d-none");
//------------
        try {

    const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    // Read the raw response
    const responseText = await response.text();

    console.log("Server Response:");
    console.log(responseText);

    // Show the response on the page
    formMessage.className = "alert alert-info mt-3";
    formMessage.innerHTML =
        "<strong>Server Response:</strong><br><pre style='white-space:pre-wrap'>" +
        responseText +
        "</pre>";

    return;

} catch (error) {

    console.error(error);

    formMessage.className = "alert alert-danger mt-3";
    formMessage.innerHTML =
        "<strong>Error!</strong> " + error.message;

}

        //--------------------
    });

}
