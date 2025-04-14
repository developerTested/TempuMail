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
    if (!await redis.exists(email)) {
      await redis.json.set(email, "$", [], "EX", 60);
    }


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

    // if (!verifyWebhook(req.body)) {
    //   return res.status(401).json({ error: "Invalid signature" });
    // }

    const {
      recipient,
      sender,
      subject,
      "body-plain": body,
      "body-html": bodyHtml,
      Date: mailDate,
    } = req.body;

    const mailData = {
      sender,
      subject,
      body,
      html: bodyHtml,
      date: mailDate || new Date().toISOString(),
    };
    //  redis existing email

    const emailExists = await redis.get(recipient);

    if (!emailExists) {
      return res.status(404).json({ message: "Email not found" });
    }
    //

    await redis.json.arrappend(recipient, "$", JSON.parse(JSON.stringify(mailData)));

    res.status(200).json({ message: "Email stored successfully", mailData });
  } catch (error) {
    console.error("Error while handing email :", error);
    res.status(500).json({ error: "mail not processing " });
  }
};

//  check inbox

const checkInbox = async (req, res) => {
  const { email } = req.params;
  try {
    const inbox = await redis.json.get(email);

    if (!inbox) {
      return res.status(404).json({ message: "Inbox not found" });
    }
    return res.status(200).json(inbox ? inbox : []);
  } catch (error) {
    console.error("Error fetching inbox:", error);
    res.status(500).json({ error: "Server error!" });
  }
};

//  show all email

const showAllMails = async (req, res) => {
  try {
    const keys = await redis.keys("*");
    for (const key of keys) {
      const data = await redis.json.get(key);
      emails.push(data);
    }
    return res.json(emails || []);
  } catch (error) {
    console.error("Error show all emails:", error);
    res.status(500).json({ error: "Server error!" });
  }
};
export { generateEmail, hanleIncoming, checkInbox, showAllMails };

// import redis from "../db/Redis.js";
// import dotenv from "dotenv";

// dotenv.config();

// // generate email
// // export const generateEmail = async (req, res) => {
// try {
//   const domains = process.env.MAILGUN_DOMAIN;
//   const username = Math.random().toString(36).substring(2, 10);
//   const email = `${username}@${domains}`;

// store email in redis
//   if (!(await redis.exists(email))) {
//     await redis.json.set(email, "$", [], "EX", 60);
//   }

//   return res
//     .status(201)
//     .json({ data: email, message: "Email generated and saved in redis" });
// } catch (error) {
//   console.error(error);
//   return res.status(500).json({ error: "Error while generating email" });
// }
// // };

// // handle incoming mail
// export const handleIncoming = async (req, res) => {
//   try {
//     const {
//       recipient,
//       sender,
//       subject,
//       "body-plain": body,
//       "body-html": bodyHtml,
//       Date: mailDate,
//     } = req.body;

//     const mailData = {
//       sender,
//       subject,
//       body,
//       html: bodyHtml,
//       date: mailDate || new Date().toISOString(),
//     };

//     const emailExists = await redis.json.get(recipient);

//     if (!emailExists) {
//       return res.status(404).json({ error: "Email not found!" });
//     }

//     await redis.json.arrappend(recipient, "$", mailData);

//     return res.status(200).json({
//       data: mailData,
//       message: "Email stored successfully!",
//     });
//   } catch (error) {
//     console.error("Error while handling email:", error);
//     return res.status(500).json({ error: "Failed to process email" });
//   }
// };

// // check inbox
// export const checkInbox = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const inbox = await redis.json.get(email);

//     if (!inbox) {
//       return res.json({ data: [], message: "No emails found" });
//     }

//     return res.json({ data: inbox, message: "Inbox fetched" });
//   } catch (error) {
//     console.error("Error fetching inbox:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// // show all emails (debugging)
// export const showAllMails = async (req, res) => {
//   try {
//     const keys = await redis.keys("*");
//     const emails = [];

//     for (const key of keys) {
//       const data = await redis.json.get(key);
//       emails.push(data);
//     }

//     return res.json({ data: emails, message: "All emails retrieved" });
//   } catch (error) {
//     console.error("Error fetching all emails:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };
