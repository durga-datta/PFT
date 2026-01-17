export const otpEmailTemplate = ({ otp }) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          background-color: #0f0f0f;
          font-family: Arial, sans-serif;
          color: #ffffff;
          padding: 20px;
        }
        .container {
          max-width: 480px;
          margin: auto;
          background: #000;
          border: 1px solid #7c3aed;
          border-radius: 12px;
          padding: 24px;
        }
        h1 {
          color: #a855f7;
          text-align: center;
        }
        .otp {
          font-size: 28px;
          letter-spacing: 6px;
          font-weight: bold;
          text-align: center;
          margin: 24px 0;
          color: #22c55e;
        }
        p {
          font-size: 14px;
          color: #d1d5db;
          text-align: center;
        }
        .footer {
          margin-top: 24px;
          font-size: 12px;
          color: #9ca3af;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>PFT Verification</h1>
        <p>Use the OTP below to verify your email address.</p>

        <div class="otp">${otp}</div>

        <p>This OTP is valid for <b>10 minutes</b>.</p>

        <div class="footer">
          If you didn’t request this, you can safely ignore this email.
        </div>
      </div>
    </body>
  </html>
  `;
};
