const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestBuckets = new Map();

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || "unknown";
}

function pruneExpiredBuckets(now) {
  for (const [key, bucket] of requestBuckets.entries()) {
    if (bucket.resetAt <= now) {
      requestBuckets.delete(key);
    }
  }
}

export function contactRateLimit(req, res, next) {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const ip = getClientIp(req);
  const bucket = requestBuckets.get(ip);

  if (!bucket || bucket.resetAt <= now) {
    requestBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }

  if (bucket.count >= MAX_REQUESTS) {
    const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    res.setHeader("Retry-After", String(retryAfterSeconds));
    res.status(429).json({
      success: false,
      error: {
        code: "RATE_LIMITED",
        message: "Too many messages were sent from this connection. Please wait a few minutes and try again.",
        retryAfterSeconds
      }
    });
    return;
  }

  bucket.count += 1;
  next();
}
