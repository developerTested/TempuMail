import Mailgun from "mailgun.js";
import crypto from "crypto";

const mailgun = new Mailgun({
  key: process.env.MAILGUN_API_KEY,
  username: "api",
  domain: process.env.MAILGUN_DOMAIN,
});
 
export const verifyWebhook = (body) => {
  try {
    const token = body.signature.token;
    const timestamp = body.signature.timestamp;
    const signature = body.signature.signature;

    const now = Date.now() / 1000;
    if (now - timestamp > 900) {
      return false;
    }

    const hash = crypto
      .createHash("sha256")
      .update(timestamp + process.env.MAILGUN_API_KEY)
      .digest("hex");

    return hash === signature;
  } catch (error) {
    console.error("Webhook verification failed:", error);
  }
};

export default mailgun;
