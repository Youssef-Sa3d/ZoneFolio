const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true, // Enable logging
    debug: true, // Show debug output
});

async function sendVerificationEmail(to, code) {
    const mailOptions = {
        from: `"Zonefolio" <noreply@zonefolio.com>`, // Use a custom sender name
        to: to,
        subject: "Your Zonefolio Verification Code",
        html: `<p>Your verification code is <strong>${code}</strong></p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("Full email error:", error);
        throw new Error(`SMTP Error: ${error.response || error.message}`);
    }
}

// Test connection on startup
transporter.verify((error) => {
    if (error) {
        console.error("SMTP Connection Error:", error);
    } else {
        console.log("SMTP server is ready to send messages");
    }
});

module.exports = sendVerificationEmail;