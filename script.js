<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
    const navAnchors = document.querySelectorAll(".navbar-nav .nav-link");
    const sections = document.querySelectorAll("section[id], main[id]");

    window.addEventListener("scroll", function () {
      let currentSectionId = "";

      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
          currentSectionId = section.getAttribute("id");
        }
      });

      navAnchors.forEach(function (anchor) {
        anchor.classList.remove("active");
        if (anchor.getAttribute("href") === "#" + currentSectionId) {
          anchor.classList.add("active");
        }
      });
    });

    // ---
      const form = document.getElementById("contactForm");
const submitBtn = form.querySelector("button[type='submit']");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    formMessage.classList.add("d-none");

    try {

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {

            formMessage.className = "alert alert-success mt-3";
            formMessage.innerHTML =
                "<strong>Success!</strong> Your message has been sent successfully.";

            form.reset();

        } else {

            formMessage.className = "alert alert-danger mt-3";
            formMessage.innerHTML =
                "<strong>Error!</strong> " + result.message;
        }

    } catch (error) {

        formMessage.className = "alert alert-danger mt-3";
        formMessage.innerHTML =
            "<strong>Error!</strong> Something went wrong. Please try again.";

    } finally {

        formMessage.classList.remove("d-none");

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});
