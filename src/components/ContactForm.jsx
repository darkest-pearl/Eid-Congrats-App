import { useState } from "react";

const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactForm(values, copy) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = copy.validation.nameRequired;
  }

  if (!values.email.trim()) {
    errors.email = copy.validation.emailRequired;
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = copy.validation.emailInvalid;
  }

  if (!values.subject.trim()) {
    errors.subject = copy.validation.subjectRequired;
  }

  if (!values.message.trim()) {
    errors.message = copy.validation.messageRequired;
  }

  return errors;
}

export default function ContactForm({ formCopy }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
    setServerError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validateContactForm(values, formCopy);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim()
        })
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        if (payload?.error?.fields && typeof payload.error.fields === "object") {
          setErrors(payload.error.fields);
        }

        setServerError(payload?.error?.message || formCopy.errorMessage);
        return;
      }

      setValues(EMPTY_FORM);
      setErrors({});
      setIsSuccess(true);
    } catch {
      setServerError(formCopy.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleResetSuccess() {
    setIsSuccess(false);
    setServerError("");
    setErrors({});
  }

  if (isSuccess) {
    return (
      <section className="support-form-panel support-form-success" aria-live="polite">
        <div className="support-form-header">
          <h2>{formCopy.successTitle}</h2>
          <p>{formCopy.successBody}</p>
        </div>

        <button className="secondary-btn" type="button" onClick={handleResetSuccess}>
          {formCopy.resetLabel}
        </button>
      </section>
    );
  }

  return (
    <section className="support-form-panel">
      <div className="support-form-header">
        <h2>{formCopy.title}</h2>
        <p>{formCopy.intro}</p>
      </div>

      <form className="support-form" onSubmit={handleSubmit} noValidate>
        <div className="support-form-row">
          <div className="support-form-field">
            <label htmlFor="contact-name">{formCopy.nameLabel}</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder={formCopy.namePlaceholder}
              maxLength={100}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              required
            />
            {errors.name ? (
              <div className="support-form-error" id="contact-name-error">
                {errors.name}
              </div>
            ) : null}
          </div>

          <div className="support-form-field">
            <label htmlFor="contact-email">{formCopy.emailFieldLabel}</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={formCopy.emailPlaceholder}
              maxLength={254}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              required
            />
            {errors.email ? (
              <div className="support-form-error" id="contact-email-error">
                {errors.email}
              </div>
            ) : null}
          </div>
        </div>

        <div className="support-form-field">
          <label htmlFor="contact-subject">{formCopy.subjectLabel}</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            placeholder={formCopy.subjectPlaceholder}
            maxLength={140}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            required
          />
          {errors.subject ? (
            <div className="support-form-error" id="contact-subject-error">
              {errors.subject}
            </div>
          ) : null}
        </div>

        <div className="support-form-field">
          <label htmlFor="contact-message">{formCopy.messageLabel}</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={formCopy.messagePlaceholder}
            maxLength={4000}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            required
          />
          {errors.message ? (
            <div className="support-form-error" id="contact-message-error">
              {errors.message}
            </div>
          ) : null}
        </div>

        {serverError ? (
          <div className="support-form-status is-error" aria-live="polite">
            {serverError}
          </div>
        ) : null}

        <div className="support-form-actions">
          <button className="primary-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? formCopy.sendingLabel : formCopy.submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
