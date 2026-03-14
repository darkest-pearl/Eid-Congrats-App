import ContactForm from "./ContactForm";

export default function SupportPageView({
  page,
  homeHref,
  backLabel,
  linksLabel,
  links,
  contactEmail,
  languageLabel,
  languageLinks
}) {
  return (
    <main className="support-layout">
      <section className="support-hero">
        <div className="pill">{page.eyebrow}</div>
        <h1 className="support-title">{page.title}</h1>
        <p className="support-intro">{page.intro}</p>
        <div className="support-actions">
          <a className="ghost-link" href={homeHref}>
            {backLabel}
          </a>
          {languageLinks?.length ? (
            <div className="support-language-group" aria-label={languageLabel}>
              <span className="support-language-label">{languageLabel}</span>
              <div className="support-language-links">
                {languageLinks.map((link) => (
                  <a
                    key={link.id}
                    className={`ghost-link support-language-link ${link.isActive ? "is-active" : ""}`}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {page.summarySections?.length ? (
        <section className="support-summary-grid">
          {page.summarySections.map((section) => (
            <article key={section.title} className="support-card support-summary-card">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
      ) : null}

      {page.emailLabel ? (
        <section className={`support-contact-grid ${page.contactForm ? "has-form" : ""}`}>
          <div className="support-contact-panel">
            <div className="support-contact-label">{page.emailLabel}</div>
            {page.emailNote ? <p className="support-contact-note">{page.emailNote}</p> : null}
            {contactEmail ? (
              <a className="support-contact-link" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            ) : (
              <div className="support-contact-missing">{page.emailMissing}</div>
            )}
          </div>

          {page.contactForm ? <ContactForm formCopy={page.contactForm} /> : null}
        </section>
      ) : null}

      <section className="support-sections">
        {page.sections.map((section) => (
          <article key={section.title} className="support-card">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.items?.length ? (
              <ul className="support-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      <section className="support-links-panel">
        <div className="support-links-heading">{linksLabel}</div>
        <div className="support-links-grid">
          {links.map((link) => (
            <a key={link.id} className="support-link-card" href={link.href}>
              <strong>{link.label}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
