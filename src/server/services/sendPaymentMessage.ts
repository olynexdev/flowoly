import { TPayment } from "@/types/paymentTypes";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendPaymentMessage = (data: TPayment) => {
  const mailOptions = {
    from: `"Olynex" <${process.env.USER_EMAIL}>`,
    to: data.email,
    subject: `Payment Confirmation - ${data.slug}`,
    html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 640px; margin: auto; padding: 20px; background-color: #f7f9fc; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
  <header style="background: linear-gradient(135deg, #27FC8C, #1EBFFF, #9557FD); color: white; padding: 30px 20px; border-radius: 10px 10px 0 0; text-align: center;">
    <h2 style="margin: 0; font-size: 24px;">Payment Successful!</h2>
    <p style="margin: 4px 0 0;">Thank you for your purchase, ${data.name}!</p>
  </header>

  <section style="background-color: white; padding: 24px; border-radius: 0 0 10px 10px;">
    <h3 style="margin-top: 0; font-size: 20px; color: #333;">Payment Details</h3>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px;"><strong>Transaction ID:</strong></td>
        <td style="padding: 8px;">${data.transactionId}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Status:</strong></td>
        <td style="padding: 8px;">${data.status}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Amount:</strong></td>
        <td style="padding: 8px;">$${(data.amount / 100).toFixed(2)} ${data.currency.toUpperCase()}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Template Purchased:</strong></td>
        <td style="padding: 8px;"><a href="${data.template}" target="_blank" style="color: #007BFF;">View Template</a></td>
      </tr>
    </table>

    <p style="margin-top: 20px; font-size: 16px; color: #555;">
      You can access your purchased template using the link above. If you have any questions, feel free to reply to this email.
    </p>
  </section>

  <footer style="text-align: center; margin-top: 24px; font-size: 13px; color: #777;">
    This email confirms your purchase of the template via Olynex.
  </footer>
</div>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending payment email:", error);
    } else {
      console.log("Payment email sent:", info.response);
    }
  });
};
