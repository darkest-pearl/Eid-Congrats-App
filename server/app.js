import express from "express";
import { sendContactEmail } from "./mailer.js";
import { contactRateLimit } from "./rateLimit.js";
import { validateContactPayload } from "./validation.js";

const app = express();

app.set("trust proxy", true);
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    status: "ok"
  });
});

app.post("/api/contact", contactRateLimit, async (req, res) => {
  const validation = validateContactPayload(req.body);

  if (!validation.isValid) {
    res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Please correct the highlighted fields and try again.",
        fields: validation.fields
      }
    });
    return;
  }

  try {
    await sendContactEmail(validation.data);
    res.json({
      success: true,
      message: "Your message has been sent successfully."
    });
  } catch (error) {
    if (error?.code === "CONFIG_ERROR") {
      res.status(500).json({
        success: false,
        error: {
          code: "CONFIG_ERROR",
          message: "The contact service is not configured correctly on the server."
        }
      });
      return;
    }

    console.error("Failed to send contact email:", error);
    res.status(502).json({
      success: false,
      error: {
        code: "EMAIL_SEND_FAILED",
        message: "We could not send your message right now. Please try again later."
      }
    });
  }
});

app.use("/api", (_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "API route not found."
    }
  });
});

export default app;
