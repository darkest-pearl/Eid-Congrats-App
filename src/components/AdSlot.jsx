import { useEffect, useMemo, useRef } from "react";

function ensureAdSenseScript(adClient, onReady) {
  if (typeof document === "undefined" || !adClient) {
    return undefined;
  }

  const existing = document.querySelector(`script[data-adsense-client="${adClient}"]`);
  if (existing) {
    if (typeof onReady === "function") {
      existing.addEventListener("load", onReady, { once: true });
    }
    return existing;
  }

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.dataset.adsenseClient = adClient;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adClient)}`;
  if (typeof onReady === "function") {
    script.addEventListener("load", onReady, { once: true });
  }
  document.head.appendChild(script);
  return script;
}

export default function AdSlot({
  title,
  description,
  badgeLabel,
  placeholderLabel,
  readyLabel,
  hint,
  adClient,
  adSlot,
  placeholderMode,
  className = "",
  minHeight = 150
}) {
  const adRef = useRef(null);

  const isLiveAd = useMemo(
    () => Boolean(!placeholderMode && adClient && adSlot),
    [adClient, adSlot, placeholderMode]
  );

  useEffect(() => {
    if (!isLiveAd || typeof window === "undefined" || !adRef.current) {
      return undefined;
    }

    const element = adRef.current;
    if (element.dataset.codexRendered === "true") {
      return undefined;
    }

    let cancelled = false;

    const requestAd = () => {
      if (cancelled || element.dataset.codexRendered === "true") {
        return;
      }

      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        element.dataset.codexRendered = "true";
      } catch {
        element.dataset.codexRendered = "error";
      }
    };

    const script = ensureAdSenseScript(adClient, requestAd);
    if (window.adsbygoogle && script) {
      requestAd();
    }

    return () => {
      cancelled = true;
    };
  }, [adClient, isLiveAd]);

  if (!isLiveAd) {
    return null;
  }

  const classes = ["ad-slot-card", className].filter(Boolean).join(" ");

  return (
    <aside className={classes}>
      <div className="ad-slot-copy">
        <div className="ad-slot-badge-row">
          <span className="ad-slot-badge">{badgeLabel}</span>
          <span className="ad-slot-state live">{readyLabel}</span>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="ad-slot-frame" style={{ minHeight }}>
        <ins
          ref={adRef}
          className="adsbygoogle ad-slot-live"
          style={{ display: "block" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
