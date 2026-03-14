import { useEffect, useMemo, useRef, useState } from "react";
import { generateRandomEidMessage } from "./lib/messageGenerator";
import AdSlot from "./components/AdSlot";
import CreatorSupportMenu from "./components/CreatorSupportMenu";
import SupportPageView from "./components/SupportPageView";
import { siteConfig } from "./config/siteConfig";
import { siteContent } from "./content/siteContent";
import { supportContent } from "./content/supportContent";

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
    previewLink: "Shareable Link",
    share: "Share Link",
    sharing: "Sharing...",
    copyLink: "Copy Message + Link",
    reset: "Reset",
    shareTitle: "Eid Mubarak Greeting",
    shareSuccess: "Personalized message and link shared successfully.",
    copySuccess: "Personalized message and link copied.",
    shareFallback: "Native sharing is not supported in this browser. Personalized message and link copied instead.",
    shareFallbackNoClipboard:
      "Native sharing is not supported in this browser, and clipboard copying is unavailable.",
    shareInsecureFallback:
      "Native sharing requires HTTPS or another secure context. Open this page over HTTPS to use the mobile share sheet. Your personalized message and link were copied instead.",
    shareInsecureNoClipboard:
      "Native sharing requires HTTPS or another secure context, and clipboard copying is unavailable in this browser.",
    shareDeniedFallback:
      "The share sheet could not be completed. Personalized message and link copied instead.",
    shareDeniedNoClipboard:
      "The share sheet could not be completed, and clipboard copying is unavailable in this browser.",
    copyError: "Clipboard is unavailable in this browser.",
    shareHelperNote: "Native sharing works on supported mobile browsers over HTTPS.",
    helperHint:
      "Only the personalized URL is shared. Recipients see a full Eid greeting page.",
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
    previewLink: "رابط المشاركة",
    share: "مشاركة الرابط",
    sharing: "جارٍ المشاركة...",
    copyLink: "نسخ الرسالة مع الرابط",
    reset: "إعادة تعيين",
    shareTitle: "تهنئة عيد مبارك",
    shareSuccess: "تمت مشاركة الرسالة والرابط الشخصي بنجاح.",
    copySuccess: "تم نسخ الرسالة مع الرابط.",
    shareFallback: "المشاركة المباشرة غير مدعومة في هذا المتصفح. تم نسخ الرسالة مع الرابط بدلًا من ذلك.",
    shareFallbackNoClipboard:
      "المشاركة المباشرة غير مدعومة في هذا المتصفح، كما أن النسخ إلى الحافظة غير متاح.",
    shareInsecureFallback:
      "المشاركة المباشرة تتطلب HTTPS أو سياقًا آمنًا. افتح هذه الصفحة عبر HTTPS لاستخدام لوحة المشاركة، وقد تم نسخ الرسالة مع الرابط بدلًا من ذلك.",
    shareInsecureNoClipboard:
      "المشاركة المباشرة تتطلب HTTPS أو سياقًا آمنًا، كما أن النسخ إلى الحافظة غير متاح في هذا المتصفح.",
    shareDeniedFallback:
      "تعذر إكمال لوحة المشاركة. تم نسخ الرسالة مع الرابط بدلًا من ذلك.",
    shareDeniedNoClipboard:
      "تعذر إكمال لوحة المشاركة، كما أن النسخ إلى الحافظة غير متاح في هذا المتصفح.",
    copyError: "لا يمكن الوصول إلى الحافظة في هذا المتصفح.",
    shareHelperNote: "تعمل المشاركة المباشرة على متصفحات الجوال المدعومة عبر HTTPS.",
    helperHint:
      "تتم مشاركة الرابط الشخصي فقط. المستلم يرى صفحة تهنئة عيد كاملة.",
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

copy.en.generateMessage = "Generate Message";
copy.en.generateMessageHint = "Generate a meaningful Eid message instantly";
copy.ar.generateMessage = "توليد رسالة";
copy.ar.generateMessageHint = "ولّد رسالة عيد جميلة فورًا";

copy.en.recipientName = "Recipient or group name";
copy.en.recipientPlaceholder = "Person or group name";
copy.en.recipientLineLabel = "For";
copy.ar.recipientName =
  "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u0644\u0645 \u0623\u0648 \u0627\u0633\u0645 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629";
copy.ar.recipientPlaceholder = "\u0627\u0633\u0645 \u0634\u062e\u0635 \u0623\u0648 \u0645\u062c\u0645\u0648\u0639\u0629";
copy.ar.recipientLineLabel = "\u0625\u0644\u0649";

const styleIds = new Set(styleOptions.map((style) => style.id));
const HOME_PATH = "/";
const pagePaths = {
  wishes: "/eid-wishes",
  guide: "/send-eid-greetings-online",
  messages: "/eid-messages-family-friends",
  faq: "/faq",
  about: "/about",
  privacy: "/privacy",
  contact: "/contact"
};
const pagePathEntries = Object.entries(pagePaths);
const footerPageIds = ["wishes", "guide", "messages", "faq", "about", "privacy", "contact"];
const supportPageIds = new Set(footerPageIds);

const lamps = Array.from({ length: 11 }, (_, index) => ({
  id: index,
  left: `${5 + index * 8.3}%`,
  delay: `${(index * 0.17).toFixed(2)}s`,
  duration: `${(3.5 + (index % 4) * 0.35).toFixed(2)}s`
}));

const greetingLanterns = [
  { id: 1, left: "5%", delay: "0s", duration: "15.2s", size: 0.86, chain: 132, accent: "emerald" },
  { id: 2, left: "19%", delay: "0.9s", duration: "14.6s", size: 1, chain: 156, accent: "ivory" },
  { id: 3, left: "36%", delay: "0.2s", duration: "16s", size: 1.26, chain: 164, accent: "gold" },
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

function createCelebrationParticle(
  id,
  kind,
  tone,
  size,
  midX,
  midY,
  x,
  y,
  drift,
  delay,
  duration,
  rotate,
  startRotate,
  scale
) {
  return {
    id,
    kind,
    tone,
    size,
    midX,
    midY,
    x,
    y,
    drift,
    delay,
    duration,
    rotate,
    startRotate,
    scale
  };
}

const greetingCelebrationSparkles = [
  { id: 1, top: "12%", left: "18%", delay: "0s", duration: "7.8s", size: "16px", tone: "gold" },
  { id: 2, top: "15%", left: "33%", delay: "0.8s", duration: "8.5s", size: "12px", tone: "ivory" },
  { id: 3, top: "13%", left: "57%", delay: "1.7s", duration: "9.2s", size: "14px", tone: "emerald" },
  { id: 4, top: "16%", left: "76%", delay: "2.3s", duration: "8.8s", size: "11px", tone: "gold" },
  { id: 5, top: "24%", left: "26%", delay: "1.2s", duration: "9.4s", size: "10px", tone: "gold" },
  { id: 6, top: "27%", left: "48%", delay: "2.6s", duration: "8.1s", size: "13px", tone: "ivory" },
  { id: 7, top: "25%", left: "69%", delay: "0.5s", duration: "8.9s", size: "12px", tone: "emerald" }
];

const greetingCelebrationFireworks = [
  { id: 1, top: "11%", left: "16%", delay: "0.12s", cycle: "12.8s", size: "224px", tone: "gold", tilt: "-12deg" },
  { id: 2, top: "8%", left: "39%", delay: "1.18s", cycle: "12.8s", size: "196px", tone: "ivory", tilt: "9deg" },
  { id: 3, top: "13%", left: "74%", delay: "2.36s", cycle: "12.8s", size: "212px", tone: "emerald", tilt: "-7deg" },
  { id: 4, top: "18%", left: "24%", delay: "4.02s", cycle: "12.8s", size: "178px", tone: "ivory", tilt: "12deg" },
  { id: 5, top: "14%", left: "55%", delay: "5.68s", cycle: "12.8s", size: "204px", tone: "gold", tilt: "-10deg" },
  { id: 6, top: "22%", left: "82%", delay: "7.34s", cycle: "12.8s", size: "166px", tone: "gold", tilt: "7deg" },
  { id: 7, top: "24%", left: "37%", delay: "9.26s", cycle: "12.8s", size: "156px", tone: "ivory", tilt: "10deg" },
  { id: 8, top: "27%", left: "68%", delay: "10.92s", cycle: "12.8s", size: "144px", tone: "gold", tilt: "-8deg" }
];

const greetingOpeningCelebrationParticles = [
  createCelebrationParticle(1, "dot", "gold", "16px", "10vw", "-18vh", "24vw", "-44vh", "5vw", "0s", "4.8s", "14deg", "-18deg", "1.2"),
  createCelebrationParticle(2, "star", "ivory", "18px", "12vw", "-24vh", "30vw", "-58vh", "6vw", "0.08s", "5.1s", "-12deg", "-24deg", "1.18"),
  createCelebrationParticle(3, "streak", "gold", "10px", "16vw", "-22vh", "34vw", "-54vh", "5vw", "0.12s", "4.7s", "18deg", "-30deg", "1.08"),
  createCelebrationParticle(4, "confetti", "ivory", "12px", "18vw", "-20vh", "36vw", "-46vh", "6vw", "0.16s", "5.4s", "26deg", "-16deg", "1"),
  createCelebrationParticle(5, "ribbon", "gold", "13px", "20vw", "-26vh", "40vw", "-60vh", "7vw", "0.22s", "5.6s", "18deg", "-22deg", "1.14"),
  createCelebrationParticle(6, "dot", "emerald", "11px", "14vw", "-16vh", "28vw", "-40vh", "5vw", "0.28s", "4.9s", "-10deg", "-20deg", "0.9"),
  createCelebrationParticle(7, "star", "gold", "14px", "22vw", "-30vh", "46vw", "-68vh", "7vw", "0.34s", "5.8s", "12deg", "-34deg", "1.22"),
  createCelebrationParticle(8, "streak", "ivory", "9px", "24vw", "-28vh", "50vw", "-63vh", "8vw", "0.4s", "5.1s", "-16deg", "-28deg", "1.04"),
  createCelebrationParticle(9, "confetti", "gold", "11px", "26vw", "-24vh", "54vw", "-52vh", "9vw", "0.46s", "5.5s", "30deg", "-18deg", "1.08"),
  createCelebrationParticle(10, "dot", "ivory", "12px", "17vw", "-19vh", "38vw", "-48vh", "6vw", "0.52s", "4.9s", "-4deg", "-20deg", "0.96"),
  createCelebrationParticle(11, "ribbon", "gold", "12px", "28vw", "-34vh", "58vw", "-74vh", "10vw", "0.58s", "6.1s", "20deg", "-26deg", "1.12"),
  createCelebrationParticle(12, "star", "ivory", "13px", "30vw", "-36vh", "60vw", "-78vh", "10vw", "0.64s", "6.2s", "-18deg", "-30deg", "1.08"),
  createCelebrationParticle(13, "dot", "gold", "15px", "19vw", "-26vh", "44vw", "-62vh", "7vw", "0.7s", "5.3s", "8deg", "-18deg", "1.16"),
  createCelebrationParticle(14, "star", "emerald", "12px", "23vw", "-25vh", "48vw", "-56vh", "8vw", "0.78s", "5.4s", "14deg", "-24deg", "0.94"),
  createCelebrationParticle(15, "streak", "gold", "8px", "32vw", "-32vh", "62vw", "-70vh", "11vw", "0.84s", "5.7s", "24deg", "-28deg", "1.1"),
  createCelebrationParticle(16, "confetti", "ivory", "10px", "34vw", "-29vh", "64vw", "-60vh", "10vw", "0.92s", "5.9s", "-26deg", "-14deg", "0.98"),
  createCelebrationParticle(17, "ribbon", "gold", "14px", "36vw", "-40vh", "68vw", "-82vh", "12vw", "1.02s", "6.3s", "34deg", "-20deg", "1.18"),
  createCelebrationParticle(18, "dot", "ivory", "10px", "27vw", "-21vh", "52vw", "-50vh", "8vw", "1.12s", "5.1s", "6deg", "-16deg", "0.88"),
  createCelebrationParticle(19, "star", "gold", "12px", "15vw", "-17vh", "26vw", "-36vh", "5vw", "0.18s", "4.6s", "10deg", "-20deg", "0.84"),
  createCelebrationParticle(20, "streak", "ivory", "7px", "11vw", "-14vh", "20vw", "-32vh", "4vw", "0.26s", "4.4s", "-12deg", "-22deg", "0.88"),
  createCelebrationParticle(21, "confetti", "gold", "9px", "21vw", "-18vh", "42vw", "-42vh", "6vw", "0.66s", "4.9s", "22deg", "-16deg", "0.92"),
  createCelebrationParticle(22, "dot", "emerald", "8px", "24vw", "-20vh", "46vw", "-46vh", "7vw", "0.74s", "5s", "-6deg", "-18deg", "0.86"),
  createCelebrationParticle(23, "ribbon", "ivory", "11px", "29vw", "-28vh", "56vw", "-66vh", "10vw", "0.88s", "5.8s", "28deg", "-24deg", "1.04"),
  createCelebrationParticle(24, "star", "gold", "15px", "33vw", "-38vh", "66vw", "-84vh", "12vw", "0.96s", "6.4s", "-22deg", "-32deg", "1.24")
];

const greetingCelebrationFountainParticles = [
  createCelebrationParticle(1, "dot", "gold", "10px", "5vw", "-10vh", "11vw", "-22vh", "2vw", "2.35s", "11.4s", "12deg", "-20deg", "0.92"),
  createCelebrationParticle(2, "star", "ivory", "12px", "7vw", "-14vh", "15vw", "-30vh", "3vw", "2.65s", "11.6s", "-10deg", "-26deg", "1.02"),
  createCelebrationParticle(3, "streak", "gold", "7px", "8vw", "-13vh", "18vw", "-28vh", "3vw", "2.92s", "11.2s", "16deg", "-28deg", "1"),
  createCelebrationParticle(4, "confetti", "emerald", "8px", "10vw", "-12vh", "20vw", "-26vh", "4vw", "3.18s", "11.8s", "22deg", "-16deg", "0.96"),
  createCelebrationParticle(5, "dot", "ivory", "9px", "6vw", "-11vh", "13vw", "-24vh", "2vw", "4.86s", "11.5s", "-8deg", "-22deg", "0.86"),
  createCelebrationParticle(6, "ribbon", "gold", "9px", "9vw", "-15vh", "22vw", "-34vh", "4vw", "5.14s", "12s", "12deg", "-26deg", "1.04"),
  createCelebrationParticle(7, "star", "gold", "11px", "11vw", "-18vh", "25vw", "-38vh", "5vw", "5.42s", "12.2s", "-18deg", "-32deg", "1.12"),
  createCelebrationParticle(8, "confetti", "ivory", "8px", "8vw", "-14vh", "18vw", "-30vh", "3vw", "5.72s", "11.7s", "26deg", "-14deg", "0.94"),
  createCelebrationParticle(11, "star", "emerald", "10px", "12vw", "-18vh", "24vw", "-34vh", "5vw", "9.52s", "12s", "14deg", "-18deg", "0.98"),
  createCelebrationParticle(12, "ribbon", "gold", "9px", "9vw", "-13vh", "19vw", "-28vh", "4vw", "9.8s", "11.8s", "24deg", "-14deg", "0.94"),
  createCelebrationParticle(14, "confetti", "gold", "8px", "10vw", "-15vh", "22vw", "-31vh", "4vw", "11.66s", "11.8s", "20deg", "-16deg", "0.9"),
  createCelebrationParticle(15, "star", "ivory", "10px", "13vw", "-16vh", "26vw", "-36vh", "5vw", "11.96s", "12.4s", "-14deg", "-24deg", "1.04")
];

function normalizeLanguage(value) {
  return value === "ar" ? "ar" : DEFAULT_LANGUAGE;
}

function normalizeStyleId(value) {
  return styleIds.has(value) ? value : DEFAULT_STYLE_ID;
}

function hasGreetingParams(search) {
  const params = new URLSearchParams(search || "");
  return ["name", "msg", "style", "to"].some((key) => params.has(key));
}

function parseGreetingState(search) {
  const params = new URLSearchParams(search || "");

  return {
    hasGreetingParams: hasGreetingParams(search),
    language: normalizeLanguage(params.get("lang")),
    senderName: params.get("name")?.trim() ?? "",
    recipientName: params.get("to")?.trim() ?? "",
    customMessage: params.get("msg")?.trim() ?? "",
    styleId: normalizeStyleId(params.get("style"))
  };
}

function normalizePathname(pathname) {
  const raw = typeof pathname === "string" ? pathname.trim() : "";
  if (!raw || raw === "/") {
    return HOME_PATH;
  }

  const withoutTrailingSlash = raw.replace(/\/+$/, "");
  const withLeadingSlash = withoutTrailingSlash.startsWith("/") ? withoutTrailingSlash : `/${withoutTrailingSlash}`;
  return withLeadingSlash || HOME_PATH;
}

function getLanguageSearch(language) {
  const params = new URLSearchParams();

  if (normalizeLanguage(language) === "ar") {
    params.set("lang", "ar");
  }

  return params.toString();
}

function getPagePath(pageId) {
  return pagePaths[pageId] ?? HOME_PATH;
}

function buildRouteHref(pathname, language) {
  const search = getLanguageSearch(language);
  return search ? `${pathname}?${search}` : pathname;
}

function buildAbsoluteRouteUrl(pathname, sourceHref, language, includeLanguage = true) {
  const source =
    sourceHref ??
    (typeof window !== "undefined" ? window.location.href : "https://example.com/");
  const url = new URL(source);

  url.pathname = normalizePathname(pathname);
  url.search = includeLanguage ? getLanguageSearch(language) : "";
  url.hash = "";

  return url.toString();
}

function buildPageHref(pageId, language) {
  return buildRouteHref(getPagePath(pageId), language);
}

function parseSupportPage(pathname, hash) {
  const normalizedPath = normalizePathname(pathname);
  const matchedEntry = pagePathEntries.find(([, path]) => path === normalizedPath);
  if (matchedEntry) {
    return matchedEntry[0];
  }

  const normalizedHash = (hash || "").replace(/^#\/?/, "").replace(/\/$/, "").trim().toLowerCase();
  return supportPageIds.has(normalizedHash) ? normalizedHash : "";
}

function buildShareUrl({ language, senderName, recipientName = "", customMessage, styleId }, baseHref) {
  const source =
    baseHref ??
    (typeof window !== "undefined" ? window.location.href : "https://example.com/");
  const url = new URL(source);
  const params = new URLSearchParams();
  const normalizedRecipientName = recipientName.trim();

  params.set("lang", normalizeLanguage(language));
  params.set("name", senderName.trim());
  params.set("msg", customMessage.trim());
  params.set("style", normalizeStyleId(styleId));
  if (normalizedRecipientName) {
    params.set("to", normalizedRecipientName);
  }

  url.pathname = HOME_PATH;
  url.search = params.toString();
  url.hash = "";
  return url.toString();
}

function buildShareMessage(language, shareUrl) {
  const intro =
    language === "ar"
      ? "السلام عليكم ورحمة الله وبركاته، هذه تهنئتي الشخصية لكم بمناسبة العيد. أسأل الله أن يأتيكم العيد بالمحبة والرضا والسعادة."
      : "Assalamu Alaikum wa Rahmatullahi wa Barakatuh. This is my personalized Eid greeting message. May Eid find you with love, contentment, and happiness.";

  return `${intro}\n\n${shareUrl}`;
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

const NATIVE_SHARE_AVAILABILITY = {
  available: "available",
  insecure: "insecure",
  unsupported: "unsupported"
};

function getNativeShareAvailability() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return NATIVE_SHARE_AVAILABILITY.unsupported;
  }

  if (!window.isSecureContext) {
    return NATIVE_SHARE_AVAILABILITY.insecure;
  }

  return typeof navigator.share === "function"
    ? NATIVE_SHARE_AVAILABILITY.available
    : NATIVE_SHARE_AVAILABILITY.unsupported;
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

async function getClipboardFallbackMessage(text, successMessage, failureMessage) {
  try {
    const copied = await copyToClipboard(text);
    return copied ? successMessage : failureMessage;
  } catch {
    return failureMessage;
  }
}

function isShareDismissedError(error) {
  return error instanceof Error && error.name === "AbortError";
}

function isShareDeniedError(error) {
  return (
    error instanceof Error &&
    (error.name === "NotAllowedError" || /permission denied/i.test(error.message))
  );
}

function buildCreatorHref(language) {
  return buildRouteHref(HOME_PATH, language);
}

function setHeadMeta(attribute, key, value) {
  if (typeof document === "undefined") {
    return;
  }

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", value);
}

function setHeadLink(rel, href) {
  if (typeof document === "undefined") {
    return;
  }

  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function runSelfTests() {
  if (normalizeStyleId("bad-style") !== DEFAULT_STYLE_ID) {
    throw new Error("Style validation fallback failed.");
  }

  if (normalizeLanguage("de") !== DEFAULT_LANGUAGE) {
    throw new Error("Language validation fallback failed.");
  }

  const parsed = parseGreetingState("?lang=ar&name=Ali&to=Family&msg=Hello&style=night");
  if (
    !parsed.hasGreetingParams ||
    parsed.language !== "ar" ||
    parsed.senderName !== "Ali" ||
    parsed.recipientName !== "Family" ||
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
    defaults.recipientName !== "" ||
    defaults.customMessage !== "" ||
    defaults.styleId !== DEFAULT_STYLE_ID
  ) {
    throw new Error("Default fallback behavior is incorrect.");
  }

  if (
    !hasGreetingParams("?name=Sara") ||
    !hasGreetingParams("?style=soft") ||
    !hasGreetingParams("?to=Family") ||
    hasGreetingParams("?lang=ar")
  ) {
    throw new Error("Greeting-page mode detection failed.");
  }

  if (
    parseSupportPage("/privacy", "") !== "privacy" ||
    parseSupportPage("/", "#/wishes") !== "wishes" ||
    parseSupportPage("/", "#/unknown") !== ""
  ) {
    throw new Error("Support-page route detection failed.");
  }

  const shareUrl = buildShareUrl(
    {
      language: "en",
      senderName: "Mona",
      recipientName: "Alsayari family, young and old",
      customMessage: "Warm wishes",
      styleId: "soft"
    },
    "https://example.com/eid?x=1"
  );
  const parsedShareUrl = new URL(shareUrl);
  const params = parsedShareUrl.searchParams;
  if (
    parsedShareUrl.pathname !== "/" ||
    params.get("lang") !== "en" ||
    params.get("name") !== "Mona" ||
    params.get("to") !== "Alsayari family, young and old" ||
    params.get("msg") !== "Warm wishes" ||
    params.get("style") !== "soft"
  ) {
    throw new Error("Share URL generation sanity check failed.");
  }

  if (buildPageHref("about", "ar") !== "/about?lang=ar" || buildCreatorHref("en") !== "/") {
    throw new Error("Route href generation failed.");
  }

  const englishShareMessage = buildShareMessage("en", "https://example.com/eid");
  if (
    !englishShareMessage.includes("Assalamu Alaikum wa Rahmatullahi wa Barakatuh.") ||
    !englishShareMessage.endsWith("https://example.com/eid")
  ) {
    throw new Error("English share message generation failed.");
  }

  const arabicShareMessage = buildShareMessage("ar", "https://example.com/eid");
  if (
    !arabicShareMessage.includes("السلام عليكم ورحمة الله وبركاته") ||
    !arabicShareMessage.endsWith("https://example.com/eid")
  ) {
    throw new Error("Arabic share message generation failed.");
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

function GreetingOpeningCelebration() {
  return (
    <div className="greeting-opening-celebration" aria-hidden="true">
      <span className="greeting-opening-celebration-veil" />
      <span className="greeting-opening-celebration-shimmer shimmer-left" />
      <span className="greeting-opening-celebration-shimmer shimmer-right" />
      <div className="greeting-opening-burst greeting-opening-burst-left">
        {greetingOpeningCelebrationParticles.map((particle) => (
          <span
            key={`opening-left-${particle.id}`}
            className={`greeting-opening-particle kind-${particle.kind} tone-${particle.tone}`}
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
      <div className="greeting-opening-burst greeting-opening-burst-right">
        {greetingOpeningCelebrationParticles.map((particle) => (
          <span
            key={`opening-right-${particle.id}`}
            className={`greeting-opening-particle kind-${particle.kind} tone-${particle.tone}`}
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

function GreetingCannon({ side }) {
  return (
    <div className={`greeting-cannon-shell cannon-side-${side}`}>
      <span className="greeting-cannon-base" />
      <span className="greeting-cannon-wheel wheel-back" />
      <span className="greeting-cannon-wheel wheel-front" />
      <span className="greeting-cannon-axle" />
      <span className="greeting-cannon-pedestal" />
      <span className="greeting-cannon-carriage" />
      <span className="greeting-cannon-support support-back" />
      <span className="greeting-cannon-support support-front" />
      <span className="greeting-cannon-barrel">
        <span className="greeting-cannon-breech" />
        <span className="greeting-cannon-band band-back" />
        <span className="greeting-cannon-band band-front" />
        <span className="greeting-cannon-muzzle" />
        <span className="greeting-cannon-jewel" />
        <span className="greeting-cannon-finial" />
      </span>
    </div>
  );
}

function GreetingCelebrationFountain({ side }) {
  return (
    <div className={`greeting-corner-burst greeting-corner-burst-${side}`} aria-hidden="true">
      <span className="greeting-cannon-aura" />
      <span className="greeting-cannon-shadow" />
      <GreetingCannon side={side} />
      <span className="greeting-cannon-charge-ring ring-outer" />
      <span className="greeting-cannon-charge-ring ring-inner" />
      <span className="greeting-cannon-muzzle-glow" />
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
  language,
  senderName,
  recipientName,
  setSenderName,
  setRecipientName,
  setLanguage,
  styleId,
  setStyleId,
  customMessage,
  setCustomMessage,
  handleGenerateMessage,
  shareUrl,
  isSharing,
  handleShare,
  handleCopyLink,
  resetState,
  statusMessage,
  homepageContent,
  adsConfig,
  footerLinks,
  footerHomeLabel,
  supportPages,
  creatorHref
}) {
  const pageLinks = Object.fromEntries(footerLinks.map((link) => [link.id, link.href]));

  return (
    <main className="creator-layout">
      <section className="creator-hero-grid">
        <section className="creator-panel">
          <div className="pill">{ui.creatorBadge}</div>
          <h1 className="hero-title">
            {ui.creatorTitleA} <span>{ui.creatorTitleB}</span>
          </h1>
          <p className="hero-description">{ui.creatorDescription}</p>

          <AdSlot
            className="creator-top-ad"
            title={homepageContent.topAdTitle}
            description={homepageContent.topAdDescription}
            badgeLabel={homepageContent.adLabel}
            placeholderLabel={homepageContent.adPlaceholder}
            readyLabel={homepageContent.adReady}
            hint={homepageContent.adHint}
            adClient={adsConfig.adsenseClientId}
            adSlot={adsConfig.homepageTopSlotId}
            placeholderMode={adsConfig.usePlaceholderAds}
            minHeight={146}
          />

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
              <label htmlFor="recipient-name">{ui.recipientName}</label>
              <input
                id="recipient-name"
                value={recipientName}
                onChange={(event) => setRecipientName(event.target.value)}
                placeholder={ui.recipientPlaceholder}
              />
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

            <div className="message-field">
              <div className="message-field-header">
                <label htmlFor="custom-message">{ui.customMessage}</label>
                <button className="secondary-btn message-generate-btn" type="button" onClick={handleGenerateMessage}>
                  {ui.generateMessage}
                </button>
              </div>
              <div className="message-generator-note">{ui.generateMessageHint}</div>
              <textarea
                id="custom-message"
                rows={4}
                value={customMessage}
                onChange={(event) => setCustomMessage(event.target.value)}
                placeholder={ui.customPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="share-link">{ui.previewLink}</label>
              <div className="share-link-row">
                <input
                  id="share-link"
                  readOnly
                  value={shareUrl}
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

            <div className="share-helper-note">{ui.shareHelperNote}</div>
            <div className="status-note">{statusMessage || ui.helperHint}</div>
          </div>
        </section>
      </section>

      <section className="creator-info-section">
        <div className="creator-section-heading">
          <div className="pill">{homepageContent.storyEyebrow}</div>
          <h2>{homepageContent.storyTitle}</h2>
          <p>{homepageContent.storyIntro}</p>
        </div>

        <div className="creator-trust-grid">
          {homepageContent.storyCards.map((card) => (
            <article key={card.title} className="content-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="creator-info-section">
        <div className="creator-section-heading">
          <div className="pill">{homepageContent.howEyebrow}</div>
          <h2>{homepageContent.howTitle}</h2>
          <p>{homepageContent.howIntro}</p>
        </div>

        <div className="creator-steps-grid">
          {homepageContent.steps.map((step) => (
            <article key={step.title} className="content-card">
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="creator-info-section">
        <div className="creator-section-heading">
          <div className="pill">{homepageContent.writingEyebrow}</div>
          <h2>{homepageContent.writingTitle}</h2>
          <p>{homepageContent.writingIntro}</p>
        </div>

        <div className="creator-trust-grid">
          {homepageContent.writingTips.map((tip) => (
            <article key={tip.title} className="content-card">
              <h3>{tip.title}</h3>
              <p>{tip.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="creator-more-section">
        <div className="creator-section-heading">
          <div className="pill">{homepageContent.articleEyebrow}</div>
          <h2>{homepageContent.articleTitle}</h2>
          <p>{homepageContent.articleIntro}</p>
        </div>

        <div className="creator-more-grid">
          {homepageContent.articleCards.map((card) => (
            <article key={card.id} className="content-card link-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <a className="ghost-link" href={pageLinks[card.id]}>
                {card.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="creator-info-section">
        <div className="creator-section-heading">
          <div className="pill">{homepageContent.supportEyebrow}</div>
          <h2>{homepageContent.supportTitle}</h2>
          <p>{homepageContent.supportIntro}</p>
        </div>

        <div className="creator-more-grid">
          {homepageContent.supportCards.map((card) => (
            <article key={card.id} className="content-card link-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <a className="ghost-link" href={pageLinks[card.id]}>
                {card.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="creator-info-section">
        <div className="creator-section-heading">
          <div className="pill">{footerHomeLabel}</div>
          <h2>{homepageContent.trustTitle}</h2>
          <p>{homepageContent.trustIntro}</p>
        </div>

        <div className="creator-trust-grid">
          {homepageContent.trustCards.map((card) => (
            <article key={card.title} className="content-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CreatorSupportMenu
        title={homepageContent.menuTitle}
        intro={homepageContent.menuIntro}
        homeLabel={footerHomeLabel}
        homeTitle={homepageContent.menuHomeTitle}
        homeIntro={homepageContent.menuHomeIntro}
        openPageLabel={homepageContent.openPageLabel}
        homeHref={creatorHref}
        items={footerLinks}
        pages={supportPages}
        lowerContent={
          <AdSlot
            className="secondary-ad"
            title={homepageContent.lowerAdTitle}
            description={homepageContent.lowerAdDescription}
            badgeLabel={homepageContent.adLabel}
            placeholderLabel={homepageContent.adPlaceholder}
            readyLabel={homepageContent.adReady}
            hint={homepageContent.adHint}
            adClient={adsConfig.adsenseClientId}
            adSlot={adsConfig.homepageLowerSlotId}
            placeholderMode={adsConfig.usePlaceholderAds}
            minHeight={132}
          />
        }
      />
    </main>
  );
}

function GreetingMode({ ui, isArabic, selectedStyle, senderName, recipientName, greetingMessage, creatorHref }) {
  const displayName = senderName.trim() || ui.defaultSender;
  const displayRecipient = recipientName.trim();
  const textDirection = isArabic ? "rtl" : "ltr";
  const dynamicTextDirection = isArabic ? "auto" : "ltr";

  return (
    <main className={`greeting-layout ${selectedStyle.className}`} dir="ltr" lang={isArabic ? "ar" : "en"}>
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
        <GreetingOpeningCelebration />
        <div className="greeting-floor-glow" />
        <div className="greeting-silhouette" />
      </div>

      <section className="greeting-stage">
        <div className="greeting-stage-glow greeting-stage-glow-left" aria-hidden="true" />
        <div className="greeting-stage-glow greeting-stage-glow-right" aria-hidden="true" />
        <div className="greeting-stage-floor" aria-hidden="true" />
        <div className="greeting-flight-layer" aria-hidden="true">
          <div className="greeting-bird-groups">
            <GreetingBirdGroup side="left" bannerText="عيد مبارك" accent="gold" />
            <GreetingBirdGroup side="right" bannerText="كل عام وأنتم بخير" accent="emerald" />
          </div>
        </div>
        <div className="greeting-lanterns" aria-hidden="true">
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
          <div className="greeting-corner-bursts" aria-hidden="true">
            <GreetingCelebrationFountain side="left" />
            <GreetingCelebrationFountain side="right" />
          </div>

          <div className="greeting-card">
            <div className="greeting-card-inner">
              <div className="greeting-top-row">
                <span className="greeting-top-line" aria-hidden="true" />
                <div className="pill greeting-scene-pill" dir={textDirection}>
                  {ui.greetingBadge}
                </div>
                <span className="greeting-top-line" aria-hidden="true" />
              </div>

              <div className="greeting-headline">
                <h1 className="greeting-title" dir={textDirection}>
                  {isArabic ? "عيد مبارك" : "Eid Mubarak"}
                </h1>
                <div className="greeting-title-mark" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="greeting-subtitle" dir={textDirection}>
                  {ui.greetingSubtitle}
                </p>
              </div>

              {displayRecipient ? (
                <div className="greeting-recipient">
                  <small dir={textDirection}>{ui.recipientLineLabel}</small>
                  <strong dir={dynamicTextDirection}>{displayRecipient}</strong>
                </div>
              ) : null}

              <div
                className={`greeting-message ${displayRecipient ? "has-recipient" : ""}`}
                role="note"
                aria-live="polite"
              >
                <div className="greeting-message-glow" aria-hidden="true" />
                <div className="greeting-message-frame" aria-hidden="true" />
                <p dir={dynamicTextDirection}>{greetingMessage}</p>
              </div>

              <div className="from-area">
                <small dir={textDirection}>{ui.fromLabel}</small>
                <div className="from-name-wrap">
                  <span className="from-name-mark" aria-hidden="true" />
                  <div className="from-name" dir={dynamicTextDirection}>
                    {displayName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="greeting-cta-wrap">
        <a className="cta-link" href={creatorHref} dir={textDirection}>
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
  const [recipientName, setRecipientName] = useState(initial.recipientName);
  const [customMessage, setCustomMessage] = useState(initial.customMessage);
  const [styleId, setStyleId] = useState(initial.styleId);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [supportPage, setSupportPage] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return parseSupportPage(window.location.pathname, window.location.hash);
  });
  const lastGeneratedMessageRef = useRef("");

  const ui = copy[language];
  const isArabic = language === "ar";
  const content = siteContent[language];
  const supportPages = supportContent[language];

  const selectedStyle = useMemo(
    () => styleOptions.find((style) => style.id === styleId) ?? styleOptions[0],
    [styleId]
  );

  const greetingMessage = useMemo(
    () => buildGreetingMessage(language, senderName, customMessage, selectedStyle),
    [language, senderName, customMessage, selectedStyle]
  );

  const shareUrl = useMemo(
    () => buildShareUrl({ language, senderName, recipientName, customMessage, styleId }),
    [language, senderName, recipientName, customMessage, styleId]
  );

  const shareMessage = useMemo(() => buildShareMessage(language, shareUrl), [language, shareUrl]);

  const creatorHref = useMemo(() => buildCreatorHref(language), [language]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const syncSupportPage = () => {
      setSupportPage(parseSupportPage(window.location.pathname, window.location.hash));
    };

    window.addEventListener("popstate", syncSupportPage);
    window.addEventListener("hashchange", syncSupportPage);
    return () => {
      window.removeEventListener("popstate", syncSupportPage);
      window.removeEventListener("hashchange", syncSupportPage);
    };
  }, []);

  async function handleCopyLink() {
    try {
      const copied = await copyToClipboard(shareMessage);
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
      text: shareMessage,
      url: shareUrl
    };
    const shareAvailability = getNativeShareAvailability();

    try {
      if (shareAvailability === NATIVE_SHARE_AVAILABILITY.insecure) {
        setStatusMessage(
          await getClipboardFallbackMessage(shareMessage, ui.shareInsecureFallback, ui.shareInsecureNoClipboard)
        );
        return;
      }

      if (shareAvailability === NATIVE_SHARE_AVAILABILITY.unsupported) {
        setStatusMessage(await getClipboardFallbackMessage(shareMessage, ui.shareFallback, ui.shareFallbackNoClipboard));
        return;
      }

      await navigator.share(payload);
      setStatusMessage(ui.shareSuccess);
    } catch (error) {
      if (isShareDismissedError(error)) {
        setStatusMessage("");
      } else if (isShareDeniedError(error)) {
        setStatusMessage(
          await getClipboardFallbackMessage(shareMessage, ui.shareDeniedFallback, ui.shareDeniedNoClipboard)
        );
      } else {
        setStatusMessage(error instanceof Error ? error.message : ui.copyError);
      }
    } finally {
      setIsSharing(false);
    }
  }

  function handleGenerateMessage() {
    const nextMessage = generateRandomEidMessage(language, lastGeneratedMessageRef.current);
    if (!nextMessage) {
      return;
    }

    setCustomMessage(nextMessage);
    setStatusMessage("");
    lastGeneratedMessageRef.current = nextMessage;
  }

  function resetState() {
    setLanguage(DEFAULT_LANGUAGE);
    setSenderName("");
    setRecipientName("");
    setCustomMessage("");
    setStyleId(DEFAULT_STYLE_ID);
    setStatusMessage("");
    lastGeneratedMessageRef.current = "";
  }

  const footerLinks = footerPageIds.map((id) => ({
    id,
    href: buildPageHref(id, language),
    label: content.footerLinks[id]
  }));

  const showGreetingMode = initial.hasGreetingParams;
  const activeSupportPage = showGreetingMode ? "" : supportPage;
  const pageLanguageLinks = activeSupportPage
    ? [
        { id: "en", label: "English", href: buildPageHref(activeSupportPage, "en"), isActive: language === "en" },
        { id: "ar", label: "العربية", href: buildPageHref(activeSupportPage, "ar"), isActive: language === "ar" }
      ]
    : [];

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const isGreetingPage = showGreetingMode;
    const currentPage = activeSupportPage ? supportPages[activeSupportPage] : null;
    const title = isGreetingPage
      ? `${senderName.trim() ? `${senderName.trim()} | ` : ""}${ui.shareTitle} | ${siteConfig.siteName}`
      : currentPage
        ? `${currentPage.title} | ${siteConfig.siteName}`
        : content.homepage.metaTitle;
    const description = isGreetingPage
      ? isArabic
        ? "هذه صفحة تهنئة عيد مشتركة مخصصة للمشاهدة والمشاركة الشخصية."
        : "This is a personalized Eid greeting page created for private sharing."
      : currentPage
        ? currentPage.intro
        : content.homepage.metaDescription;
    const canonicalUrl = isGreetingPage
      ? buildAbsoluteRouteUrl(HOME_PATH, window.location.href, language)
      : buildAbsoluteRouteUrl(activeSupportPage ? getPagePath(activeSupportPage) : HOME_PATH, window.location.href, language);
    const robotsValue = isGreetingPage ? "noindex, nofollow" : "index, follow";

    document.title = title;
    setHeadMeta("name", "description", description);
    setHeadMeta("name", "robots", robotsValue);
    setHeadMeta("property", "og:title", title);
    setHeadMeta("property", "og:description", description);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("name", "twitter:title", title);
    setHeadMeta("name", "twitter:description", description);
    setHeadLink("canonical", canonicalUrl);
  }, [activeSupportPage, content.homepage.metaDescription, content.homepage.metaTitle, isArabic, language, senderName, showGreetingMode, supportPages, ui.shareTitle]);

  return (
    <div
      className={`app-shell ${showGreetingMode ? "mode-greeting" : "mode-creator"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <DecorativeBackground />

      {showGreetingMode ? (
        <GreetingMode
          ui={ui}
          isArabic={isArabic}
          selectedStyle={selectedStyle}
          senderName={senderName}
          recipientName={recipientName}
          greetingMessage={greetingMessage}
          creatorHref={creatorHref}
        />
      ) : activeSupportPage ? (
        <>
          <SupportPageView
            page={supportPages[activeSupportPage]}
            homeHref={creatorHref}
            backLabel={content.backToHome}
            contactEmail={siteConfig.contactEmail}
            languageLabel={content.pageLanguageLabel}
            languageLinks={pageLanguageLinks}
          />

          <CreatorSupportMenu
            title={content.homepage.menuTitle}
            intro={content.homepage.menuIntro}
            homeLabel={content.footerHome}
            homeTitle={content.homepage.menuHomeTitle}
            homeIntro={content.homepage.menuHomeIntro}
            openPageLabel={content.homepage.openPageLabel}
            homeHref={creatorHref}
            items={footerLinks}
            pages={supportPages}
            lowerContent={null}
          />
        </>
      ) : (
        <CreatorMode
          ui={ui}
          isArabic={isArabic}
          language={language}
          senderName={senderName}
          recipientName={recipientName}
          setSenderName={setSenderName}
          setRecipientName={setRecipientName}
          setLanguage={setLanguage}
          styleId={styleId}
          setStyleId={setStyleId}
          customMessage={customMessage}
          setCustomMessage={setCustomMessage}
          handleGenerateMessage={handleGenerateMessage}
          shareUrl={shareUrl}
          isSharing={isSharing}
          handleShare={handleShare}
          handleCopyLink={handleCopyLink}
          resetState={resetState}
          statusMessage={statusMessage}
          homepageContent={content.homepage}
          adsConfig={siteConfig.ads}
          footerLinks={footerLinks}
          footerHomeLabel={content.footerHome}
          supportPages={supportPages}
          creatorHref={creatorHref}
        />
      )}
    </div>
  );
}
