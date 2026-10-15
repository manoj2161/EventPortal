import "dotenv/config"
const sender = process.env.VERIFIED_SENDER;
const backendUrl = process.env.BACKEND_URL;
export const verifyEmail = async (token, name, reciver) => {
  const verificationUrl = `${backendUrl.replace(/\/$/, "")}/api/auth/user/verify-email?token=${encodeURIComponent(token)}`;
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "Events Portal",
        email: sender,
      },
      to: [
        {
          email: reciver,
          name: name,
        },
      ],
      subject: "Verify your Email Address",
      htmlContent: `
       <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello, ${name}!</h2>
          <p>Thank you for registering with EventsPortal.</p>
          <p>Please click the link below to verify your email address:</p>
          <a
            href="${verificationUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background-color: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Verify Email
          </a>
          <p>This verification link expires in 15 minutes.</p>
          <p>If you did not create this account, you can ignore this email.</p>
          <p>Regards,<br />EventsPortal Team</p>
        </div>
      `,
    }),
  });
  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `Request failed with status ${response.status} : ${errorDetails}`,
    );
  }
  return await response.json();
};
