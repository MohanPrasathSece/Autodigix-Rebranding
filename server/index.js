import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: parseInt(process.env.SMTP_PORT || '465', 10) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // This should be an App Password, not your regular password
  },
  tls: {
    // Do not fail on invalid certs (common issue in local dev environments on Windows)
    rejectUnauthorized: false
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, company, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const adminMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO || process.env.SMTP_USER, // Send to the recipient specified in .env
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone/Company: ${company || 'N/A'}
Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone/Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    const userMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email, // Send to the user who filled the form
      subject: `Thank you for contacting AutoDigiX, ${name}!`,
      text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message and our team will get back to you shortly.\n\nYour message:\n${message}\n\nBest regards,\nThe AutoDigiX Team`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h3>Thank you for contacting AutoDigiX!</h3>
          <p>Hi ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p><strong>Your message:</strong></p>
          <p style="color: #555;">${message.replace(/\n/g, '<br>')}</p>
          <br />
          <p>Best regards,<br/><strong>The AutoDigiX Team</strong></p>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
