// ================= Navbar Active =================

const navAnchors = document.querySelectorAll(".navbar-nav .nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        if (window.scrollY >= section.offsetTop - 100) {
            current = section.id;
        }

    });

    navAnchors.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ================= Contact Form =================

const form = document.getElementById("contactForm");
const submitBtn = form.querySelector("button");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    formMessage.className = "d-none";

    try {

        const response = await fetch("/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: form.name.value,
                email: form.email.value,
                message: form.message.value

            })

        });

        const result = await response.json();

        if (result.success) {

            formMessage.className = "alert alert-success mt-3";
            formMessage.innerHTML = "Message sent successfully.";

            form.reset();

        } else {

            formMessage.className = "alert alert-danger mt-3";
            formMessage.innerHTML = result.message;

        }

    } catch (err) {

        formMessage.className = "alert alert-danger mt-3";
        formMessage.innerHTML = err.message;

    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = "Send Message";

});
