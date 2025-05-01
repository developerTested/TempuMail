import express from "express";

import {
  generateEmail,
  customMail,
  handleIncoming,
  checkInbox,
  showAllMails,
  deleteAllMails,
} from "../controllers/email.js";

export const emailRouter = express.Router();

//  generate email
emailRouter.get("/generate", generateEmail);

// custom email
emailRouter.post("/custom", customMail);

// Handle incoming
emailRouter.post("/mailgun", handleIncoming);

// Get Inbox
emailRouter.get("/inbox/:email", checkInbox);

emailRouter.get("/all", showAllMails);

emailRouter.delete("/all", deleteAllMails);
