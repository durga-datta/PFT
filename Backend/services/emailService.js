import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  logger:true,
  debug: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
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
