import { useMemo, useState } from "react";

const DEFAULT_LANGUAGE = "en";
const DEFAULT_THEME_ID = "classic";

const themes = [
  {
    id: "classic",
    className: "theme-classic",
    title: {
      en: "Classic Gold",
      ar: "ذهبي كلاسيكي"
    },
    message: {
      en: "May this Eid fill your home with peace, joy, and mercy.",
      ar: "أسأل الله أن يملأ هذا العيد بيتكم سكينة وفرحًا ورحمة."
    }
  },
  {
    id: "night",
    className: "theme-night",
    title: {
      en: "Moonlight Night",
      ar: "ليلة القمر"
    },
    message: {
      en: "Wishing you and your loved ones a bright Eid full of blessings.",
      ar: "عيد مبارك لكم ولمن تحبون، مليء بالنور والبركة."
    }
  },
  {
    id: "soft",
    className: "theme-soft",
    title: {
      en: "Soft Celebration",
      ar: "احتفال هادئ"
    },
    message: {
      en: "Warm Eid wishes to you and your family, with love and gratitude.",
      ar: "أطيب تهاني العيد لكم ولعائلتكم مع المحبة والامتنان."
    }
  }
];

const labels = {
  en: {
    heroBadge: "Personalized Eid al-Fitr Greeting",
    heroTitleA: "Create and share",
    heroTitleB: "a beautiful Eid message",
    heroDescription:
      "Write your sender name, pick a style, optionally add a custom message, then share one personalized link.",
    editorTitle: "Greeting Setup",
    senderName: "Sender name",
    senderPlaceholder: "Enter sender name",
    language: "Language",
    style: "Greeting style",
    customMessage: "Custom message (optional)",
    customPlaceholder: "Leave blank to use the selected style's default message.",
    share: "Share Greeting",
    sharing: "Sharing...",
    copy: "Copy Greeting + Link",
    reset: "Reset",
    shareTitle: "Personalized Eid Mubarak Greeting",
    shareSuccess: "Greeting shared successfully.",
    copySuccess: "Greeting text and personalized link copied.",
    shareFallback:
      "Direct sharing is unavailable here, so the greeting and link were copied instead.",
    copyError: "Sharing and clipboard access are unavailable in this browser.",
    secureHint: "Best experience: mobile browser + HTTPS.",
    previewBadge: "Eid Preview",
    previewSubtitle: "For your family and friends",
    sentBy: "Sent by",
    defaultSender: "Your Name",
    withLove: "With love and duas",
    ad1: "Ad Space 1",
    ad2: "Ad Space 2",
    ad1Description:
      "Google AdSense placeholder. Replace with your real ad unit script/snippet.",
    ad2Description:
      "Sponsored slot for local Eid offers, gifts, sweets, clothing, or perfume.",
    info1: "Monetization ready",
    info1Description:
      "The layout includes ad placeholders where you can add AdSense or sponsored blocks.",
    info2: "Share-first design",
    info2Description:
      "Each shared URL restores language, sender name, message, and selected greeting style."
  },
  ar: {
    heroBadge: "تهنئة عيد الفطر الشخصية",
    heroTitleA: "أنشئ وشارك",
    heroTitleB: "رسالة عيد جميلة",
    heroDescription:
      "اكتب اسم المرسل، اختر النمط، وأضف رسالة مخصصة إن رغبت، ثم شارك رابطًا شخصيًا واحدًا.",
    editorTitle: "إعداد التهنئة",
    senderName: "اسم المرسل",
    senderPlaceholder: "اكتب اسم المرسل",
    language: "اللغة",
    style: "نمط التهنئة",
    customMessage: "رسالة مخصصة (اختيارية)",
    customPlaceholder: "اترك الحقل فارغًا لاستخدام رسالة النمط الافتراضية.",
    share: "مشاركة التهنئة",
    sharing: "جارٍ المشاركة...",
    copy: "نسخ التهنئة + الرابط",
    reset: "إعادة تعيين",
    shareTitle: "تهنئة عيد مبارك شخصية",
    shareSuccess: "تمت مشاركة التهنئة بنجاح.",
    copySuccess: "تم نسخ نص التهنئة والرابط الشخصي.",
    shareFallback:
      "المشاركة المباشرة غير متاحة هنا، لذلك تم نسخ التهنئة والرابط بدلًا من ذلك.",
    copyError: "المشاركة والنسخ غير متاحين في هذا المتصفح.",
    secureHint: "أفضل تجربة: متصفح هاتف + اتصال HTTPS.",
    previewBadge: "معاينة التهنئة",
    previewSubtitle: "إلى أهلك وأصدقائك",
    sentBy: "المرسل",
    defaultSender: "اسمك",
    withLove: "مع المحبة والدعاء",
    ad1: "مساحة إعلانية 1",
    ad2: "مساحة إعلانية 2",
    ad1Description:
      "مكان مخصص لإعلان Google AdSense. استبدله بوحدة الإعلان الحقيقية الخاصة بك.",
    ad2Description:
      "مساحة دعائية لعروض العيد المحلية مثل الهدايا والحلويات والملابس والعطور.",
    info1: "جاهز لتحقيق الدخل",
    info1Description:
      "يحتوي التصميم على أماكن مخصصة يمكنك وضع AdSense أو بطاقات إعلانية مدفوعة فيها.",
    info2: "مصمم للمشاركة",
    info2Description:
      "كل رابط تتم مشاركته يعيد نفس اللغة واسم المرسل والرسالة ونمط التهنئة."
  }
};

const themeIds = new Set(themes.map((theme) => theme.id));

const ornaments = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${6 + index * 7}%`,
  delay: `${(index * 0.16).toFixed(2)}s`,
  duration: `${(3.3 + (index % 4) * 0.35).toFixed(2)}s`
}));

function normalizeLanguage(value) {
  return value === "ar" ? "ar" : DEFAULT_LANGUAGE;
}

function normalizeThemeId(value) {
  return themeIds.has(value) ? value : DEFAULT_THEME_ID;
}

function getInitialStateFromUrl(search) {
  const source =
    search ?? (typeof window !== "undefined" ? window.location.search : "");
  const params = new URLSearchParams(source);

  return {
    language: normalizeLanguage(params.get("lang")),
    senderName: params.get("name")?.trim() ?? "",
    customMessage: params.get("msg")?.trim() ?? "",
    themeId: normalizeThemeId(params.get("style"))
  };
}

function buildPersonalizedUrl(
  { language, senderName, customMessage, themeId },
  baseUrl
) {
  const sourceUrl =
    baseUrl ??
    (typeof window !== "undefined"
      ? window.location.href
      : "https://example.com/");
  const url = new URL(sourceUrl);
  const params = new URLSearchParams();

  params.set("lang", normalizeLanguage(language));
  params.set("name", senderName.trim());
  params.set("msg", customMessage.trim());
  params.set("style", normalizeThemeId(themeId));

  url.search = params.toString();
  return url.toString();
}

function buildFinalMessage(language, senderName, customMessage, theme) {
  const custom = customMessage.trim();
  if (custom) {
    return custom;
  }

  const fromName = senderName.trim();
  const baseText = language === "ar" ? theme.message.ar : theme.message.en;

  if (language === "ar") {
    return `${baseText} من ${fromName || "شخص يقدّرك"}.`;
  }

  return `${baseText} From ${fromName || "someone who cares"}.`;
}

function buildShareText(language, finalMessage) {
  return language === "ar"
    ? `عيد مبارك! ${finalMessage}`
    : `Eid Mubarak! ${finalMessage}`;
}

function buildCopyPayload(shareText, personalizedUrl) {
  return `${shareText}\n${personalizedUrl}`;
}

function canUseNativeShare(payload) {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  if (typeof navigator.share !== "function") {
    return false;
  }

  const secureContextOk =
    window.isSecureContext ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (!secureContextOk) {
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

function isSharePermissionError(error) {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.name === "AbortError" ||
    error.name === "NotAllowedError" ||
    /permission denied/i.test(error.message)
  );
}

function runSelfTests() {
  const parsed = getInitialStateFromUrl("?lang=ar&name=Ali&msg=Hello&style=night");
  if (
    parsed.language !== "ar" ||
    parsed.senderName !== "Ali" ||
    parsed.customMessage !== "Hello" ||
    parsed.themeId !== "night"
  ) {
    throw new Error("URL state parser failed.");
  }

  const shareUrl = buildPersonalizedUrl(
    {
      language: "en",
      senderName: "Mona",
      customMessage: "Warm wishes",
      themeId: "soft"
    },
    "https://example.com/eid"
  );
  if (
    !shareUrl.includes("lang=en") ||
    !shareUrl.includes("name=Mona") ||
    !shareUrl.includes("msg=Warm+wishes") ||
    !shareUrl.includes("style=soft")
  ) {
    throw new Error("Personalized URL builder failed.");
  }

  const payload = buildCopyPayload("Eid Mubarak!", "https://example.com/eid");
  if (!payload.endsWith("\nhttps://example.com/eid")) {
    throw new Error("Copy payload must include greeting text and URL.");
  }
}

runSelfTests();

export default function App() {
  const initialState = useMemo(() => getInitialStateFromUrl(), []);

  const [language, setLanguage] = useState(initialState.language);
  const [senderName, setSenderName] = useState(initialState.senderName);
  const [customMessage, setCustomMessage] = useState(initialState.customMessage);
  const [themeId, setThemeId] = useState(initialState.themeId);
  const [isSharing, setIsSharing] = useState(false);
  const [shareState, setShareState] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const isArabic = language === "ar";
  const ui = labels[language];

  const selectedTheme = useMemo(
    () => themes.find((theme) => theme.id === themeId) ?? themes[0],
    [themeId]
  );

  const finalMessage = useMemo(
    () => buildFinalMessage(language, senderName, customMessage, selectedTheme),
    [language, senderName, customMessage, selectedTheme]
  );

  const shareText = useMemo(
    () => buildShareText(language, finalMessage),
    [language, finalMessage]
  );

  const personalizedUrl = useMemo(
    () => buildPersonalizedUrl({ language, senderName, customMessage, themeId }),
    [language, senderName, customMessage, themeId]
  );

  const copyPayload = useMemo(
    () => buildCopyPayload(shareText, personalizedUrl),
    [shareText, personalizedUrl]
  );

  async function handleCopy() {
    try {
      const copied = await copyToClipboard(copyPayload);
      setShareState(copied ? "copied" : "error");
      setStatusMessage(copied ? ui.copySuccess : ui.copyError);
    } catch {
      setShareState("error");
      setStatusMessage(ui.copyError);
    }
  }

  async function handleShare() {
    if (isSharing) {
      return;
    }

    setIsSharing(true);
    setShareState("idle");
    setStatusMessage("");

    const payload = {
      title: ui.shareTitle,
      text: shareText,
      url: personalizedUrl
    };

    try {
      if (canUseNativeShare(payload)) {
        await navigator.share(payload);
        setShareState("shared");
        setStatusMessage(ui.shareSuccess);
      } else {
        const copied = await copyToClipboard(copyPayload);
        setShareState(copied ? "copied" : "error");
        setStatusMessage(copied ? ui.shareFallback : ui.copyError);
      }
    } catch (error) {
      if (isSharePermissionError(error)) {
        try {
          const copied = await copyToClipboard(copyPayload);
          setShareState(copied ? "copied" : "error");
          setStatusMessage(copied ? ui.shareFallback : ui.copyError);
        } catch {
          setShareState("error");
          setStatusMessage(ui.copyError);
        }
      } else {
        setShareState("error");
        setStatusMessage(error instanceof Error ? error.message : ui.copyError);
      }
    } finally {
      setIsSharing(false);
    }
  }

  function resetForm() {
    setLanguage(DEFAULT_LANGUAGE);
    setSenderName("");
    setCustomMessage("");
    setThemeId(DEFAULT_THEME_ID);
    setShareState("idle");
    setStatusMessage("");
  }

  return (
    <div className="app-shell" dir={isArabic ? "rtl" : "ltr"}>
      <div className="background-stars" />
      <div className="moon-glow" />

      <div className="ornaments" aria-hidden="true">
        {ornaments.map((item) => (
          <span
            key={item.id}
            className="ornament"
            style={{
              left: item.left,
              animationDelay: item.delay,
              animationDuration: item.duration
            }}
          >
            <span className="ornament-line" />
            <span className="ornament-lamp" />
          </span>
        ))}
      </div>

      <main className="layout">
        <section className="panel panel-editor rise-in">
          <div className="badge">{ui.heroBadge}</div>
          <h1 className="hero-title">
            {ui.heroTitleA} <span>{ui.heroTitleB}</span>
          </h1>
          <p className="hero-description">{ui.heroDescription}</p>

          <div className="editor-card">
            <h2>{ui.editorTitle}</h2>

            <div className="form-row">
              <div>
                <label htmlFor="senderName">{ui.senderName}</label>
                <input
                  id="senderName"
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
                value={themeId}
                onChange={(event) => setThemeId(normalizeThemeId(event.target.value))}
              >
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {isArabic ? theme.title.ar : theme.title.en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="customMessage">{ui.customMessage}</label>
              <textarea
                id="customMessage"
                value={customMessage}
                onChange={(event) => setCustomMessage(event.target.value)}
                placeholder={ui.customPlaceholder}
                rows={5}
              />
            </div>

            <div className="button-row">
              <button className="btn" onClick={handleShare} disabled={isSharing}>
                {isSharing ? ui.sharing : ui.share}
              </button>
              <button className="btn secondary" onClick={handleCopy}>
                {ui.copy}
              </button>
              <button className="btn ghost" onClick={resetForm}>
                {ui.reset}
              </button>
            </div>

            <div className="status">
              <span className="status-icon">
                {shareState === "shared" || shareState === "copied"
                  ? "✓"
                  : shareState === "error"
                  ? "⚠"
                  : ""}
              </span>
              <span>{statusMessage || ui.secureHint}</span>
            </div>
          </div>

          <div className="ads-grid">
            <article className="panel ad-card">
              <h3>{ui.ad1}</h3>
              <p>{ui.ad1Description}</p>
              <div className="ad-slot">
                client: ca-pub-xxxxxxxxxxxxxxxx · slot: 1234567890
              </div>
            </article>
            <article className="panel ad-card">
              <h3>{ui.ad2}</h3>
              <p>{ui.ad2Description}</p>
              <div className="ad-slot">
                client: ca-pub-xxxxxxxxxxxxxxxx · slot: 0987654321
              </div>
            </article>
          </div>
        </section>

        <section className="panel panel-preview rise-in delay-2">
          <div className={`preview-card ${selectedTheme.className}`}>
            <div className="preview-inner">
              <div className="preview-badge">{ui.previewBadge}</div>
              <h2 className="preview-title">{isArabic ? "عيد مبارك" : "Eid Mubarak"}</h2>
              <p className="preview-subtitle">{ui.previewSubtitle}</p>

              <div className="message-box">
                <p>{finalMessage}</p>
              </div>

              <div className="preview-footer">
                <div>
                  <small>{ui.sentBy}</small>
                  <div className="sender-name">
                    {senderName.trim() || ui.defaultSender}
                  </div>
                </div>
                <div className="love-pill">{ui.withLove}</div>
              </div>
            </div>
          </div>

          <div className="info-grid">
            <article className="panel info-card">
              <h3>{ui.info1}</h3>
              <p>{ui.info1Description}</p>
            </article>
            <article className="panel info-card">
              <h3>{ui.info2}</h3>
              <p>{ui.info2Description}</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
