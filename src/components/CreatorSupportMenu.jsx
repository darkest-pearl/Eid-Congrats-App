import { AnimatePresence, motion } from "framer-motion";
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

  function handleToggle(id) {
    setOpenId((current) => (current === id ? "" : id));
  }

  return (
    <section className="creator-menu-section">
      <div className="creator-section-heading">
        <div className="pill">{title}</div>
        <p>{intro}</p>
      </div>

      <div className="support-menu-list" aria-label={title}>
        {menuItems.map((item) => {
          const isOpen = openId === item.id;
          const isHome = item.id === "home";
          const panelId = `support-menu-panel-${item.id}`;
          const triggerId = `support-menu-trigger-${item.id}`;
          const page = isHome ? null : pages[item.id];
          const sections = page?.summarySections ?? page?.sections ?? [];

          return (
            <article key={item.id} className={`support-menu-item ${isOpen ? "is-open" : ""}`}>
              <h2 className="support-menu-heading">
                {isHome ? (
                  <a id={triggerId} className="support-menu-trigger" href={item.href}>
                    <span className="support-menu-label">{item.label}</span>
                    <MenuArrow isOpen={false} />
                  </a>
                ) : (
                  <button
                    id={triggerId}
                    className={`support-menu-trigger ${isOpen ? "is-open" : ""}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(item.id)}
                  >
                    <span className="support-menu-label">{item.label}</span>
                    <MenuArrow isOpen={isOpen} />
                  </button>
                )}
              </h2>

              <AnimatePresence initial={false}>
                {!isHome && isOpen ? (
                  <motion.div
                    key={item.id}
                    className="support-menu-panel-shell"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.18, ease: "easeOut" }
                    }}
                  >
                    <div className="support-menu-panel" id={panelId} role="region" aria-labelledby={triggerId}>
                      {page ? (
                        <>
                          <div className="support-menu-copy">
                            <div className="pill">{page.eyebrow}</div>
                            <h3>{page.title}</h3>
                            <p>{page.intro}</p>
                          </div>

                          <div className="support-menu-card-grid">
                            {sections.map((section) => (
                              <article key={section.title} className="content-card compact">
                                <h4>{section.title}</h4>
                                <p>{section.body}</p>
                              </article>
                            ))}
                          </div>

                          <div className="support-menu-actions">
                            <a className="ghost-link" href={item.href}>
                              {openPageLabel}
                            </a>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="support-menu-copy">
                            <div className="pill">{homeLabel}</div>
                            <h3>{homeTitle}</h3>
                            <p>{homeIntro}</p>
                          </div>

                          {lowerContent}
                        </>
                      )}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}
