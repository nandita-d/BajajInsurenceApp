const nodemailer = require('nodemailer');

const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    // Dev-friendly fallback so registration/login still work without email credentials.
    // Prints emails to console as JSON.
    return nodemailer.createTransport({ jsonTransport: true });
  }

  // Default to Gmail for simplicity; works for many providers when using app passwords.
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
};

const sendWelcomeEmail = async ({ to, name }) => {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Bajaj Insurance" <${process.env.EMAIL_USER || 'no-reply@bajajinsurance.com'}>`,
    to,
    subject: 'Welcome to Bajaj Insurance',
    text: `Hello ${name},\n\nWelcome to Bajaj Insurance. You are successfully registered.\n\nThanks,\nBajaj Insurance Team`,
    html: `<p>Hello ${name},</p><p><strong>Welcome to Bajaj Insurance.</strong> You are successfully registered.</p><p>Thanks,<br/>Bajaj Insurance Team</p>`,
  });
};

const notifyAdminNewUser = async ({ name, email }) => {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'ndas81772@gmail.com',
    subject: 'New User Registered',
    text: `Name: ${name}\nEmail: ${email}`,
  });
};

module.exports = { sendWelcomeEmail, notifyAdminNewUser };
