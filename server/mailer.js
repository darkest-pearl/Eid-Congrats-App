import nodemailer from "nodemailer";
import { escapeHtml } from "./validation.js";

let transporter;

function parseBoolean(value) {
  if (typeof value !== "string") {
    return false;
  }

  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function getMailConfig() {
  const requiredKeys = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
  const missing = requiredKeys.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    const error = new Error(`Missing required SMTP configuration: ${missing.join(", ")}`);
    error.code = "CONFIG_ERROR";
    error.details = missing;
    throw error;
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || "musabcreate@gmail.com";
  const secure = parseBoolean(process.env.SMTP_SECURE);
  const port = Number(process.env.SMTP_PORT);

  if (!Number.isInteger(port) || port <= 0) {
    const error = new Error("SMTP_PORT must be a valid positive integer.");
    error.code = "CONFIG_ERROR";
    throw error;
  }

  const fromEmail = process.env.SMTP_USER.includes("@") ? process.env.SMTP_USER : toEmail;

  return {
    host: process.env.SMTP_HOST,
    port,
    secure,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    toEmail,
    fromEmail
  };
}

function getTransporter() {
  if (!transporter) {
    const config = getMailConfig();
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });
  }

  return transporter;
}

export async function sendContactEmail(contact) {
  const config = getMailConfig();
  const smtpTransporter = getTransporter();
  const submittedAt = new Date().toISOString();
  const safeName = escapeHtml(contact.name);
  const safeEmail = escapeHtml(contact.email);
  const safeSubject = escapeHtml(contact.subject);
  const safeMessage = escapeHtml(contact.message).replace(/\n/g, "<br />");

  await smtpTransporter.sendMail({
    from: `"Eid Greetings Contact" <${config.fromEmail}>`,
    to: config.toEmail,
    replyTo: `${contact.name} <${contact.email}>`,
    subject: `[Eid Greetings] ${contact.subject}`,
    text: [
      "New contact form submission from Eid Greetings",
      "",
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      `Subject: ${contact.subject}`,
      `Submitted: ${submittedAt}`,
      "",
      "Message:",
      contact.message
    ].join("\n"),
    html: `
      <div style="font-family:Segoe UI,Tahoma,sans-serif;color:#0f172a;line-height:1.6">
        <h2 style="margin:0 0 16px">New contact form submission</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${safeName}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${safeEmail}</p>
        <p style="margin:0 0 8px"><strong>Subject:</strong> ${safeSubject}</p>
        <p style="margin:0 0 16px"><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
        <div style="padding:16px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc">
          ${safeMessage}
        </div>
      </div>
    `
  });
}
