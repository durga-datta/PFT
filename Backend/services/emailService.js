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

export const sendEmail = ({ to, subject, text, html }) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: `"PFT" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    }, (error, info) => {
      if (error) {
        console.error("❌ EMAIL SEND FAILED:", error);
        reject(new Error("EMAIL_FAILED"));
      } else {
        resolve(info);
      }
    });
  });
};
