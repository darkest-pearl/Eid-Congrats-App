const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toString(value) {
  return typeof value === "string" ? value : "";
}

function sanitizeSingleLine(value, maxLength) {
  return toString(value)
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMessage(value, maxLength) {
  return toString(value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

export function escapeHtml(value) {
  return toString(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContactPayload(payload) {
  const data = {
    name: sanitizeSingleLine(payload?.name, 100),
    email: sanitizeSingleLine(payload?.email, 254).toLowerCase(),
    subject: sanitizeSingleLine(payload?.subject, 140),
    message: sanitizeMessage(payload?.message, 4000)
  };

  const fields = {};

  if (!data.name) {
    fields.name = "Please enter your name.";
  }

  if (!data.email) {
    fields.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    fields.email = "Please enter a valid email address.";
  }

  if (!data.subject) {
    fields.subject = "Please enter a subject.";
  }

  if (!data.message) {
    fields.message = "Please enter a message.";
  }

  return {
    isValid: Object.keys(fields).length === 0,
    data,
    fields
  };
}
