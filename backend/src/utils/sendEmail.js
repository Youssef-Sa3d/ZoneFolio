


// Alternative API method (more reliable)
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

async function sendVerificationEmail(to, code) {
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY; 
    
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
        to: [{ email: to }],
        sender: {
            email: "zonefolio.platform@gmail.com",
            name: "Zonefolio"
        },
        subject: "Your Verification Code",
        htmlContent: `<p>Your code: <strong>${code}</strong></p>`
    });
    
    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        return true;
    } catch (error) {
        console.error("Brevo API error:", error);
        throw error;
    }
}

module.exports = sendVerificationEmail;