const localSiteConfig = {
  siteName: "Eid Congrats App",
  contactEmail: "",
  adsenseClientId: "",
  homepageTopSlotId: "",
  homepageLowerSlotId: "",
  usePlaceholderAds: true
};

const env = import.meta.env;

const placeholderOverride = env.VITE_ADSENSE_USE_PLACEHOLDER;

export const siteConfig = {
  siteName: env.VITE_SITE_NAME || localSiteConfig.siteName,
  contactEmail: env.VITE_SUPPORT_EMAIL || localSiteConfig.contactEmail,
  ads: {
    adsenseClientId: env.VITE_ADSENSE_CLIENT_ID || localSiteConfig.adsenseClientId,
    homepageTopSlotId: env.VITE_ADSENSE_HOMEPAGE_TOP_SLOT_ID || localSiteConfig.homepageTopSlotId,
    homepageLowerSlotId: env.VITE_ADSENSE_HOMEPAGE_LOWER_SLOT_ID || localSiteConfig.homepageLowerSlotId,
    usePlaceholderAds:
      placeholderOverride == null
        ? localSiteConfig.usePlaceholderAds
        : placeholderOverride !== "false"
  }
};
