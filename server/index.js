import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.post('/api/contact', async (req, res) => {
  const { name, email, company, budget, message, role, phone, type, resumeUrl, file } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  // Reload env in case it was updated while server is running
  dotenv.config({ path: path.join(__dirname, '.env'), override: true });
  dotenv.config({ path: path.join(__dirname, '..', '.env'), override: true });

  const activeTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: parseInt(process.env.SMTP_PORT || '465', 10) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: (process.env.SMTP_PASS || '').replace(/["'\s]/g, ''),
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const isCareer = type === 'career' || Boolean(role) || (company && company.includes('CAREER'));

  const smtpFrom = process.env.SMTP_FROM || process.env.SMTP_USER;
  const smtpTo = process.env.SMTP_TO || process.env.SMTP_USER;

  // Prepare attachments if a file was uploaded
  const attachments = [];
  if (file && file.base64 && file.name) {
    try {
      const base64Clean = file.base64.includes(';base64,')
        ? file.base64.split(';base64,').pop()
        : file.base64;

      attachments.push({
        filename: file.name,
        content: Buffer.from(base64Clean, 'base64'),
        contentType: file.type || 'application/pdf',
      });
    } catch (attErr) {
      console.error('Error processing attachment:', attErr);
    }
  }

  const adminSubject = isCareer
    ? `New Career Application: ${role || 'Job Applicant'} - ${name}`
    : `New Contact Form Submission from ${name}`;

  const adminText = isCareer
    ? `
NEW CAREER APPLICATION RECEIVED

Candidate Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Role Applied For: ${role || 'General Application'}
Resume Attachment: ${file && file.name ? file.name : 'No file attached'}
Resume / Portfolio URL: ${resumeUrl || 'Not provided'}
Note / Message:
${message || 'N/A'}
    `
    : `
Name: ${name}
Email: ${email}
Phone/Company: ${company || phone || 'N/A'}
Message:
${message}
    `;

  const adminHtml = isCareer
    ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1a1a1a; margin-top: 0; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">New Career Application</h2>
        <p><strong>Candidate Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Role Applied For:</strong> <span style="background: #f0f0f0; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${role || 'General Application'}</span></p>
        ${file && file.name ? `<p><strong>Attached Resume:</strong> <span style="color: #107c41; font-weight: bold;">📎 ${file.name} (See attached document below)</span></p>` : ''}
        ${resumeUrl ? `<p><strong>Portfolio / Link:</strong> <a href="${resumeUrl}" target="_blank" style="color: #0066cc; font-weight: bold;">${resumeUrl}</a></p>` : ''}
        <p><strong>Cover Note / Message:</strong></p>
        <div style="background: #f9f9f9; padding: 12px; border-radius: 6px; color: #333; line-height: 1.6;">
          ${(message || 'No additional note provided.').replace(/\n/g, '<br>')}
        </div>
      </div>
    `
    : `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone/Company:</strong> ${company || phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${(message || '').replace(/\n/g, '<br>')}</p>
    `;

  const userSubject = isCareer
    ? `Thank you for applying to AutoDigiX, ${name}!`
    : `Thank you for contacting AutoDigiX, ${name}!`;

  const userText = isCareer
    ? `Hi ${name},\n\nThank you for submitting your application for the ${role || 'team'} position at AutoDigiX.\n\nWe have received your resume document and details. Our talent team will review your profile, and if your background matches our upcoming requirements, we will reach out to you directly.\n\nBest regards,\nThe AutoDigiX Team`
    : `Hi ${name},\n\nThank you for reaching out to us. We have received your message and our team will get back to you shortly.\n\nYour message:\n${message}\n\nBest regards,\nThe AutoDigiX Team`;

  const userHtml = isCareer
    ? `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h3 style="color: #1a1a1a;">Thank You for Applying to AutoDigiX!</h3>
        <p>Hi ${name},</p>
        <p>Thank you for submitting your application for the <strong>${role || 'team'}</strong> position at AutoDigiX.</p>
        <p>We have successfully received your resume and profile. Our team will review your background, and if your skillset aligns with our openings, we will connect with you directly.</p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="color: #777; font-size: 13px;">AutoDigiX · AI Automation & Digital Marketing Agency</p>
        <p>Best regards,<br/><strong>The AutoDigiX Team</strong></p>
      </div>
    `
    : `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h3>Thank you for contacting AutoDigiX!</h3>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and our team will get back to you shortly.</p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p><strong>Your message:</strong></p>
        <p style="color: #555;">${(message || '').replace(/\n/g, '<br>')}</p>
        <br />
        <p>Best regards,<br/><strong>The AutoDigiX Team</strong></p>
      </div>
    `;

  try {
    const adminMailOptions = {
      from: smtpFrom,
      to: isCareer ? (process.env.CAREER_SMTP_TO || 'info@autodigix.com') : smtpTo,
      replyTo: email,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    const userMailOptions = {
      from: smtpFrom,
      to: email,
      subject: userSubject,
      text: userText,
      html: userHtml,
    };

    await Promise.all([
      activeTransporter.sendMail(adminMailOptions),
      activeTransporter.sendMail(userMailOptions)
    ]);
    res.status(200).json({ message: 'Submitted successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: error.message || 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
