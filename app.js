// =========================
// SCREEN NAVIGATION
// =========================

function showProfile() {

    const hero = document.querySelector(".hero");
    const preview = document.querySelector(".preview");
    const verification = document.getElementById("verification-section");

    // Hide the homepage
    hero.style.display = "none";
    preview.style.display = "none";

    // Show verification screen
    verification.classList.add("active");

    // Move to verification screen
    verification.scrollIntoView({
        behavior: "smooth"
    });
}


// =========================
// STUDENT EMAIL VERIFICATION
// =========================

const emailForm = document.getElementById("email-form");

if (emailForm) {

    emailForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document
            .getElementById("student-email")
            .value
            .trim()
            .toLowerCase();

        try {

            const response = await fetch(
                "http://localhost:3000/send-code",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            // Show the code section
            const codeSection =
                document.getElementById("code-section");

            codeSection.classList.add("active");

            alert(
                "A verification code has been sent to your UTA email."
            );

        } catch (error) {

            console.error(error);

            alert(
                "We couldn't connect to the Commute server."
            );
        }

    });
}


// =========================
// VERIFY CODE
// =========================

async function verifyCode() {

    const email = document
        .getElementById("student-email")
        .value
        .trim()
        .toLowerCase();

    const code = document
        .getElementById("verification-code")
        .value
        .trim();

    if (code.length !== 6) {

        alert("Please enter the 6-digit verification code.");

        return;
    }

    console.log("Checking verification code...");

    // We will connect this to the backend
    // in the next step.
}