export const siteContent = {
  en: {
    footerTagline:
      "Create one polished Eid greeting link, keep the recipient page celebratory, and give the homepage enough original content for a trustworthy launch.",
    footerHome: "Home",
    footerLinks: {
      privacy: "Privacy Policy",
      about: "About",
      contact: "Contact",
      faq: "FAQ / How it works"
    },
    backToHome: "Back to greeting creator",
    supportNavLabel: "Support pages",
    homepage: {
      adLabel: "Homepage sponsor slot",
      adPlaceholder: "Placeholder mode",
      adReady: "AdSense ready",
      adHint: "Paste your real AdSense client and slot IDs in siteConfig when you are ready to go live.",
      topAdTitle: "A single light-touch ad lives on the creator page",
      topAdDescription:
        "This spot is intentionally placed on the homepage only, so the recipient greeting page can stay clean and premium.",
      howEyebrow: "How the tool works",
      howTitle: "A simple flow for the sender and a polished page for the recipient",
      howIntro:
        "The creator page helps you compose, preview, and share one personalized link. The recipient opens a dedicated festive greeting view without extra clutter.",
      steps: [
        {
          title: "1. Add the sender details",
          body: "Choose the language, enter the sender name, and pick the greeting style that fits the moment."
        },
        {
          title: "2. Write or generate the message",
          body: "Use your own wording or the built-in generator, then confirm it in the live preview before sharing."
        },
        {
          title: "3. Share one link",
          body: "The personalized URL carries the greeting state so the recipient opens a ready-made Eid page immediately."
        }
      ],
      trustCards: [
        {
          title: "Clean recipient experience",
          body: "The greeting page stays focused on the celebration, with no heavy ad stack interrupting the message."
        },
        {
          title: "Approval-friendly structure",
          body: "Support pages, explanatory homepage content, and restrained ad placement make the site easier to review and trust."
        },
        {
          title: "Easy to maintain",
          body: "Ad client IDs, slot IDs, and placeholder mode live in one config file so you can switch to real ads later without rewiring the UI."
        }
      ],
      moreTitle: "More content for visitors and future monetization",
      moreIntro:
        "This lower area adds original site content today and keeps a clear place for a second homepage ad later, if you decide to expand monetization.",
      linkCards: [
        {
          id: "faq",
          title: "FAQ / How it works",
          body: "Answer common questions about how the greeting link works and what recipients see.",
          href: "#/faq",
          cta: "Read the FAQ"
        },
        {
          id: "about",
          title: "About this project",
          body: "Explain the purpose of the greeting tool and why the experience prioritizes celebration over clutter.",
          href: "#/about",
          cta: "Learn more"
        }
      ],
      lowerAdTitle: "Reserved lower homepage ad area",
      lowerAdDescription:
        "Keep this secondary position quiet for now. It is ready for a future responsive ad once the site has enough traffic and content."
    },
    supportPages: {
      privacy: {
        eyebrow: "Privacy Policy",
        title: "Privacy policy for the Eid greeting tool",
        intro:
          "This site is designed to work with minimal friction. It does not require an account, and the greeting details are prepared in the browser and passed through the shared link.",
        sections: [
          {
            title: "Information entered on the creator page",
            body:
              "When you create a greeting, the sender name, language, style, and message are placed into the shareable URL so the recipient can open the final greeting page."
          },
          {
            title: "How shared links work",
            body:
              "Because the greeting state is stored in the link itself, anyone with the link can see the message details included in that URL. Do not place sensitive personal data in a greeting."
          },
          {
            title: "Ads and future updates",
            body:
              "The site includes homepage ad placement support. If analytics, advertising, or additional data collection are added later, this policy should be updated before public rollout."
          }
        ]
      },
      about: {
        eyebrow: "About",
        title: "About Eid Congrats App",
        intro:
          "Eid Congrats App is a lightweight greeting maker built to help someone create a polished Eid page quickly, then share it through a single personalized link.",
        sections: [
          {
            title: "Why this site exists",
            body:
              "The goal is to make festive sharing simple: one creator page for setup, one celebration page for the recipient, and no unnecessary account flow."
          },
          {
            title: "What makes the experience different",
            body:
              "The greeting page focuses on visual quality and the message itself, while the homepage handles the practical tools, support links, and future monetization structure."
          },
          {
            title: "What comes next",
            body:
              "The project is prepared for light monetization, support content, and future refinement without turning the greeting experience into an ad-heavy page."
          }
        ]
      },
      contact: {
        eyebrow: "Contact",
        title: "Contact and support",
        intro:
          "Use this page to give visitors a clear support path before launch. A real support email is recommended before you apply for ad network approval.",
        sections: [
          {
            title: "General questions",
            body:
              "Visitors may use the contact details here for help with the greeting tool, delivery questions, or general feedback."
          },
          {
            title: "Business and partnership requests",
            body:
              "This page can also handle sponsor, advertiser, or collaboration inquiries once the site starts attracting traffic."
          }
        ],
        emailLabel: "Support email",
        emailMissing:
          "Add your real support email in src/config/siteConfig.js or via VITE_SUPPORT_EMAIL before launch.",
        emailAction: "Email support"
      },
      faq: {
        eyebrow: "FAQ / How it works",
        title: "Frequently asked questions",
        intro:
          "The creator page and greeting page are intentionally separated. The creator handles setup, while the recipient page stays focused on the final festive message.",
        sections: [
          {
            title: "How does the greeting link work?",
            body:
              "The creator page packages the selected language, style, sender name, and message into the share URL. Opening that link loads the greeting page with the saved content."
          },
          {
            title: "Will recipients see ads?",
            body:
              "Not by default in this version. Monetization is currently centered on the homepage creator experience so the greeting view can remain mostly clean."
          },
          {
            title: "Can I use my own message?",
            body:
              "Yes. You can write a custom message or use the built-in generator and then preview everything before sharing."
          },
          {
            title: "What should I prepare before monetizing?",
            body:
              "Use a real support email, publish the support pages, keep the homepage content original, and switch from placeholder mode to your live AdSense IDs only when the site is ready."
          }
        ]
      }
    }
  },
  ar: {
    footerTagline:
      "أنشئ رابط تهنئة عيد أنيق، وحافظ على صفحة المستلم احتفالية ونظيفة، وأضف في الصفحة الرئيسية محتوى أصليًا كافيًا لتهيئة الموقع للإطلاق والثقة.",
    footerHome: "الرئيسية",
    footerLinks: {
      privacy: "سياسة الخصوصية",
      about: "من نحن",
      contact: "اتصل بنا",
      faq: "الأسئلة الشائعة / طريقة العمل"
    },
    backToHome: "العودة إلى منشئ التهنئة",
    supportNavLabel: "صفحات الدعم",
    homepage: {
      adLabel: "موضع إعلان الصفحة الرئيسية",
      adPlaceholder: "وضع المعاينة",
      adReady: "جاهز لـ AdSense",
      adHint: "أضف معرّف العميل ومعرّفات الوحدات الإعلانية الحقيقية في siteConfig عندما تصبح جاهزًا للإطلاق.",
      topAdTitle: "موضع إعلاني واحد وخفيف داخل صفحة المنشئ فقط",
      topAdDescription:
        "تم وضع هذا الموضع في الصفحة الرئيسية فقط حتى تبقى صفحة التهنئة للمستلم نظيفة وراقية.",
      howEyebrow: "كيف تعمل الأداة",
      howTitle: "خطوات بسيطة للمرسل وصفحة تهنئة أنيقة للمستلم",
      howIntro:
        "تساعدك الصفحة الرئيسية على كتابة الرسالة ومعاينتها ومشاركة رابط شخصي واحد، بينما يفتح المستلم صفحة تهنئة احتفالية جاهزة بدون ازدحام.",
      steps: [
        {
          title: "1. أضف بيانات المرسل",
          body: "اختر اللغة، واكتب اسم المرسل، وحدد نمط التهنئة المناسب."
        },
        {
          title: "2. اكتب الرسالة أو ولّدها",
          body: "استخدم كلماتك الخاصة أو مولّد الرسائل المدمج ثم راجع النتيجة في المعاينة المباشرة."
        },
        {
          title: "3. شارك رابطًا واحدًا",
          body: "يحمل الرابط الشخصي حالة التهنئة بحيث يفتح المستلم صفحة عيد جاهزة مباشرة."
        }
      ],
      trustCards: [
        {
          title: "تجربة نظيفة للمستلم",
          body: "صفحة التهنئة تركز على أجواء العيد والرسالة نفسها، بدون تكديس إعلاني مزعج."
        },
        {
          title: "بنية مناسبة للمراجعة والثقة",
          body: "وجود صفحات الدعم والمحتوى التوضيحي في الصفحة الرئيسية مع مواضع إعلانية محدودة يجعل الموقع أوضح وأكثر موثوقية."
        },
        {
          title: "سهولة في الإدارة لاحقًا",
          body: "معلومات عميل الإعلانات ومعرّفات الوحدات ووضع المعاينة موجودة في ملف إعداد واحد لتفعيل الإعلانات الحقيقية لاحقًا بسهولة."
        }
      ],
      moreTitle: "محتوى إضافي للزوار ولمساحة إعلانية مستقبلية",
      moreIntro:
        "تضيف هذه المنطقة محتوى أصليًا للموقع الآن، وتبقي مكانًا مناسبًا لوحدة إعلانية ثانية في الصفحة الرئيسية لاحقًا إذا رغبت في التوسع.",
      linkCards: [
        {
          id: "faq",
          title: "الأسئلة الشائعة / طريقة العمل",
          body: "اعرض إجابات واضحة حول طريقة عمل الرابط وما الذي يراه المستلم.",
          href: "#/faq",
          cta: "عرض الأسئلة الشائعة"
        },
        {
          id: "about",
          title: "من نحن",
          body: "اشرح فكرة الأداة ولماذا تركز على التهنئة الأنيقة وتجربة الاستخدام النظيفة.",
          href: "#/about",
          cta: "اقرأ المزيد"
        }
      ],
      lowerAdTitle: "مساحة إعلانية سفلية مستقبلية",
      lowerAdDescription:
        "اترك هذا الموضع هادئًا في الوقت الحالي. يمكن استخدامه لاحقًا كوحدة إعلانية ثانية في الصفحة الرئيسية عندما يصبح الموقع جاهزًا لذلك."
    },
    supportPages: {
      privacy: {
        eyebrow: "سياسة الخصوصية",
        title: "سياسة الخصوصية لأداة تهنئة العيد",
        intro:
          "تم تصميم هذا الموقع ليعمل بأقل قدر من التعقيد. لا يحتاج إلى حساب، ويتم تجهيز تفاصيل التهنئة داخل المتصفح ثم تمريرها عبر الرابط المشترك.",
        sections: [
          {
            title: "البيانات المدخلة في صفحة المنشئ",
            body:
              "عند إنشاء تهنئة، يتم وضع اسم المرسل واللغة والنمط والرسالة داخل الرابط القابل للمشاركة حتى يتمكن المستلم من فتح صفحة التهنئة النهائية."
          },
          {
            title: "كيف يعمل رابط المشاركة",
            body:
              "لأن حالة التهنئة محفوظة داخل الرابط نفسه، فإن أي شخص يملك الرابط يمكنه رؤية التفاصيل الموجودة فيه. لذلك لا تضع بيانات شخصية حساسة داخل الرسالة."
          },
          {
            title: "الإعلانات والتحديثات المستقبلية",
            body:
              "يتضمن الموقع دعمًا لمواضع إعلانية في الصفحة الرئيسية. وإذا تمت إضافة تحليلات أو إعلانات أو جمع بيانات إضافي لاحقًا، فيجب تحديث هذه السياسة قبل الإطلاق العام."
          }
        ]
      },
      about: {
        eyebrow: "من نحن",
        title: "عن Eid Congrats App",
        intro:
          "Eid Congrats App أداة خفيفة تساعد المستخدم على إنشاء صفحة تهنئة عيد أنيقة بسرعة ثم مشاركتها عبر رابط شخصي واحد.",
        sections: [
          {
            title: "لماذا تم إنشاء هذا الموقع",
            body:
              "الهدف هو جعل مشاركة التهنئة سهلة: صفحة واحدة للإنشاء، وصفحة واحدة للمستلم، وبدون تسجيل أو خطوات إضافية غير ضرورية."
          },
          {
            title: "ما الذي يميز التجربة",
            body:
              "تركز صفحة التهنئة على الجودة البصرية والرسالة نفسها، بينما تتولى الصفحة الرئيسية الأدوات العملية وصفحات الدعم والبنية الخاصة بتحقيق الدخل لاحقًا."
          },
          {
            title: "ما الخطوة التالية",
            body:
              "تم تجهيز المشروع لتحقيق دخل خفيف وصفحات دعم وتطويرات مستقبلية دون تحويل تجربة التهنئة نفسها إلى صفحة مزدحمة بالإعلانات."
          }
        ]
      },
      contact: {
        eyebrow: "اتصل بنا",
        title: "التواصل والدعم",
        intro:
          "استخدم هذه الصفحة لتوفير طريقة واضحة للتواصل قبل الإطلاق. يفضّل إضافة بريد دعم حقيقي قبل التقديم لأي شبكة إعلانية.",
        sections: [
          {
            title: "الأسئلة العامة",
            body:
              "يمكن للزوار استخدام بيانات التواصل هنا للاستفسار عن طريقة عمل الأداة أو إرسال الملاحظات أو طلب المساعدة."
          },
          {
            title: "الاستفسارات التجارية والشراكات",
            body:
              "يمكن استخدام الصفحة نفسها لاحقًا لطلبات الرعاية أو الإعلانات أو التعاون عندما يبدأ الموقع بجذب الزيارات."
          }
        ],
        emailLabel: "بريد الدعم",
        emailMissing:
          "أضف بريد الدعم الحقيقي داخل src/config/siteConfig.js أو عبر VITE_SUPPORT_EMAIL قبل الإطلاق.",
        emailAction: "مراسلة الدعم"
      },
      faq: {
        eyebrow: "الأسئلة الشائعة / طريقة العمل",
        title: "الأسئلة الشائعة",
        intro:
          "تم فصل صفحة الإنشاء عن صفحة التهنئة بشكل مقصود. صفحة المنشئ لإعداد الرابط، وصفحة المستلم مخصصة لعرض التهنئة النهائية فقط.",
        sections: [
          {
            title: "كيف يعمل رابط التهنئة؟",
            body:
              "تقوم صفحة المنشئ بوضع اللغة والنمط واسم المرسل والرسالة داخل رابط المشاركة، وعند فتحه تظهر صفحة التهنئة بالمحتوى نفسه."
          },
          {
            title: "هل سيرى المستلم إعلانات؟",
            body:
              "ليس بشكل افتراضي في هذه النسخة. يتركز تحقيق الدخل حاليًا في الصفحة الرئيسية الخاصة بالمنشئ حتى تبقى صفحة التهنئة نفسها نظيفة."
          },
          {
            title: "هل يمكنني كتابة رسالة خاصة؟",
            body:
              "نعم. يمكنك كتابة رسالة مخصصة أو استخدام مولد الرسائل المدمج ثم معاينتها قبل المشاركة."
          },
          {
            title: "ما الذي أحتاجه قبل تفعيل الإعلانات؟",
            body:
              "أضف بريد دعم حقيقيًا، وانشر صفحات الدعم، واجعل محتوى الصفحة الرئيسية أصليًا، ثم بدّل وضع المعاينة إلى بيانات AdSense الحقيقية عندما يصبح الموقع جاهزًا."
          }
        ]
      }
    }
  }
};
