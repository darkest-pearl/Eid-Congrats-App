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

const greetingLanterns = [
  { id: 1, left: "5%", delay: "0s", duration: "15.2s", size: 0.86, chain: 132, accent: "emerald" },
  { id: 2, left: "19%", delay: "0.9s", duration: "14.6s", size: 1, chain: 156, accent: "ivory" },
  { id: 3, left: "36%", delay: "0.2s", duration: "16s", size: 1.26, chain: 184, accent: "gold" },
  { id: 4, left: "54%", delay: "1.1s", duration: "14.9s", size: 1.08, chain: 144, accent: "emerald" },
  { id: 5, left: "74%", delay: "0.5s", duration: "15.6s", size: 1.18, chain: 170, accent: "gold" },
  { id: 6, left: "91%", delay: "1.4s", duration: "14.2s", size: 0.9, chain: 138, accent: "ivory" }
];

const greetingStars = [
  { id: 1, top: "11%", left: "11%", delay: "0s", duration: "5.8s", size: "14px", variant: "cross" },
  { id: 2, top: "16%", left: "28%", delay: "1.5s", duration: "6.9s", size: "10px", variant: "diamond" },
  { id: 3, top: "14%", left: "58%", delay: "0.6s", duration: "6.2s", size: "12px", variant: "cross" },
  { id: 4, top: "10%", left: "81%", delay: "2.4s", duration: "7.1s", size: "9px", variant: "diamond" },
  { id: 5, top: "28%", left: "15%", delay: "1.2s", duration: "6.4s", size: "11px", variant: "diamond" },
  { id: 6, top: "31%", left: "73%", delay: "0.8s", duration: "5.7s", size: "13px", variant: "cross" },
  { id: 7, top: "42%", left: "8%", delay: "2.1s", duration: "6.8s", size: "8px", variant: "cross" },
  { id: 8, top: "45%", left: "88%", delay: "1.7s", duration: "7.3s", size: "10px", variant: "diamond" },
  { id: 9, top: "54%", left: "22%", delay: "0.3s", duration: "6.1s", size: "9px", variant: "cross" },
  { id: 10, top: "58%", left: "66%", delay: "2.7s", duration: "6.6s", size: "12px", variant: "diamond" },
  { id: 11, top: "72%", left: "14%", delay: "1.3s", duration: "5.9s", size: "11px", variant: "cross" },
  { id: 12, top: "76%", left: "80%", delay: "2.2s", duration: "6.7s", size: "8px", variant: "cross" }
];

const greetingParticles = [
  { id: 1, top: "22%", left: "38%", delay: "0s", duration: "12.4s", size: "6px" },
  { id: 2, top: "30%", left: "61%", delay: "1.5s", duration: "13.1s", size: "4px" },
  { id: 3, top: "37%", left: "27%", delay: "0.8s", duration: "11.9s", size: "5px" },
  { id: 4, top: "46%", left: "73%", delay: "2.4s", duration: "12.7s", size: "7px" },
  { id: 5, top: "55%", left: "44%", delay: "1.2s", duration: "13.5s", size: "5px" },
  { id: 6, top: "63%", left: "18%", delay: "3.1s", duration: "12.2s", size: "4px" },
  { id: 7, top: "68%", left: "57%", delay: "2s", duration: "13.8s", size: "6px" },
  { id: 8, top: "78%", left: "34%", delay: "1.1s", duration: "12.6s", size: "5px" },
  { id: 9, top: "81%", left: "70%", delay: "2.8s", duration: "14s", size: "4px" },
  { id: 10, top: "87%", left: "52%", delay: "0.5s", duration: "13.2s", size: "6px" }
];

const greetingSparkles = [
  { id: 1, top: "12%", left: "18%", delay: "0s", duration: "7.8s", size: "16px", tone: "gold" },
  {
    id: 2,
    top: "10%",
    left: "68%",
    delay: "0.9s",
    duration: "21.2s",
    scale: 1.08,
    direction: "left",
    banner: "كل عام وأنتم بخير",
    lang: "ar",
    ribbon: "ivory"
  },
  {
    id: 3,
    top: "18%",
    left: "17%",
    delay: "2.1s",
    duration: "18.8s",
    scale: 0.78,
    direction: "right",
    ribbon: "emerald"
  }
];

const greetingConfetti = [
  { id: 1, top: "18%", left: "31%", delay: "0s", duration: "9.8s", size: "10px", tone: "gold" },
  { id: 2, top: "24%", left: "67%", delay: "1.2s", duration: "10.6s", size: "8px", tone: "ivory" },
  { id: 3, top: "34%", left: "15%", delay: "2.1s", duration: "9.4s", size: "7px", tone: "emerald" },
  { id: 4, top: "39%", left: "82%", delay: "0.7s", duration: "10.2s", size: "9px", tone: "gold" },
  { id: 5, top: "51%", left: "24%", delay: "1.8s", duration: "11s", size: "8px", tone: "ivory" },
  { id: 6, top: "57%", left: "76%", delay: "2.5s", duration: "10.8s", size: "10px", tone: "gold" },
  { id: 7, top: "68%", left: "42%", delay: "0.4s", duration: "9.9s", size: "7px", tone: "emerald" },
  { id: 8, top: "74%", left: "61%", delay: "2.7s", duration: "10.4s", size: "8px", tone: "ivory" }
];

const greetingFireworks = [
  { id: 1, top: "16%", left: "32%", delay: "0s", duration: "8.6s", size: "160px" },
  { id: 2, top: "18%", left: "78%", delay: "2.2s", duration: "9.1s", size: "140px" },
  { id: 3, top: "24%", left: "54%", delay: "4.2s", duration: "10.4s", size: "120px" }
];

const greetingCelebrationSparkles = [
  { id: 1, top: "12%", left: "18%", delay: "0s", duration: "7.8s", size: "16px", tone: "gold" },
  { id: 2, top: "15%", left: "33%", delay: "0.8s", duration: "8.5s", size: "12px", tone: "ivory" },
  { id: 3, top: "13%", left: "57%", delay: "1.7s", duration: "9.2s", size: "14px", tone: "emerald" },
  { id: 4, top: "16%", left: "76%", delay: "2.3s", duration: "8.8s", size: "11px", tone: "gold" },
  { id: 5, top: "24%", left: "26%", delay: "1.2s", duration: "9.4s", size: "10px", tone: "gold" },
  { id: 6, top: "27%", left: "48%", delay: "2.6s", duration: "8.1s", size: "13px", tone: "ivory" },
  { id: 7, top: "25%", left: "69%", delay: "0.5s", duration: "8.9s", size: "12px", tone: "emerald" },
  { id: 8, top: "34%", left: "15%", delay: "2.1s", duration: "9.7s", size: "9px", tone: "ivory" },
  { id: 9, top: "36%", left: "84%", delay: "1.4s", duration: "8.7s", size: "10px", tone: "gold" },
  { id: 10, top: "45%", left: "39%", delay: "3s", duration: "9.6s", size: "8px", tone: "emerald" }
];

const greetingCelebrationFireworks = [
  { id: 1, top: "11%", left: "16%", delay: "0.12s", cycle: "12.8s", size: "236px", tone: "gold", tilt: "-12deg" },
  { id: 2, top: "8%", left: "37%", delay: "0.46s", cycle: "12.8s", size: "208px", tone: "ivory", tilt: "9deg" },
  { id: 3, top: "13%", left: "74%", delay: "0.82s", cycle: "12.8s", size: "224px", tone: "emerald", tilt: "-7deg" },
  { id: 4, top: "18%", left: "24%", delay: "1.58s", cycle: "12.8s", size: "186px", tone: "ivory", tilt: "12deg" },
  { id: 5, top: "14%", left: "54%", delay: "1.94s", cycle: "12.8s", size: "216px", tone: "gold", tilt: "-10deg" },
  { id: 6, top: "20%", left: "84%", delay: "2.28s", cycle: "12.8s", size: "176px", tone: "gold", tilt: "7deg" },
  { id: 7, top: "26%", left: "13%", delay: "5.1s", cycle: "12.8s", size: "152px", tone: "emerald", tilt: "-13deg" },
  { id: 8, top: "23%", left: "44%", delay: "7.35s", cycle: "12.8s", size: "164px", tone: "ivory", tilt: "10deg" },
  { id: 9, top: "27%", left: "68%", delay: "9.62s", cycle: "12.8s", size: "148px", tone: "gold", tilt: "-8deg" },
  { id: 10, top: "17%", left: "91%", delay: "11.18s", cycle: "12.8s", size: "138px", tone: "emerald", tilt: "8deg" }
];

const greetingCelebrationFountainParticles = [
  {
    id: 1,
    kind: "dot",
    tone: "gold",
    size: "10px",
    midX: "30px",
    midY: "-82px",
    x: "82px",
    y: "-194px",
    drift: "14px",
    delay: "0.18s",
    duration: "12.6s",
    rotate: "14deg",
    startRotate: "-24deg",
    scale: "0.94"
  },
  {
    id: 2,
    kind: "star",
    tone: "ivory",
    size: "14px",
    midX: "44px",
    midY: "-118px",
    x: "104px",
    y: "-266px",
    drift: "20px",
    delay: "0.48s",
    duration: "12.6s",
    rotate: "-12deg",
    startRotate: "-30deg",
    scale: "1.12"
  },
  {
    id: 3,
    kind: "streak",
    tone: "gold",
    size: "7px",
    midX: "52px",
    midY: "-104px",
    x: "124px",
    y: "-234px",
    drift: "24px",
    delay: "0.78s",
    duration: "12.6s",
    rotate: "18deg",
    startRotate: "-32deg",
    scale: "1.06"
  },
  {
    id: 4,
    kind: "confetti",
    tone: "emerald",
    size: "9px",
    midX: "68px",
    midY: "-92px",
    x: "158px",
    y: "-218px",
    drift: "30px",
    delay: "1.08s",
    duration: "12.6s",
    rotate: "24deg",
    startRotate: "-18deg",
    scale: "1"
  },
  {
    id: 5,
    kind: "dot",
    tone: "ivory",
    size: "8px",
    midX: "36px",
    midY: "-90px",
    x: "94px",
    y: "-212px",
    drift: "18px",
    delay: "4.46s",
    duration: "12.6s",
    rotate: "-8deg",
    startRotate: "-22deg",
    scale: "0.88"
  },
  {
    id: 6,
    kind: "ribbon",
    tone: "gold",
    size: "10px",
    midX: "58px",
    midY: "-126px",
    x: "138px",
    y: "-286px",
    drift: "28px",
    delay: "4.74s",
    duration: "12.6s",
    rotate: "12deg",
    startRotate: "-28deg",
    scale: "1.08"
  },
  {
    id: 7,
    kind: "star",
    tone: "gold",
    size: "12px",
    midX: "70px",
    midY: "-146px",
    x: "168px",
    y: "-318px",
    drift: "34px",
    delay: "5.02s",
    duration: "12.6s",
    rotate: "-20deg",
    startRotate: "-36deg",
    scale: "1.16"
  },
  {
    id: 8,
    kind: "confetti",
    tone: "ivory",
    size: "8px",
    midX: "48px",
    midY: "-112px",
    x: "116px",
    y: "-254px",
    drift: "22px",
    delay: "5.34s",
    duration: "12.6s",
    rotate: "28deg",
    startRotate: "-16deg",
    scale: "0.96"
  },
  {
    id: 9,
    kind: "dot",
    tone: "gold",
    size: "9px",
    midX: "34px",
    midY: "-86px",
    x: "88px",
    y: "-202px",
    drift: "16px",
    delay: "8.84s",
    duration: "12.6s",
    rotate: "10deg",
    startRotate: "-24deg",
    scale: "0.9"
  },
  {
    id: 10,
    kind: "streak",
    tone: "ivory",
    size: "6px",
    midX: "62px",
    midY: "-118px",
    x: "146px",
    y: "-274px",
    drift: "24px",
    delay: "9.1s",
    duration: "12.6s",
    rotate: "-18deg",
    startRotate: "-30deg",
    scale: "1"
  },
  {
    id: 11,
    kind: "star",
    tone: "emerald",
    size: "11px",
    midX: "74px",
    midY: "-136px",
    x: "174px",
    y: "-296px",
    drift: "32px",
    delay: "9.42s",
    duration: "12.6s",
    rotate: "18deg",
    startRotate: "-18deg",
    scale: "1.04"
  },
  {
    id: 12,
    kind: "ribbon",
    tone: "gold",
    size: "9px",
    midX: "54px",
    midY: "-106px",
    x: "132px",
    y: "-236px",
    drift: "26px",
    delay: "9.72s",
    duration: "12.6s",
    rotate: "30deg",
    startRotate: "-14deg",
    scale: "0.96"
  }
];

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

function GreetingBird({ className = "" }) {
  return (
    <span className={`greeting-bird ${className}`.trim()}>
      <svg
        className="greeting-bird-svg"
        viewBox="0 0 168 108"
        aria-hidden="true"
        focusable="false"
      >
        <g className="greeting-bird-back-wing">
          <path
            className="greeting-bird-wing-shape wing-back-main"
            d="M74 56 C57 34 39 22 19 21 C13 22 10 27 12 32 C20 46 38 58 61 66 C69 69 76 65 74 56 Z"
          />
          <path
            className="greeting-bird-wing-mark wing-back-mark"
            d="M63 51 C50 39 35 31 22 29 C31 40 44 50 58 57"
          />
        </g>
        <g className="greeting-bird-body-group">
          <path
            className="greeting-bird-tail-shape tail-upper"
            d="M55 66 C40 65 27 68 12 77 C18 66 29 58 45 56 Z"
          />
          <path
            className="greeting-bird-tail-shape tail-lower"
            d="M57 68 C43 72 30 79 16 92 C20 79 29 69 46 61 Z"
          />
          <path
            className="greeting-bird-body-shape"
            d="M57 62 C66 49 84 43 105 46 C120 48 132 56 138 65 C129 70 118 72 109 71 C102 80 91 85 79 83 C66 81 55 73 52 64 C51 61 53 59 57 62 Z"
          />
          <path
            className="greeting-bird-belly-shape"
            d="M64 64 C75 56 91 54 107 57 C100 66 88 71 74 70 C69 69 66 67 64 64 Z"
          />
          <path
            className="greeting-bird-neck-shine"
            d="M101 49 C111 50 118 54 123 60 C117 58 111 56 104 57 C102 54 101 52 101 49 Z"
          />
          <path
            className="greeting-bird-head-shape"
            d="M118 45 C128 43 137 49 139 58 C141 66 132 73 122 70 C115 68 111 59 114 51 C115 48 116 46 118 45 Z"
          />
          <path className="greeting-bird-eye" d="M126 55 C128 54 130 55 130 57 C129 59 127 60 125 59 C124 57 124 56 126 55 Z" />
          <path className="greeting-bird-beak-shape" d="M138 55 L154 51 L141 63 Z" />
        </g>
        <g className="greeting-bird-front-wing">
          <path
            className="greeting-bird-wing-shape wing-front-main"
            d="M87 61 C74 32 52 15 27 12 C23 12 21 15 22 19 C29 35 45 56 72 74 C84 81 96 76 87 61 Z"
          />
          <path
            className="greeting-bird-wing-mark wing-front-mark"
            d="M77 59 C64 40 48 28 32 24 C41 39 56 52 71 65"
          />
        </g>
      </svg>
    </span>
  );
}

function GreetingBirdGroup({ side, bannerText, accent }) {
  return (
    <div className={`greeting-bird-group bird-group-${side}`} aria-hidden="true">
      <div className="greeting-bird-path">
        <div className="greeting-bird-formation">
          <span className="greeting-flight-aura" />
          <span className="greeting-banner-trails">
            <span className={`greeting-banner-trail tone-${accent} trail-main`} />
            <span className={`greeting-banner-trail tone-${accent} trail-accent`} />
          </span>
          <span className={`greeting-banner-rig banner-${accent}`}>
            <span className="greeting-banner-tail tail-start" />
            <span className="greeting-banner-tail tail-end" />
            <span className="greeting-banner-ornament ornament-start" />
            <span className="greeting-banner-ornament ornament-end" />
            <span className="greeting-banner-spark spark-one" />
            <span className="greeting-banner-spark spark-two" />
            <span className="greeting-banner-text" dir="rtl" lang="ar">
              {bannerText}
            </span>
          </span>
          <span className={`greeting-banner-link tone-${accent}`}>
            <span className="greeting-banner-cord cord-top" />
            <span className="greeting-banner-cord cord-bottom" />
            <span className="greeting-banner-clasp" />
          </span>
          <GreetingBird className="greeting-bird-hero" />
          <span className="greeting-bird-escort escort-one">
            <GreetingBird />
          </span>
          <span className="greeting-bird-escort escort-two">
            <GreetingBird />
          </span>
        </div>
      </div>
    </div>
  );
}

function GreetingCelebrationFountain({ side }) {
  return (
    <div className={`greeting-corner-burst greeting-corner-burst-${side}`} aria-hidden="true">
      <span className="greeting-corner-anchor-glow" />
      <span className="greeting-corner-anchor" />
      <span className="greeting-corner-burst-haze" />
      <div className="greeting-corner-burst-stream">
        {greetingCelebrationFountainParticles.map((particle) => (
          <span
            key={`${side}-${particle.id}`}
            className={`greeting-fountain-particle kind-${particle.kind} tone-${particle.tone}`}
            style={{
              "--burst-size": particle.size,
              "--burst-mid-x": particle.midX,
              "--burst-mid-y": particle.midY,
              "--burst-x": particle.x,
              "--burst-y": particle.y,
              "--burst-drift": particle.drift,
              "--burst-delay": particle.delay,
              "--burst-duration": particle.duration,
              "--burst-rotate": particle.rotate,
              "--burst-start-rotate": particle.startRotate,
              "--burst-scale": particle.scale
            }}
          />
        ))}
      </div>
    </div>
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
  const displayName = senderName.trim() || ui.defaultSender;

  return (
    <main className={`greeting-layout ${selectedStyle.className}`}>
      <div className="greeting-scene" aria-hidden="true">
        <div className="greeting-vignette" />
        <div className="greeting-noor greeting-noor-a" />
        <div className="greeting-noor greeting-noor-b" />
        <div className="greeting-fireworks-layer">
          {greetingCelebrationFireworks.map((firework) => (
            <span
              key={firework.id}
              className={`greeting-firework tone-${firework.tone}`}
              style={{
                top: firework.top,
                left: firework.left,
                "--firework-delay": firework.delay,
                "--firework-cycle": firework.cycle,
                "--firework-size": firework.size,
                "--firework-tilt": firework.tilt
              }}
            >
              <span className="greeting-firework-burst" />
              <span className="greeting-firework-ring" />
              <span className="greeting-firework-sparks" />
              <span className="greeting-firework-halo" />
            </span>
          ))}
        </div>
        <div className="greeting-pattern-grid" />
        <div className="greeting-pattern-rings" />
        <div className="greeting-crescent-cluster">
          <span className="greeting-crescent-halo" />
          <span className="greeting-crescent-ring ring-one" />
          <span className="greeting-crescent-ring ring-two" />
          <span className="greeting-crescent-ring ring-three" />
          <span className="greeting-crescent-moon" />
          <span className="greeting-crescent-star" />
        </div>
        <div className="greeting-stars">
          {greetingStars.map((star) => (
            <span
              key={star.id}
              className={`greeting-star ${star.variant}`}
              style={{
                top: star.top,
                left: star.left,
                animationDelay: star.delay,
                animationDuration: star.duration,
                width: star.size,
                height: star.size
              }}
            />
          ))}
        </div>
        <div className="greeting-particles">
          {greetingParticles.map((particle) => (
            <span
              key={particle.id}
              className="greeting-particle"
              style={{
                top: particle.top,
                left: particle.left,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                width: particle.size,
                height: particle.size
              }}
            />
          ))}
        </div>
        <div className="greeting-sparkle-layer">
          {greetingCelebrationSparkles.map((piece) => (
            <span
              key={piece.id}
              className={`greeting-sparkle tone-${piece.tone}`}
              style={{
                top: piece.top,
                left: piece.left,
                animationDelay: piece.delay,
                animationDuration: piece.duration,
                width: piece.size,
                height: piece.size
              }}
            />
          ))}
        </div>
        <div className="greeting-corner-bursts" aria-hidden="true">
          <GreetingCelebrationFountain side="left" />
          <GreetingCelebrationFountain side="right" />
        </div>
        <div className="greeting-bird-groups">
          <GreetingBirdGroup side="left" bannerText="عيد مبارك" accent="gold" />
          <GreetingBirdGroup side="right" bannerText="كل عام وأنتم بخير" accent="emerald" />
        </div>
        <div className="greeting-lanterns">
          <div className="greeting-lantern-rail" />
          {greetingLanterns.map((lantern) => (
            <span
              key={lantern.id}
              className={`greeting-lantern lantern-${lantern.accent}`}
              style={{
                left: lantern.left,
                animationDelay: lantern.delay,
                animationDuration: lantern.duration,
                "--lantern-scale": lantern.size,
                "--chain-size": `${lantern.chain}px`
              }}
            >
              <span className="greeting-lantern-line" />
              <span className="greeting-lantern-halo" />
              <span className="greeting-lantern-body">
                <span className="greeting-lantern-cap" />
                <span className="greeting-lantern-core" />
                <span className="greeting-lantern-cutout" />
              </span>
            </span>
          ))}
        </div>
        <div className="greeting-floor-glow" />
        <div className="greeting-silhouette" />
      </div>

      <section className="greeting-stage">
        <div className="greeting-stage-glow greeting-stage-glow-left" aria-hidden="true" />
        <div className="greeting-stage-glow greeting-stage-glow-right" aria-hidden="true" />
        <div className="greeting-stage-floor" aria-hidden="true" />

        <div className="greeting-arch">
          <div className="greeting-arch-layer arch-outer" aria-hidden="true" />
          <div className="greeting-arch-layer arch-middle" aria-hidden="true" />
          <div className="greeting-arch-layer arch-inner" aria-hidden="true" />
          <div className="greeting-arch-columns" aria-hidden="true">
            <span className="arch-column arch-column-left" />
            <span className="arch-column arch-column-right" />
          </div>
          <div className="greeting-arch-ornaments" aria-hidden="true">
            <span className="arch-ornament arch-ornament-left" />
            <span className="arch-ornament arch-ornament-right" />
          </div>
          <div className="greeting-corners" aria-hidden="true">
            <span className="corner corner-tl" />
            <span className="corner corner-tr" />
            <span className="corner corner-bl" />
            <span className="corner corner-br" />
          </div>
          <div className="greeting-plaque-glow" aria-hidden="true" />

          <div className="greeting-card">
            <div className="greeting-card-inner">
              <div className="greeting-top-row">
                <span className="greeting-top-line" aria-hidden="true" />
                <div className="pill greeting-scene-pill">{ui.greetingBadge}</div>
                <span className="greeting-top-line" aria-hidden="true" />
              </div>

              <div className="greeting-headline">
                <h1 className="greeting-title">{isArabic ? "عيد مبارك" : "Eid Mubarak"}</h1>
                <div className="greeting-title-mark" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="greeting-subtitle">{ui.greetingSubtitle}</p>
              </div>

              <div className="greeting-message" role="note" aria-live="polite">
                <div className="greeting-message-glow" aria-hidden="true" />
                <div className="greeting-message-frame" aria-hidden="true" />
                <p>{greetingMessage}</p>
              </div>

              <div className="from-area">
                <small>{ui.fromLabel}</small>
                <div className="from-name-wrap">
                  <span className="from-name-mark" aria-hidden="true" />
                  <div className="from-name">{displayName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="greeting-cta-wrap">
        <a className="cta-link" href={creatorUrl}>
          {ui.ctaCreateOwn}
        </a>
      </div>
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
    <div
      className={`app-shell ${initial.hasGreetingParams ? "mode-greeting" : "mode-creator"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
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
