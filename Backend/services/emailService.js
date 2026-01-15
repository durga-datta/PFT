import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,          // ✅ IMPORTANT (Render-safe)
  secure: true,       // ✅ MUST be true for 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // App Password
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

/**
 * Send email safely (never crashes server)
 */
export const sendEmail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: `"PFT" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("❌ EMAIL SEND FAILED:", error.message);
    throw new Error("EMAIL_FAILED");
  }
};
