import eidMessages from "../data/messages.json";

const SHORT_MESSAGE_WEIGHT = 0.55;

function normalizeMessageLanguage(language) {
  return language === "ar" ? "ar" : "en";
}

function pickRandomMessage(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return "";
  }

  const index = Math.floor(Math.random() * messages.length);
  return messages[index] ?? "";
}

function pickNonRepeatingMessage(messages, previousMessage) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return "";
  }

  const withoutPrevious = messages.filter((message) => message !== previousMessage);
  const source = withoutPrevious.length > 0 ? withoutPrevious : messages;
  return pickRandomMessage(source);
}

export function generateRandomEidMessage(language, previousMessage = "") {
  const normalizedLanguage = normalizeMessageLanguage(language);
  const languagePool = eidMessages[normalizedLanguage] ?? eidMessages.en;
  const preferredLength = Math.random() < SHORT_MESSAGE_WEIGHT ? "short" : "long";
  const fallbackLength = preferredLength === "short" ? "long" : "short";

  const preferredPool = languagePool[preferredLength] ?? [];
  const fallbackPool = languagePool[fallbackLength] ?? [];

  const preferredMessage = pickNonRepeatingMessage(preferredPool, previousMessage);
  if (preferredMessage && preferredMessage !== previousMessage) {
    return preferredMessage;
  }

  const fallbackMessage = pickNonRepeatingMessage(fallbackPool, previousMessage);
  if (fallbackMessage && fallbackMessage !== previousMessage) {
    return fallbackMessage;
  }

  const anyDifferentMessage = pickNonRepeatingMessage([...preferredPool, ...fallbackPool], previousMessage);
  if (anyDifferentMessage) {
    return anyDifferentMessage;
  }

  return preferredMessage || fallbackMessage || "";
}
