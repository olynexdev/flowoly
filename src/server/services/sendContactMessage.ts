
import nodemailer from "nodemailer";

// nodemailer password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// send email in frontend

export const sendEmail = (data: any) => {
  const mailOptions: any = {
    from: {
      name: "Olynex",
      address: process.env.USER_EMAIL,
    },
    to: "contactolynex@gmail.com", // receiver email
    subject: `New Contact Request from ${data.name}`,
    //   email body
    html: `
        <div style="
    background: linear-gradient(135deg, #27FC8C 6.5%, #1EBFFF 51.1%, #9557FD 92.26%);
    padding: 2px;
    border-radius: 12px;
    max-width: 640px;
    margin: 20px auto;
    font-family: 'Segoe UI', Arial, sans-serif;
">
    <div style="
        background: #ffffff;
        border-radius: 10px;
        padding: 30px;
        position: relative;
        overflow: hidden;
    ">

        <!-- Logo & Header -->
        <div style="
    background: linear-gradient(135deg, #27FC8C 6.5%, #1EBFFF 51.1%, #9557FD 92.26%);
    padding: 40px 20px;
    text-align: center;
    border-radius: 12px 12px 0 0;
    position: relative;
    margin-bottom: 25px;
">
    <!-- Gradient overlay for better contrast -->
    <div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(98deg, #00f8441a -1.47%, #0075ee1a 98.6%);
    "></div>
    
    <div style="position: relative; z-index: 1;">
        <h1 style="
            color: white;
            font-size: 24px;
            margin: 0 0 8px 0;
            font-weight: 700;
            letter-spacing: -0.5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.05);
        ">
            New Contact Request
        </h1>
        <div style="
            background: rgba(255, 255, 255, 0.9);
            height: 2px;
            width: 80px;
            margin: 0 auto;
            border-radius: 2px;
        "></div>
    </div>
</div>

        <!-- Contact Details -->
        <div style="
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
        ">
            <div style="display: grid; grid-gap: 12px;">
                <p style="margin: 0; font-size: 16px;">
                    <strong>Name:</strong> <span>${data.name}</span>
                </p>
                
                <p style="margin: 0; font-size: 16px;">
                    <a href="mailto:${data.email}" style="
                        color: #0075EE;
                        text-decoration: none;
                        font-weight: 500;
                    "><strong>Email:</strong> <span>${data.email}</span></a>
                </p>
                
                <p style="margin: 0; font-size: 16px;">
                    <strong>Phone Number:</strong> <span>${data.phoneNumber}</span>
                </p>
                
                <p style="margin: 0; font-size: 16px;">
                    <strong>Budget:</strong> <span>${data.budget}</span>
                </p>

                ${
                  data?.selectedInterests
                    ? `
                    <p style="margin: 0; font-size: 16px;">
                        ${data.selectedInterests
                          .map(
                            (interest: string) => `
                            <span style="
                                display: inline-block;
                                background: #f1f8ff;
                                color: #0075EE;
                                padding: 4px 12px;
                                border-radius: 20px;
                                margin: 4px 2px;
                                font-size: 14px;
                            ">${interest}</span>
                        `
                          )
                          .join("")}
                    </p>
                `
                    : ""
                }
            </div>
        </div>

        <!-- Details Section -->
        <div style="
            background: linear-gradient(135deg, #27fc8c0d 6.5%, #1ebfff0d 51.1%, #9557fd0d 92.26%);
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        ">
            <h3 style="
                color: #2b2b2b;
                font-size: 18px;
                margin: 0 0 12px 0;
                font-weight: 600;
            ">
                Message Details
            </h3>
            <p style="margin: 0; font-size: 16px; line-height: 1.5;">
                ${data.details}
            </p>
        </div>

        <!-- Footer -->
        <p style="
            font-size: 14px;
            color: #6c757d;
            text-align: center;
            margin: 25px 0 0 0;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
        ">
            Please reply to this email at your earliest convenience
        </p>
    </div>
</div>
      `,
                
  };

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
