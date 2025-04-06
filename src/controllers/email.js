// import Redis from "ioredis";
import redis from "../db/Redis.js";
import mailgun, { verifyWebhook } from "../mailgun.js";

// generate email

const generateEmail = async (req, res) => {
  try {
    // create emailkey
    const domains = process.env.MAILGUN_DOMAIN;
    const username = Math.random().toString(36).substring(2, 10);
    const email = `${username}@${process.env.MAILGUN_DOMAIN}`;

    console.log(domains);
    console.log(email);

    // store email in redis

    await redis.set(email, email, "EX", 1200);

    return res
      .status(201)
      .json({ message: "email generated and save in redis", email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error while generate email" });
  }
};

//  handle incoming mail

const hanleIncoming = async (req, res) => {
  try {
    //  validate maligun hook

    if (!verifyWebhook(req.body)) {
      return res.status(401).json({ error: "Invalid signature" });
    }
    const { recipient, sender, subject, "body-plain": body } = req.body;

    //  redis existing email
    const inbox = JSON.parse((await redis.get(recipient)) || "[]");

    inbox.push({
      sender,
      subject,
      body,
      date: new Date().toISOString(),
    });
    await redis.set(recipient, JSON.stringify(inbox));
    res.status(200).json({ message: "Email stored successfully" });
  } catch (error) {
    console.error("Error while handing email :", error);
    res.status(500).json({ error: "mail not processing " });
  }
};

//  check inbox

const checkInbox = async (req, res) => {
  const { email } = req.params;
  try {
    const inbox = await redis.get(email);
    return res.status(200).json(inbox ? JSON.parse(inbox) : []);
  } catch (error) {
    console.error("Error fetching inbox:", error);
    res.status(500).json({ error: "Server error!" });
  }
};
export { generateEmail, hanleIncoming, checkInbox };
