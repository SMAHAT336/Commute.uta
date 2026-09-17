const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary storage for verification codes
const verificationCodes = {};

// Test route
app.get("/", (req, res) => {
    res.send("Commute server is running!");
});


// =========================
// SEND VERIFICATION CODE
// =========================

app.post("/send-code", (req, res) => {

    const { email } = req.body;

    // Make sure an email was provided
    if (!email) {
        return res.status(400).json({
            message: "Please enter your student email."
        });
    }

    // Only allow UTA student emails
    if (!email.toLowerCase().endsWith("@mavs.uta.edu")) {
        return res.status(400).json({
            message: "Please use a valid UTA student email."
        });
    }

    // Generate a random 6-digit code
    const code = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    // Save the code temporarily
    verificationCodes[email.toLowerCase()] = code;

    console.log("Verification code generated:", code);

    res.json({
        message: "Verification code created."
    });
});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
    console.log(
        `Commute server running at http://localhost:${PORT}`
    );
});