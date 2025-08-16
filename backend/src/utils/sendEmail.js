// utils/emailsender.js
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

async function sendVerificationEmail(to, code) {
    try {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            throw new Error(`Invalid email format: ${to}`);
        }

        // Configure API
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.BREVO_API_KEY;

        // Ensure API key exists
        if (!process.env.BREVO_API_KEY) {
            throw new Error('BREVO_API_KEY environment variable is missing');
        }

        // Create API instance
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        // Build email with proper structure
        const sendSmtpEmail = {
            sender: {
                email: process.env.SENDER_EMAIL,
                name: process.env.SENDER_NAME
            },
            to: [{
                email: to,
                name: to.split('@')[0] // Use email prefix as name
            }],
            subject: "Your ZoneFolio Verification Code",
            htmlContent: `
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
            headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
            }
        };

        console.log("Sending email with payload:", JSON.stringify(sendSmtpEmail, null, 2));

        // Send email
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log(`Email sent to ${to}. Message ID: ${response.messageId}`);
        return true;
    } catch (error) {
        console.error("Brevo API error details:");

        if (error.response) {
            // Handle Brevo API response errors
            console.error(`Status: ${error.response.status}`);
            console.error(`Body: ${JSON.stringify(error.response.body, null, 2)}`);
            console.error(`Headers: ${JSON.stringify(error.response.headers, null, 2)}`);

            let errorMessage = "Brevo API Error: ";
            if (error.response.body && error.response.body.message) {
                errorMessage += error.response.body.message;
            } else {
                errorMessage += error.response.statusText || "Unknown error";
            }

            throw new Error(errorMessage);
        } else {
            console.error("Full error:", error);
            throw new Error("Network or configuration error");
        }
    }
}

module.exports = sendVerificationEmail;