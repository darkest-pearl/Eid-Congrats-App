import { useMemo, useState } from "react";

const DEFAULT_LANGUAGE = "en";
const DEFAULT_STYLE_ID = "classic";

const styleOptions = [
  {
    id: "classic",
    className: "theme-classic",
    title: { en: "Classic Gold", ar: "ذهبي كلاسيكي" },
    message: {
      en: "May this Eid fill your home with peace, joy, and mercy.",
      ar: "أسأل الله أن يملأ هذا العيد بيتكم سكينة وفرحًا ورحمة."
    }
  },
  {
    id: "night",
    className: "theme-night",
    title: { en: "Moonlight Night", ar: "ليلة القمر" },
    message: {
      en: "Wishing you and your loved ones a bright Eid full of blessings.",
      ar: "عيد مبارك لكم ولمن تحبون، مليء بالنور والبركة."
    }
  },
  {
    id: "soft",
    className: "theme-soft",
    title: { en: "Soft Celebration", ar: "احتفال هادئ" },
    message: {
      en: "Warm Eid wishes to you and your family, with love and gratitude.",
      ar: "أطيب تهاني العيد لكم ولعائلتكم مع المحبة والامتنان."
    }
  }
];

const copy = {
  en: {
    creatorBadge: "Eid Greeting Creator",
    creatorTitleA: "Build your",
    creatorTitleB: "shareable Eid page",
    creatorDescription:
      "Fill the sender details and share one personalized URL. Recipients open a full festive Eid card page.",
    senderName: "Sender name",
    senderPlaceholder: "Enter sender name",
    language: "Language",
    style: "Greeting style",
    customMessage: "Custom message (optional)",
    customPlaceholder: "Leave blank to use the selected style default.",
    previewLink: "Preview Link",
    share: "Share Link",
    sharing: "Sharing...",
    copyLink: "Copy Link",
    reset: "Reset",
    shareTitle: "Eid Mubarak Greeting",
    shareSuccess: "Personalized link shared successfully.",
    copySuccess: "Preview link copied.",
    shareFallback: "Native share unavailable. Preview link copied instead.",
    copyError: "Clipboard is unavailable in this browser.",
    helperHint:
      "Only the personalized URL is shared. Recipients see a full Eid greeting page.",
    previewCardLabel: "Live Greeting Preview",
    fromLabel: "From",
    defaultSender: "Someone who cares",
    ad1: "Ad Space 1",
    ad2: "Ad Space 2",
    ad1Description:
      "Google AdSense placeholder. Replace with your production ad unit.",
    ad2Description:
      "Sponsored slot for local Eid offers, gifts, sweets, clothing, or perfume.",
    greetingBadge: "Eid al-Fitr Greeting",
    greetingSubtitle: "May your days be full of peace and blessings.",
    ctaCreateOwn: "Create your own Eid greeting"
  },
  ar: {
    creatorBadge: "منشئ تهنئة عيد الفطر",
    creatorTitleA: "أنشئ",
    creatorTitleB: "صفحة تهنئة عيد قابلة للمشاركة",
    creatorDescription:
      "املأ بيانات المرسل وشارك رابطًا شخصيًا واحدًا. المستلم سيرى صفحة تهنئة عيد كاملة بتصميم احتفالي.",
    senderName: "اسم المرسل",
    senderPlaceholder: "اكتب اسم المرسل",
    language: "اللغة",
    style: "نمط التهنئة",
    customMessage: "رسالة مخصصة (اختيارية)",
    customPlaceholder: "اترك الحقل فارغًا لاستخدام رسالة النمط الافتراضية.",
    previewLink: "رابط المعاينة",
    share: "مشاركة الرابط",
    sharing: "جارٍ المشاركة...",
    copyLink: "نسخ الرابط",
    reset: "إعادة تعيين",
    shareTitle: "تهنئة عيد مبارك",
    shareSuccess: "تمت مشاركة الرابط الشخصي بنجاح.",
    copySuccess: "تم نسخ رابط المعاينة.",
    shareFallback: "المشاركة المباشرة غير متاحة. تم نسخ رابط المعاينة بدلًا من ذلك.",
    copyError: "لا يمكن الوصول إلى الحافظة في هذا المتصفح.",
    helperHint:
      "تتم مشاركة الرابط الشخصي فقط. المستلم يرى صفحة تهنئة عيد كاملة.",
    previewCardLabel: "معاينة التهنئة",
    fromLabel: "من",
    defaultSender: "شخص يقدّرك",
    ad1: "مساحة إعلانية 1",
    ad2: "مساحة إعلانية 2",
    ad1Description: "مكان مخصص لإعلان Google AdSense. استبدله بوحدة الإعلان الحقيقية.",
    ad2Description:
      "مساحة دعائية لعروض العيد المحلية مثل الهدايا والحلويات والملابس والعطور.",
    greetingBadge: "تهنئة عيد الفطر",
    greetingSubtitle: "نسأل الله أن يملأ أيامكم بالسكينة والبركة.",
    ctaCreateOwn: "أنشئ تهنئة عيد خاصة بك"
  }
};

const styleIds = new Set(styleOptions.map((style) => style.id));

const lamps = Array.from({ length: 11 }, (_, index) => ({
  id: index,
  left: `${5 + index * 8.3}%`,
  delay: `${(index * 0.17).toFixed(2)}s`,
  duration: `${(3.5 + (index % 4) * 0.35).toFixed(2)}s`
}));

function normalizeLanguage(value) {
  return value === "ar" ? "ar" : DEFAULT_LANGUAGE;
}

function normalizeStyleId(value) {
  return styleIds.has(value) ? value : DEFAULT_STYLE_ID;
}

function hasGreetingParams(search) {
  const params = new URLSearchParams(search || "");
  return ["lang", "name", "msg", "style"].some((key) => params.has(key));
}

function parseGreetingState(search) {
  const params = new URLSearchParams(search || "");

  return {
    hasGreetingParams: hasGreetingParams(search),
    language: normalizeLanguage(params.get("lang")),
    senderName: params.get("name")?.trim() ?? "",
    customMessage: params.get("msg")?.trim() ?? "",
    styleId: normalizeStyleId(params.get("style"))
  };
}

function buildShareUrl({ language, senderName, customMessage, styleId }, baseHref) {
  const source =
    baseHref ??
    (typeof window !== "undefined" ? window.location.href : "https://example.com/");
  const url = new URL(source);
  const params = new URLSearchParams();

  params.set("lang", normalizeLanguage(language));
  params.set("name", senderName.trim());
  params.set("msg", customMessage.trim());
  params.set("style", normalizeStyleId(styleId));

  url.search = params.toString();
  return url.toString();
}

function buildGreetingMessage(language, senderName, customMessage, style) {
  const custom = customMessage.trim();
  if (custom) {
    return custom;
  }

  const defaultMessage = language === "ar" ? style.message.ar : style.message.en;
  const fromName = senderName.trim();

  if (language === "ar") {
    return `${defaultMessage} من ${fromName || copy.ar.defaultSender}.`;
  }

  return `${defaultMessage} From ${fromName || copy.en.defaultSender}.`;
}

function canUseNativeShare(payload) {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }

  if (typeof navigator.share !== "function") {
    return false;
  }

  const secureOk =
    window.isSecureContext ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (!secureOk) {
    return false;
  }

  if (typeof navigator.canShare === "function") {
    try {
      return navigator.canShare(payload);
    } catch {
      return false;
    }
  }

  return true;
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "readonly");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  return copied;
}

function isPermissionStyleShareError(error) {
  return (
    error instanceof Error &&
    (error.name === "AbortError" ||
      error.name === "NotAllowedError" ||
      /permission denied/i.test(error.message))
  );
}

function buildCreatorUrl(sourceHref) {
  const source = sourceHref || "https://example.com/";
  const url = new URL(source);
  url.search = "";
  url.hash = "";
  return `${url.origin}${url.pathname}`;
}

function runSelfTests() {
  if (normalizeStyleId("bad-style") !== DEFAULT_STYLE_ID) {
    throw new Error("Style validation fallback failed.");
  }

  if (normalizeLanguage("de") !== DEFAULT_LANGUAGE) {
    throw new Error("Language validation fallback failed.");
  }

  const parsed = parseGreetingState("?lang=ar&name=Ali&msg=Hello&style=night");
  if (
    !parsed.hasGreetingParams ||
    parsed.language !== "ar" ||
    parsed.senderName !== "Ali" ||
    parsed.customMessage !== "Hello" ||
    parsed.styleId !== "night"
  ) {
    throw new Error("URL parsing sanity check failed.");
  }

  const defaults = parseGreetingState("");
  if (
    defaults.hasGreetingParams ||
    defaults.language !== "en" ||
    defaults.senderName !== "" ||
    defaults.customMessage !== "" ||
    defaults.styleId !== DEFAULT_STYLE_ID
  ) {
    throw new Error("Default fallback behavior is incorrect.");
  }

  if (!hasGreetingParams("?name=Sara") || hasGreetingParams("?x=1")) {
    throw new Error("Greeting-page mode detection failed.");
  }

  const shareUrl = buildShareUrl(
    {
      language: "en",
      senderName: "Mona",
      customMessage: "Warm wishes",
      styleId: "soft"
    },
    "https://example.com/eid?x=1"
  );
  const params = new URL(shareUrl).searchParams;
  if (
    params.get("lang") !== "en" ||
    params.get("name") !== "Mona" ||
    params.get("msg") !== "Warm wishes" ||
    params.get("style") !== "soft"
  ) {
    throw new Error("Share URL generation sanity check failed.");
  }
}

runSelfTests();

function DecorativeBackground() {
  return (
    <>
      <div className="sky-stars" />
      <div className="moon-glow" />
      <div className="floating-crescents" aria-hidden="true">
        <span className="crescent c1">☾</span>
        <span className="crescent c2">☾</span>
        <span className="crescent c3">☾</span>
      </div>
      <div className="hanging-lamps" aria-hidden="true">
        {lamps.map((lamp) => (
          <span
            key={lamp.id}
            className="lamp"
            style={{
              left: lamp.left,
              animationDelay: lamp.delay,
              animationDuration: lamp.duration
            }}
          >
            <span className="lamp-line" />
            <span className="lamp-body" />
          </span>
        ))}
      </div>
    </>
  );
}

function CreatorMode({
  ui,
  isArabic,
  senderName,
  setSenderName,
  language,
  setLanguage,
  styleId,
  setStyleId,
  customMessage,
  setCustomMessage,
  previewUrl,
  selectedStyle,
  greetingMessage,
  isSharing,
  handleShare,
  handleCopyLink,
  resetState,
  statusMessage
}) {
  return (
    <main className="creator-layout">
      <section className="creator-panel">
        <div className="pill">{ui.creatorBadge}</div>
        <h1 className="hero-title">
          {ui.creatorTitleA} <span>{ui.creatorTitleB}</span>
        </h1>
        <p className="hero-description">{ui.creatorDescription}</p>

        <div className="creator-card">
          <div className="field-grid">
            <div>
              <label htmlFor="sender-name">{ui.senderName}</label>
              <input
                id="sender-name"
                value={senderName}
                onChange={(event) => setSenderName(event.target.value)}
                placeholder={ui.senderPlaceholder}
              />
            </div>
            <div>
              <label htmlFor="language">{ui.language}</label>
              <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(normalizeLanguage(event.target.value))}
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="style">{ui.style}</label>
            <select
              id="style"
              value={styleId}
              onChange={(event) => setStyleId(normalizeStyleId(event.target.value))}
            >
              {styleOptions.map((style) => (
                <option key={style.id} value={style.id}>
                  {isArabic ? style.title.ar : style.title.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="custom-message">{ui.customMessage}</label>
            <textarea
              id="custom-message"
              rows={4}
              value={customMessage}
              onChange={(event) => setCustomMessage(event.target.value)}
              placeholder={ui.customPlaceholder}
            />
          </div>

          <div>
            <label htmlFor="preview-link">{ui.previewLink}</label>
            <div className="preview-link-row">
              <input
                id="preview-link"
                readOnly
                value={previewUrl}
                onFocus={(event) => event.target.select()}
              />
              <button className="secondary-btn" onClick={handleCopyLink}>
                {ui.copyLink}
              </button>
            </div>
          </div>

          <div className="button-row">
            <button className="primary-btn" onClick={handleShare} disabled={isSharing}>
              {isSharing ? ui.sharing : ui.share}
            </button>
            <button className="ghost-btn" onClick={resetState}>
              {ui.reset}
            </button>
          </div>

          <div className="status-note">{statusMessage || ui.helperHint}</div>
        </div>

        <div className="ads-grid">
          <article className="ad-card">
            <h3>{ui.ad1}</h3>
            <p>{ui.ad1Description}</p>
            <div className="ad-slot">client: ca-pub-xxxxxxxxxxxxxxxx · slot: 1234567890</div>
          </article>
          <article className="ad-card">
            <h3>{ui.ad2}</h3>
            <p>{ui.ad2Description}</p>
            <div className="ad-slot">client: ca-pub-xxxxxxxxxxxxxxxx · slot: 0987654321</div>
          </article>
        </div>
      </section>

      <section className="creator-preview-panel">
        <div className={`creator-preview-card ${selectedStyle.className}`}>
          <div className="creator-preview-inner">
            <div className="preview-pill">{ui.previewCardLabel}</div>
            <h2>{isArabic ? "عيد مبارك" : "Eid Mubarak"}</h2>
            <p>{greetingMessage}</p>
            <div className="from-block">
              <small>{ui.fromLabel}</small>
              <strong>{senderName.trim() || ui.defaultSender}</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function GreetingMode({ ui, isArabic, selectedStyle, senderName, greetingMessage, creatorUrl }) {
  return (
    <main className="greeting-layout">
      <section className={`greeting-card ${selectedStyle.className}`}>
        <div className="sparkles" aria-hidden="true">
          ✦ ✦ ✦
        </div>
        <div className="greeting-card-inner">
          <div className="pill">{ui.greetingBadge}</div>
          <h1 className="greeting-title">{isArabic ? "عيد مبارك" : "Eid Mubarak"}</h1>
          <p className="greeting-subtitle">{ui.greetingSubtitle}</p>

          <div className="greeting-message">
            <p>{greetingMessage}</p>
          </div>

          <div className="from-area">
            <small>{ui.fromLabel}</small>
            <div className="from-name">{senderName.trim() || ui.defaultSender}</div>
          </div>
        </div>
      </section>

      <a className="cta-link" href={creatorUrl}>
        {ui.ctaCreateOwn}
      </a>
    </main>
  );
}

export default function App() {
  const initial = useMemo(() => {
    if (typeof window === "undefined") {
      return parseGreetingState("");
    }
    return parseGreetingState(window.location.search);
  }, []);

  const [language, setLanguage] = useState(initial.language);
  const [senderName, setSenderName] = useState(initial.senderName);
  const [customMessage, setCustomMessage] = useState(initial.customMessage);
  const [styleId, setStyleId] = useState(initial.styleId);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const ui = copy[language];
  const isArabic = language === "ar";

  const selectedStyle = useMemo(
    () => styleOptions.find((style) => style.id === styleId) ?? styleOptions[0],
    [styleId]
  );

  const greetingMessage = useMemo(
    () => buildGreetingMessage(language, senderName, customMessage, selectedStyle),
    [language, senderName, customMessage, selectedStyle]
  );

  const previewUrl = useMemo(
    () => buildShareUrl({ language, senderName, customMessage, styleId }),
    [language, senderName, customMessage, styleId]
  );

  const creatorUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return "/";
    }
    return buildCreatorUrl(window.location.href);
  }, []);

  async function handleCopyLink() {
    try {
      const copied = await copyToClipboard(previewUrl);
      setStatusMessage(copied ? ui.copySuccess : ui.copyError);
    } catch {
      setStatusMessage(ui.copyError);
    }
  }

  async function handleShare() {
    if (isSharing) {
      return;
    }

    setIsSharing(true);
    setStatusMessage("");

    const payload = {
      title: ui.shareTitle,
      url: previewUrl
    };

    try {
      if (canUseNativeShare(payload)) {
        await navigator.share(payload);
        setStatusMessage(ui.shareSuccess);
      } else {
        const copied = await copyToClipboard(previewUrl);
        setStatusMessage(copied ? ui.shareFallback : ui.copyError);
      }
    } catch (error) {
      if (isPermissionStyleShareError(error)) {
        try {
          const copied = await copyToClipboard(previewUrl);
          setStatusMessage(copied ? ui.shareFallback : ui.copyError);
        } catch {
          setStatusMessage(ui.copyError);
        }
      } else {
        setStatusMessage(error instanceof Error ? error.message : ui.copyError);
      }
    } finally {
      setIsSharing(false);
    }
  }

  function resetState() {
    setLanguage(DEFAULT_LANGUAGE);
    setSenderName("");
    setCustomMessage("");
    setStyleId(DEFAULT_STYLE_ID);
    setStatusMessage("");
  }

  return (
    <div className="app-shell" dir={isArabic ? "rtl" : "ltr"}>
      <DecorativeBackground />

      {initial.hasGreetingParams ? (
        <GreetingMode
          ui={ui}
          isArabic={isArabic}
          selectedStyle={selectedStyle}
          senderName={senderName}
          greetingMessage={greetingMessage}
          creatorUrl={creatorUrl}
        />
      ) : (
        <CreatorMode
          ui={ui}
          isArabic={isArabic}
          senderName={senderName}
          setSenderName={setSenderName}
          language={language}
          setLanguage={setLanguage}
          styleId={styleId}
          setStyleId={setStyleId}
          customMessage={customMessage}
          setCustomMessage={setCustomMessage}
          previewUrl={previewUrl}
          selectedStyle={selectedStyle}
          greetingMessage={greetingMessage}
          isSharing={isSharing}
          handleShare={handleShare}
          handleCopyLink={handleCopyLink}
          resetState={resetState}
          statusMessage={statusMessage}
        />
      )}
    </div>
  );
}
