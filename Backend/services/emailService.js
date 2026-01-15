import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
  try {
    await resend.emails.send({
      from: "PFT <onboarding@resend.dev>",
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("❌ EMAIL SEND FAILED:", error);
    throw new Error("EMAIL_FAILED");
  }
};
