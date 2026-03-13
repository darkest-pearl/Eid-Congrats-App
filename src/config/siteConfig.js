const localSiteConfig = {
  siteName: "Eid Congrats App",
  contactEmail: "musabcreate@gmail.com",
  adsenseClientId: "",
  homepageTopSlotId: "",
  homepageLowerSlotId: "",
  usePlaceholderAds: true
};

const env = import.meta.env;

function readConfigValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePlaceholderOverride(value) {
  const normalized = readConfigValue(value).toLowerCase();
  if (!normalized) {
    return null;
  }
  return normalized !== "false";
}

const adsenseClientId = readConfigValue(env.VITE_ADSENSE_CLIENT_ID) || localSiteConfig.adsenseClientId;
const homepageTopSlotId =
  readConfigValue(env.VITE_ADSENSE_HOMEPAGE_TOP_SLOT_ID) || localSiteConfig.homepageTopSlotId;
const homepageLowerSlotId =
  readConfigValue(env.VITE_ADSENSE_HOMEPAGE_LOWER_SLOT_ID) || localSiteConfig.homepageLowerSlotId;
const placeholderOverride = parsePlaceholderOverride(env.VITE_ADSENSE_USE_PLACEHOLDER);
const hasConfiguredHomepageAds = Boolean(adsenseClientId && homepageTopSlotId && homepageLowerSlotId);
const defaultPlaceholderMode = hasConfiguredHomepageAds ? false : localSiteConfig.usePlaceholderAds;

export const siteConfig = {
  siteName: readConfigValue(env.VITE_SITE_NAME) || localSiteConfig.siteName,
  contactEmail: readConfigValue(env.VITE_SUPPORT_EMAIL) || localSiteConfig.contactEmail,
  ads: {
    adsenseClientId,
    homepageTopSlotId,
    homepageLowerSlotId,
    hasConfiguredHomepageAds,
    usePlaceholderAds: placeholderOverride == null ? defaultPlaceholderMode : placeholderOverride
  }
};
