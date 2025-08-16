const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendVerificationEmail(to, code) {
    try {
        const mailOptions = {
            from: `"ZoneFolio" <noreply@zonefolio.com>`, // Use your domain here
            to: to,
            subject: "Your ZoneFolio Verification Code",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Verify Your ZoneFolio Account</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; margin: 20px 0; padding: 15px; background: #f3f4f6; display: inline-block;">
            ${code}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280;">© ${new Date().getFullYear()} ZoneFolio. All rights reserved.</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${to}`);
        return true;
    } catch (error) {
        console.error("Email sending error:", error);
        throw new Error("Failed to send verification email");
    }
}

module.exports = sendVerificationEmail;