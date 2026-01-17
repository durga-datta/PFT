import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 60000
});

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"PFT" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("❌ EMAIL SEND FAILED:", error);
    throw new Error("EMAIL_FAILED");
  }
};
