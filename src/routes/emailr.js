import express from "express";

import {
  generateEmail,
  hanleIncoming,
  checkInbox,
  showAllMails,
} from "../controllers/email.js";

const router = express.Router();

//  generate email

router.get("/generate", generateEmail);

// handle incoming

router.post("/mailgun", hanleIncoming);

//  get inbox

router.get("/inbox/:email", checkInbox);
router.get("/all", showAllMails);

export default router;
