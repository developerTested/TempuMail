import express from "express";

import {
  randomEmail,
  costomEmail,
  //   saveEmail,
  isEmailExist,
} from "../controllers/email.js";

const router = express.Router();

router.get("/generatemail", randomEmail);
router.get("/checkmail-exist", isEmailExist);
router.post("/costom-mail", costomEmail);

export default router;
