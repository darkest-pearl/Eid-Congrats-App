export default function SupportPageView({
  page,
  homeHref,
  backLabel,
  linksLabel,
  links,
  contactEmail
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
        </div>
      </section>

      {page.emailLabel ? (
        <section className="support-contact-panel">
          <div className="support-contact-label">{page.emailLabel}</div>
          {contactEmail ? (
            <a className="support-contact-link" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          ) : (
            <div className="support-contact-missing">{page.emailMissing}</div>
          )}
        </section>
      ) : null}

      <section className="support-sections">
        {page.sections.map((section) => (
          <article key={section.title} className="support-card">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
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
