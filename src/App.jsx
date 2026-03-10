import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const languages = {
  en: {
    label: "English",
    heroBadge: "Personalized Eid al-Fitr Greeting Page",
    heroTitleA: "Create a beautiful",
    heroTitleB: "Eid Mubarak greeting",
    heroDesc:
      "Let visitors enter their names, preview the greeting in English or Arabic, and instantly share it with relatives and friends.",
    customize: "Customize the greeting",
    senderName: "Sender name",
    senderPlaceholder: "Enter sender name",
    language: "Language",
    greetingStyle: "Greeting style",
    customMessage: "Custom message",
    customPlaceholder:
      "Write your own Eid message or leave blank to use the default design text",
    share: "Share Greeting",
    copy: "Copy Greeting",
    reset: "Reset",
    ad1: "Ad Space 1",
    ad2: "Ad Space 2",
    ad1Desc:
      "Google AdSense banner slot. Replace this block with your AdSense unit.",
    ad2Desc:
      "Sponsored placement for local shops, gifts, clothing, perfumes, desserts, or Eid offers.",
    previewBadge: "Eid al-Fitr Special Greeting",
    to: "For your family and friends",
    sentBy: "Sent by",
    withLove: "With love and duas",
    monetization: "Monetization ready",
    monetizationDesc:
      "Add Google AdSense banners or sponsored cards in the marked ad slots.",
    viral: "Share-friendly",
    viralDesc:
      "Users can personalize their name and send the same greeting to many relatives and friends.",
    shareSuccess: "Greeting shared successfully.",
    copySuccess: "Greeting copied to clipboard.",
    shareFallback:
      "Direct sharing was not allowed on this device, so the greeting was copied instead.",
    copyError: "Sharing and clipboard access are unavailable here.",
    secureHint:
      "Native sharing works best on supported mobile browsers and secure HTTPS pages."
  },
  ar: {
    label: "العربية",
    heroBadge: "صفحة تهنئة عيد الفطر الشخصية",
    heroTitleA: "أنشئ",
    heroTitleB: "تهنئة عيد مبارك جميلة",
    heroDesc:
      "يمكن للزائر كتابة اسمه، ومعاينة التهنئة بالعربية أو الإنجليزية، ثم مشاركتها فورًا مع الأهل والأصدقاء.",
    customize: "تخصيص التهنئة",
    senderName: "اسم المرسل",
    senderPlaceholder: "اكتب اسم المرسل",
    language: "اللغة",
    greetingStyle: "نمط التهنئة",
    customMessage: "رسالة مخصصة",
    customPlaceholder:
      "اكتب رسالتك الخاصة أو اترك الحقل فارغًا لاستخدام النص الافتراضي",
    share: "مشاركة التهنئة",
    copy: "نسخ التهنئة",
    reset: "إعادة تعيين",
    ad1: "مساحة إعلانية 1",
    ad2: "مساحة إعلانية 2",
    ad1Desc:
      "مكان مخصص لإعلان Google AdSense. استبدل هذا القسم بوحدة الإعلان الخاصة بك.",
    ad2Desc:
      "مساحة دعائية للمتاجر المحلية أو عروض العيد أو الهدايا أو العطور أو الحلويات.",
    previewBadge: "تهنئة خاصة بعيد الفطر",
    to: "إلى أهلك وأصدقائك",
    sentBy: "المرسل",
    withLove: "مع المحبة والدعاء",
    monetization: "جاهز لتحقيق الدخل",
    monetizationDesc:
      "أضف وحدات Google AdSense أو بطاقات دعائية في الأماكن المحددة.",
    viral: "سهل المشاركة",
    viralDesc:
      "يمكن للمستخدم كتابة اسمه وإرسال نفس التهنئة إلى عدد كبير من الأقارب والأصدقاء.",
    shareSuccess: "تمت مشاركة التهنئة بنجاح.",
    copySuccess: "تم نسخ التهنئة إلى الحافظة.",
    shareFallback:
      "لم يُسمح بالمشاركة المباشرة على هذا الجهاز، لذلك تم نسخ التهنئة بدلًا من ذلك.",
    copyError: "المشاركة والنسخ غير متاحين هنا.",
    secureHint:
      "تعمل المشاركة المباشرة بشكل أفضل على الهواتف والمتصفحات المدعومة وعبر صفحات HTTPS الآمنة."
  }
};

const templates = [
  {
    id: "classic",
    title: "Classic Gold",
    bg: "theme-classic",
    message:
      "Eid Mubarak! May Allah fill your home with peace, joy, and countless blessings."
  },
  {
    id: "night",
    title: "Moonlight Night",
    bg: "theme-night",
    message:
      "Wishing you and your loved ones a joyful Eid full of happiness, mercy, and beautiful memories."
  },
  {
    id: "soft",
    title: "Soft Celebration",
    bg: "theme-soft",
    message:
      "Sending warm Eid wishes to you and your family. May this Eid bring barakah, love, and ease."
  }
];

const ornaments = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${6 + i * 7}%`,
  delay: i * 0.18,
  duration: 3 + (i % 4)
}));

function buildFinalMessage(language, senderName, customMessage, templateMessage) {
  if (customMessage.trim()) return customMessage.trim();

  return language === "ar"
    ? `عيد مبارك! تقبل الله منا ومنكم، وجعل أيامكم فرحًا وبركة وسعادة. من ${senderName || "شخص يقدركم"}.`
    : `${templateMessage} From ${senderName || "someone who cares"}.`;
}

function buildShareText(language, finalMessage) {
  return language === "ar"
    ? `عيد مبارك! ${finalMessage}`
    : `Eid Mubarak! ${finalMessage}`;
}

function canUseNativeShare(payload) {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return false;
  }

  if (typeof navigator.share !== "function") {
    return false;
  }

  const secureOk = window.isSecureContext || window.location.hostname === "localhost";
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
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const success = document.execCommand("copy");
  document.body.removeChild(textarea);
  return success;
}

function isPermissionStyleShareError(error) {
  return (
    error instanceof Error &&
    (error.name === "NotAllowedError" ||
      error.name === "AbortError" ||
      /permission denied/i.test(error.message))
  );
}

function runSelfTests() {
  const english = buildFinalMessage("en", "Musab", "", "Blessed Eid wishes.");
  if (!english.includes("Musab")) {
    throw new Error("English final message should include sender name.");
  }

  const arabic = buildFinalMessage("ar", "مصعب", "", "ignored");
  if (!arabic.includes("مصعب")) {
    throw new Error("Arabic final message should include sender name.");
  }

  const custom = buildFinalMessage("en", "", "Custom Eid text", "ignored");
  if (custom !== "Custom Eid text") {
    throw new Error("Custom message should take priority.");
  }

  const shareText = buildShareText("en", "Hello");
  if (!shareText.startsWith("Eid Mubarak!")) {
    throw new Error("English share text prefix is wrong.");
  }
}

runSelfTests();

export default function App() {
  const [language, setLanguage] = useState("en");
  const [senderName, setSenderName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [templateId, setTemplateId] = useState("classic");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareState, setShareState] = useState("idle");

  const selected = useMemo(
    () => templates.find((t) => t.id === templateId) ?? templates[0],
    [templateId]
  );

  const ui = languages[language];
  const isArabic = language === "ar";

  const finalMessage = buildFinalMessage(
    language,
    senderName,
    customMessage,
    selected.message
  );

  const shareText = buildShareText(language, finalMessage);

  const handleCopy = async () => {
    try {
      const copied = await copyToClipboard(shareText);
      setShareState(copied ? "copied" : "error");
      setStatusMessage(copied ? ui.copySuccess : ui.copyError);
    } catch {
      setShareState("error");
      setStatusMessage(ui.copyError);
    }
  };

  const handleShare = async () => {
    if (isSharing) return;

    setIsSharing(true);
    setShareState("idle");
    setStatusMessage("");

    const payload = {
      title:
        language === "ar"
          ? "تهنئة عيد مبارك شخصية"
          : "Personalized Eid Mubarak Greeting",
      text: shareText,
      url: window.location.href
    };

    try {
      if (canUseNativeShare(payload)) {
        await navigator.share(payload);
        setShareState("shared");
        setStatusMessage(ui.shareSuccess);
      } else {
        const copied = await copyToClipboard(shareText);
        setShareState(copied ? "copied" : "error");
        setStatusMessage(copied ? ui.shareFallback : ui.copyError);
      }
    } catch (error) {
      if (isPermissionStyleShareError(error)) {
        try {
          const copied = await copyToClipboard(shareText);
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
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="page-shell">
      <div className="page-glow" />

      {ornaments.map((item) => (
        <motion.div
          key={item.id}
          className="ornament"
          style={{ left: item.left }}
          animate={{ y: [0, 10, 0], rotate: [0, 2, -2, 0] }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="ornament-line" />
          <div className="ornament-dot" />
        </motion.div>
      ))}

      <section className="container">
        <div className="grid">
          <div className="left-panel">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="badge">{ui.heroBadge}</div>
              <h1 className="hero-title">
                {ui.heroTitleA} <span>{ui.heroTitleB}</span>
              </h1>
              <p className="hero-desc">{ui.heroDesc}</p>
            </motion.div>

            <div className="card editor-card">
              <h2>{ui.customize}</h2>

              <div className="form-grid">
                <div>
                  <label>{ui.senderName}</label>
                  <input
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder={ui.senderPlaceholder}
                  />
                </div>

                <div>
                  <label>{ui.language}</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>
              </div>

              <div>
                <label>{ui.greetingStyle}</label>
                <select
                  value={templateId}
                  onChange={(e) => setTemplateId(e.target.value)}
                >
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>{ui.customMessage}</label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder={ui.customPlaceholder}
                  rows={5}
                />
              </div>

              <div className="button-row">
                <button onClick={handleShare} disabled={isSharing}>
                  {isSharing ? "..." : ui.share}
                </button>
                <button className="secondary" onClick={handleCopy}>
                  {ui.copy}
                </button>
                <button
                  className="ghost"
                  onClick={() => {
                    setSenderName("");
                    setCustomMessage("");
                    setTemplateId("classic");
                    setLanguage("en");
                    setShareState("idle");
                    setStatusMessage("");
                  }}
                >
                  {ui.reset}
                </button>
              </div>

              <div className="status-box">
                <strong>
                  {shareState === "shared"
                    ? "✓ "
                    : shareState === "copied"
                    ? "✓ "
                    : shareState === "error"
                    ? "⚠ "
                    : ""}
                </strong>
                {statusMessage || ui.secureHint}
              </div>
            </div>

            <div className="ads-grid">
              <div className="card">
                <h3>{ui.ad1}</h3>
                <p>{ui.ad1Desc}</p>
                <div className="ad-slot">client: ca-pub-xxxxxxxxxxxxxxxx · slot: 1234567890</div>
              </div>

              <div className="card">
                <h3>{ui.ad2}</h3>
                <p>{ui.ad2Desc}</p>
                <div className="ad-slot">client: ca-pub-xxxxxxxxxxxxxxxx · slot: 0987654321</div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="right-panel"
          >
            <div className={`preview-card ${selected.bg}`}>
              <div className="preview-inner">
                <div className="preview-badge">{ui.previewBadge}</div>
                <h2 className="preview-title">
                  {language === "ar" ? "عيد مبارك" : "Eid Mubarak"}
                </h2>
                <p className="preview-subtitle">{ui.to}</p>

                <div className="message-box">
                  <p>{finalMessage}</p>
                </div>

                <div className="preview-footer">
                  <div>
                    <small>{ui.sentBy}</small>
                    <div className="sender-name">
                      {senderName || (language === "ar" ? "اسمك" : "Your Name")}
                    </div>
                  </div>
                  <div className="love-pill">{ui.withLove}</div>
                </div>
              </div>
            </div>

            <div className="info-grid">
              <div className="card">
                <h3>{ui.monetization}</h3>
                <p>{ui.monetizationDesc}</p>
              </div>
              <div className="card">
                <h3>{ui.viral}</h3>
                <p>{ui.viralDesc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}