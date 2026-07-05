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

        try {

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            // Read response as text first
            const responseText = await response.text();

            console.log("Server Response:");
            console.log(responseText);

            let result;

            try {
                result = JSON.parse(responseText);
            } catch (err) {
                throw new Error(responseText);
            }

            if (response.ok && result.success) {

                formMessage.className = "alert alert-success mt-3";
                formMessage.innerHTML =
                    "<strong>Success!</strong> Your message has been sent successfully.";

                form.reset();

            } else {

                formMessage.className = "alert alert-danger mt-3";
                formMessage.innerHTML =
                    "<strong>Error!</strong> " +
                    (result.message || "Something went wrong.");

            }

        } catch (error) {

            console.error(error);

            formMessage.className = "alert alert-danger mt-3";
            formMessage.innerHTML =
                "<strong>Error!</strong><br><pre style='white-space:pre-wrap'>" +
                error.message +
                "</pre>";

        } finally {

            formMessage.classList.remove("d-none");

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

        }

    });

}
