import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Gift,
  Moon,
  Stars,
  Sparkles,
  Share2,
  Heart,
  Send,
  CheckCircle2,
  Copy,
  AlertCircle,
} from "lucide-react";

type LanguageKey = "en" | "ar";

type SharePayload = {
  title: string;
  text: string;
  url: string;
};

type ShareOutcome = "shared" | "copied" | "idle" | "error";

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
      "Native sharing works best on supported mobile browsers and secure HTTPS pages.",
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
      "تعمل المشاركة المباشرة بشكل أفضل على الهواتف والمتصفحات المدعومة وعبر صفحات HTTPS الآمنة.",
  },
} as const;

const templates = [
  {
    id: "classic",
    title: "Classic Gold",
    bg: "from-emerald-950 via-emerald-800 to-amber-500",
    accent: "text-amber-100",
    border: "border-amber-300/40",
    message:
      "Eid Mubarak! May Allah fill your home with peace, joy, and countless blessings.",
  },
  {
    id: "night",
    title: "Moonlight Night",
    bg: "from-slate-950 via-indigo-900 to-fuchsia-700",
    accent: "text-indigo-50",
    border: "border-indigo-200/30",
    message:
      "Wishing you and your loved ones a joyful Eid full of happiness, mercy, and beautiful memories.",
  },
  {
    id: "soft",
    title: "Soft Celebration",
    bg: "from-teal-900 via-cyan-700 to-sky-400",
    accent: "text-white",
    border: "border-white/30",
    message:
      "Sending warm Eid wishes to you and your family. May this Eid bring barakah, love, and ease.",
  },
] as const;

const ornaments = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${5 + i * 6}%`,
  delay: i * 0.18,
  duration: 3 + (i % 4),
}));

function buildFinalMessage(
  language: LanguageKey,
  senderName: string,
  customMessage: string,
  selectedTemplateMessage: string
) {
  if (customMessage.trim()) return customMessage.trim();

  return language === "ar"
    ? `عيد مبارك! تقبل الله منا ومنكم، وجعل أيامكم فرحًا وبركة وسعادة. من ${senderName || "شخص يقدركم"}.`
    : `${selectedTemplateMessage} From ${senderName || "someone who cares"}.`;
}

function buildShareText(language: LanguageKey, finalMessage: string) {
  return language === "ar"
    ? `عيد مبارك! ${finalMessage}`
    : `Eid Mubarak! ${finalMessage}`;
}

function buildSharePayload(language: LanguageKey, shareText: string): SharePayload {
  const safeUrl = typeof window !== "undefined" ? window.location.href : "";
  return {
    title:
      language === "ar"
        ? "تهنئة عيد مبارك شخصية"
        : "Personalized Eid Mubarak Greeting",
    text: shareText,
    url: safeUrl,
  };
}

function canUseNativeShare(payload: SharePayload) {
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

async function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  if (typeof document !== "undefined") {
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

  return false;
}

function isPermissionStyleShareError(error: unknown) {
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
    throw new Error("Test failed: English final message should include sender name.");
  }

  const arabic = buildFinalMessage("ar", "مصعب", "", "ignored");
  if (!arabic.includes("مصعب")) {
    throw new Error("Test failed: Arabic final message should include sender name.");
  }

  const custom = buildFinalMessage("en", "", "Custom Eid text", "ignored");
  if (custom !== "Custom Eid text") {
    throw new Error("Test failed: Custom message should take priority.");
  }

  const shareText = buildShareText("en", "Hello");
  if (!shareText.startsWith("Eid Mubarak!")) {
    throw new Error("Test failed: English share text prefix is wrong.");
  }
}

runSelfTests();

export default function EidCongratulationsPage() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const [senderName, setSenderName] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [templateId, setTemplateId] = useState("classic");
  const [shareOutcome, setShareOutcome] = useState<ShareOutcome>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSharing, setIsSharing] = useState(false);

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
      if (copied) {
        setShareOutcome("copied");
        setStatusMessage(ui.copySuccess);
      } else {
        setShareOutcome("error");
        setStatusMessage(ui.copyError);
      }
    } catch {
      setShareOutcome("error");
      setStatusMessage(ui.copyError);
    }
  };

  const handleShare = async () => {
    if (isSharing) return;

    setIsSharing(true);
    setShareOutcome("idle");
    setStatusMessage("");

    const payload = buildSharePayload(language, shareText);

    try {
      if (canUseNativeShare(payload)) {
        await navigator.share(payload);
        setShareOutcome("shared");
        setStatusMessage(ui.shareSuccess);
      } else {
        const copied = await copyToClipboard(shareText);
        setShareOutcome(copied ? "copied" : "error");
        setStatusMessage(copied ? ui.shareFallback : ui.copyError);
      }
    } catch (error) {
      if (isPermissionStyleShareError(error)) {
        try {
          const copied = await copyToClipboard(shareText);
          setShareOutcome(copied ? "copied" : "error");
          setStatusMessage(copied ? ui.shareFallback : ui.copyError);
        } catch {
          setShareOutcome("error");
          setStatusMessage(ui.copyError);
        }
      } else {
        setShareOutcome("error");
        setStatusMessage(error instanceof Error ? error.message : ui.copyError);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const adClient = "ca-pub-xxxxxxxxxxxxxxxx";
  const adSlotTop = "1234567890";
  const adSlotSide = "0987654321";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.2),transparent_30%)]" />

        {ornaments.map((item) => (
          <motion.div
            key={item.id}
            className="absolute top-0 hidden md:block"
            style={{ left: item.left }}
            animate={{ y: [0, 10, 0], rotate: [0, 2, -2, 0] }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex flex-col items-center opacity-70">
              <div className="h-16 w-px bg-white/30" />
              {item.id % 3 === 0 ? (
                <Moon className="h-5 w-5 text-amber-200" />
              ) : item.id % 3 === 1 ? (
                <Stars className="h-4 w-4 text-sky-200" />
              ) : (
                <Sparkles className="h-4 w-4 text-emerald-200" />
              )}
            </div>
          </motion.div>
        ))}

        <section className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-14">
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur">
                  <Gift className="h-4 w-4" />
                  {ui.heroBadge}
                </div>
                <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                  {ui.heroTitleA}
                  <span className="bg-gradient-to-r from-amber-200 via-white to-emerald-200 bg-clip-text text-transparent">
                    {" "}
                    {ui.heroTitleB}
                  </span>
                </h1>
                <p className="max-w-2xl text-base text-slate-200 md:text-lg">{ui.heroDesc}</p>
              </motion.div>

              <Card className="rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">{ui.customize}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm text-slate-200">{ui.senderName}</label>
                      <Input
                        placeholder={ui.senderPlaceholder}
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="border-white/10 bg-slate-900/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-200">{ui.language}</label>
                      <Select value={language} onValueChange={(value: LanguageKey) => setLanguage(value)}>
                        <SelectTrigger className="border-white/10 bg-slate-900/70">
                          <SelectValue placeholder="Choose language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">العربية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-200">{ui.greetingStyle}</label>
                    <Select value={templateId} onValueChange={setTemplateId}>
                      <SelectTrigger className="border-white/10 bg-slate-900/70">
                        <SelectValue placeholder="Choose a style" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-200">{ui.customMessage}</label>
                    <Textarea
                      placeholder={ui.customPlaceholder}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="min-h-[120px] border-white/10 bg-slate-900/70"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button onClick={handleShare} className="rounded-2xl" disabled={isSharing}>
                      <Share2 className="mr-2 h-4 w-4" />
                      {isSharing ? "..." : ui.share}
                    </Button>
                    <Button onClick={handleCopy} variant="secondary" className="rounded-2xl">
                      <Copy className="mr-2 h-4 w-4" />
                      {ui.copy}
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-2xl border-white/20 bg-transparent"
                      onClick={() => {
                        setSenderName("");
                        setCustomMessage("");
                        setTemplateId("classic");
                        setLanguage("en");
                        setShareOutcome("idle");
                        setStatusMessage("");
                      }}
                    >
                      {ui.reset}
                    </Button>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-300">
                    <div className="mb-2 flex items-start gap-2">
                      {shareOutcome === "shared" || shareOutcome === "copied" ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                      ) : shareOutcome === "error" ? (
                        <AlertCircle className="mt-0.5 h-4 w-4 text-rose-300" />
                      ) : (
                        <Send className="mt-0.5 h-4 w-4 text-sky-300" />
                      )}
                      <div className="space-y-1">
                        <p>{statusMessage || ui.secureHint}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-5">
                    <p className="mb-2 text-sm uppercase tracking-[0.2em] text-amber-200">{ui.ad1}</p>
                    <div className="space-y-3 rounded-2xl border border-dashed border-white/20 bg-slate-900/60 p-5 text-sm text-slate-300">
                      <p>{ui.ad1Desc}</p>
                      <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-slate-400">
                        client: {adClient} · slot: {adSlotTop}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-5">
                    <p className="mb-2 text-sm uppercase tracking-[0.2em] text-emerald-200">{ui.ad2}</p>
                    <div className="space-y-3 rounded-2xl border border-dashed border-white/20 bg-slate-900/60 p-5 text-sm text-slate-300">
                      <p>{ui.ad2Desc}</p>
                      <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-slate-400">
                        client: {adClient} · slot: {adSlotSide}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="sticky top-6"
            >
              <div
                className={`relative overflow-hidden rounded-[2rem] border ${selected.border} bg-gradient-to-br ${selected.bg} p-1 shadow-[0_20px_80px_rgba(0,0,0,0.35)]`}
              >
                <div className="relative rounded-[1.8rem] bg-black/15 px-6 py-8 backdrop-blur-sm md:px-8 md:py-10">
                  <motion.div
                    className="absolute right-6 top-6 opacity-20"
                    animate={{ rotate: [0, 6, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Moon className="h-24 w-24 text-white" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-6 left-6 opacity-20"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Stars className="h-20 w-20 text-white" />
                  </motion.div>

                  <div className={`relative z-10 ${selected.accent}`}>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                      <Sparkles className="h-4 w-4" />
                      {ui.previewBadge}
                    </div>

                    <h2 className="text-3xl font-extrabold md:text-5xl">
                      {language === "ar" ? "عيد مبارك" : "Eid Mubarak"}
                    </h2>
                    <p className="mt-3 text-lg opacity-95 md:text-xl">{ui.to}</p>

                    <div className="mt-8 rounded-[1.5rem] border border-white/20 bg-white/10 p-5 md:p-6">
                      <p className="text-base leading-8 md:text-lg">{finalMessage}</p>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/20 pt-6">
                      <div>
                        <p className="text-sm uppercase tracking-[0.18em] opacity-80">{ui.sentBy}</p>
                        <p className="text-xl font-semibold">
                          {senderName || (language === "ar" ? "اسمك" : "Your Name")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                        <Heart className="h-4 w-4" />
                        {ui.withLove}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-5 text-sm text-slate-200">
                    <div className="mb-2 flex items-center gap-2 font-medium">
                      <Send className="h-4 w-4" />
                      {ui.monetization}
                    </div>
                    {ui.monetizationDesc}
                  </CardContent>
                </Card>
                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-5 text-sm text-slate-200">
                    <div className="mb-2 flex items-center gap-2 font-medium">
                      <Gift className="h-4 w-4" />
                      {ui.viral}
                    </div>
                    {ui.viralDesc}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
