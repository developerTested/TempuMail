import redis from "../db/Redis.js";
import { ApiError } from "../ApiError.js";
import { ApiResponse } from "../ApiResponse.js";

/**
 * Get Domain
 */
const domains = process.env.MAILGUN_DOMAIN;

export const generateEmail = async (req, res) => {
  try {
    const userIp = req.ip;
    const userKey = `user: ${userIp}:email_count`;
    const emailLimit = 5;
    const emailCount = await redis.get(userKey);


    if(emailCount && parseInt(emailCount) => emailLimit){
      
    }

    const username = Math.random().toString(36).substring(2, 10);
    const email = `${username}@${process.env.MAILGUN_DOMAIN}`;

    /**
     * Check Email exists or not
     */
    if (!(await redis.exists(email))) {
      await redis.json.set(email, "$", []);
      await redis.expire(email, 10 * 60);
    }

    return res
      .status(201)
      .json(new ApiResponse(email, "Email generated and save into redis"));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiError(500, "An Error occurred while generating an email"));
  }
};

export const customMail = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.json(new ApiError(400, "Invalid Input"));
    }

    const email = `${username}@${domains}`;

    /**
     * Check Email exists or not
     */
    if (!(await redis.exists(email))) {
      await redis.json.set(email, "$", []);
      await redis.expire(email, 10 * 60);
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          email,
          "Your custom email has been generated successfully!"
        )
      );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "An Error occurred while generating custom email address"
        )
      );
  }
};

/**
 * Malingun Handler
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const handleIncoming = async (req, res) => {
  try {
    const {
      recipient,
      sender,
      subject,
      "body-plain": body,
      "body-html": bodyHtml,
      attachment,
      Date: mailDate,
    } = req.body;

    if (
      [recipient, sender, body, bodyHtml].some((field) => field?.trim() === "")
    ) {
      return res.status(400).json(new ApiError(400, "Bad Request"));
    }

    const mailData = {
      sender,
      subject,
      body,
      html: bodyHtml,
      date: mailDate || new Date().toISOString(),
      attachment: attachment || null,
    };

    const emailExists = await redis.json.get(recipient);

    if (!emailExists) {
      return res.status(404).json(new ApiError(404, "Email does not Exists!"));
    }

    await redis.json.arrappend(
      recipient,
      "$",
      JSON.parse(JSON.stringify(mailData))
    );

    return res
      .status(200)
      .json(new ApiResponse(mailData, "Email stored successfully"));
  } catch (error) {
    console.error("Error while handing email :", error);
    return res.status(500).json(new ApiError(500, "mail not processing "));
  }
};

/**
 * Get all emails
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const checkInbox = async (req, res) => {
  const { email } = req.params;
  try {
    const inbox = await redis.json.get(email);

    if (!inbox) {
      return res.status(404).json(new ApiError(404, "Inbox not found!"));
    }
    return res.status(200).json(new ApiResponse(inbox || [], "Inbox Fetched"));
  } catch (error) {
    console.error("Error fetching inbox:", error);
    return res
      .status(500)
      .json(new ApiError(500, "An Error occurred while fetching Inbox"));
  }
};

/**
 * This function has bug
 * @returns
 */
export const showAllMails = async (req, res) => {
  const emails = await redis.keys(`*${domains}`);

  if (!emails) {
    return res.json(new ApiResponse([], "No Emails"));
  }

  const total = emails.length || 0;

  return res.json(new ApiResponse({ total, emails }, "All Emails Fetched!"));
};

/**
 * Delete all mails stored in redis.
 */
export const deleteAllMails = async (req, res) => {
  try {
    const mailIds = await redis.keys(`*${domains}`);

    if (Array.isArray(mailIds)) {
      mailIds.map(async (mail) => {
        await redis.expire(mail, 5);
      });

      return res.json(new ApiResponse(null, "All Mails has been deleted!"));
    }

    return res.json(new ApiResponse(null, "No Mails were deleted!"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Unable to delete all mails", error.message));
  }
};
