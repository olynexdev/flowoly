import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendApplicationEmail = (data: any) => {
  const mailOptions: any = {
    from: {
      name: 'Olynex',
      address: process.env.USER_EMAIL,
    },
    to: 'career@olynex.com',
    subject: `New job application from ${data.name}`,
    html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 640px; margin: auto; padding: 20px; background-color: #f7f9fc; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
  <header style="background: linear-gradient(135deg, #27FC8C, #1EBFFF, #9557FD); color: white; padding: 30px 20px; border-radius: 10px 10px 0 0;">
    <h2 style="margin: 0; font-size: 24px;">New Job Application</h2>
    <p style="margin: 4px 0 0;">A candidate has submitted their application via the website.</p>
  </header>

  <section style="background-color: white; padding: 24px; border-radius: 0 0 10px 10px;">
    <h3 style="margin-top: 0; font-size: 20px; color: #333;">Applicant Details</h3>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px;"><strong>Name:</strong></td>
        <td style="padding: 8px;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Positions:</strong></td>
        <td style="padding: 8px;">${data.positions}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Email:</strong></td>
        <td style="padding: 8px;"><a href="mailto:${data.email}" style="color: #1EBFFF;">${data.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Phone:</strong></td>
        <td style="padding: 8px;">${data.number}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Country:</strong></td>
        <td style="padding: 8px;">${data.country}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Current Position:</strong></td>
        <td style="padding: 8px;">${data.currentPosition}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Years of Experience:</strong></td>
        <td style="padding: 8px;">${data.yearsExperience}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Expected Salary:</strong></td>
        <td style="padding: 8px;">${data.expectedSalary}</td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>Portfolio:</strong></td>
        <td style="padding: 8px;"><a href="${data.portfolioLink}" target="_blank" style="color: #007BFF;">${data.portfolioLink}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px;"><strong>CV link:</strong></td>
        <td style="padding: 8px;"><a href="${data.cv}" target="_blank" style="color: #007BFF;">${data.cv}</a></td>
      </tr>
    </table>
     
        
      
  </section>

  <footer style="text-align: center; margin-top: 24px; font-size: 13px; color: #777;">
    You are receiving this email because someone submitted a job application via your site.
  </footer>
</div>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
