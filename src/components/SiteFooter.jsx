export default function SiteFooter({ homeHref, homeLabel, currentPage, links, tagline }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-tagline">{tagline}</p>
        <nav className="site-footer-nav" aria-label="Footer">
          <a className={!currentPage ? "is-active" : ""} href={homeHref}>
            {homeLabel}
          </a>
          {links.map((link) => (
            <a key={link.id} className={currentPage === link.id ? "is-active" : ""} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
