import { useMemo, useState } from "react";

function MenuArrow({ isOpen }) {
  return <span className={`support-menu-arrow ${isOpen ? "is-open" : ""}`} aria-hidden="true" />;
}

export default function CreatorSupportMenu({
  title,
  intro,
  homeLabel,
  homeTitle,
  homeIntro,
  openPageLabel,
  homeHref,
  items,
  pages,
  lowerContent
}) {
  const [openId, setOpenId] = useState("");

  const menuItems = useMemo(() => [{ id: "home", href: homeHref, label: homeLabel }, ...items], [homeHref, homeLabel, items]);

  const activeLink = menuItems.find((item) => item.id === openId) || null;
  const activePage = openId && openId !== "home" ? pages[openId] : null;

  function handleToggle(id) {
    setOpenId((current) => (current === id ? "" : id));
  }

  return (
    <section className="creator-menu-section">
      <div className="creator-section-heading">
        <div className="pill">{title}</div>
        <p>{intro}</p>
      </div>

      <div className="support-menu-row" role="tablist" aria-label={title}>
        {menuItems.map((item) => {
          const isOpen = openId === item.id;

          return (
            <button
              key={item.id}
              className={`support-menu-trigger ${isOpen ? "is-open" : ""}`}
              type="button"
              role="tab"
              aria-expanded={isOpen}
              aria-controls={`support-menu-panel-${item.id}`}
              aria-selected={isOpen}
              onClick={() => handleToggle(item.id)}
            >
              <span>{item.label}</span>
              <MenuArrow isOpen={isOpen} />
            </button>
          );
        })}
      </div>

      {openId ? (
        <div className="support-menu-panel" id={`support-menu-panel-${openId}`} role="tabpanel">
          {activePage ? (
            <>
              <div className="support-menu-copy">
                <div className="pill">{activePage.eyebrow}</div>
                <h2>{activePage.title}</h2>
                <p>{activePage.intro}</p>
              </div>

              <div className="support-menu-card-grid">
                {activePage.sections.map((section) => (
                  <article key={section.title} className="content-card compact">
                    <h3>{section.title}</h3>
                    <p>{section.body}</p>
                  </article>
                ))}
              </div>

              {activeLink ? (
                <div className="support-menu-actions">
                  <a className="ghost-link" href={activeLink.href}>
                    {openPageLabel}
                  </a>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className="support-menu-copy">
                <div className="pill">{homeLabel}</div>
                <h2>{homeTitle}</h2>
                <p>{homeIntro}</p>
              </div>

              {lowerContent}
            </>
          )}
        </div>
      ) : null}
    </section>
  );
}
