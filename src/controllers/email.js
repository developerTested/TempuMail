import redis from "../db/Radis.js";

//  random domain generator

const generatRandomDomain = () => {
  const tdsl = ["com"];
  const randomName = Math.random().toString(36).substring(2, 9);
  const randomTlds = tdsl[0];
  return `${randomName}.${randomTlds}`;
};

//   random email generater function

export const randomEmail = (length = 8) => {
  let letter = "abcdefghijklmnopqrtsuvwxyz";
  let username = "";

  for (let i = 0; i < length; i++) {
    username = username + letter[Math.floor(Math.random() * letter.length)];
    // username = username + letter[Math.floor(Math.random() * letter.length)];
  }

  const domain = generatRandomDomain();
  const email = `${username}@${domain}`;

  console.log("username", username);

  console.log("email generating  :", email);
  return email;
};

export const saveEmail = async (email) => {
  try {
    console.log("Email stored successfully in redis ");
    await redis.set(email, "active", "EX", 1200);
  } catch (error) {
    console.error("Error email save in redis :", error);
  }
};
// costom mail

export const costomEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ messege: "Costom email required" });
    }

    return res.status(200).json({
      messege: "Costom email created successfully",
      email,
    });
  } catch (error) {
    return res.status(500).json({ messege: "server error ", error });
  }
};

//   check if email exist

export const isEmailExist = async (email) => {
  try {
    const exist = await redis.get(email);

    if (exist !== null) {
      return {
        status: "exist",
        message: `Email ${email} exist ,please try another`,
      };
    } else {
      return {
        status: "not_exist",

        message: `email ${email} is avalable`,
      };
    }
  } catch (error) {
    console.error("Error while checking email in redis:", error);
    return {
      status: "error",
      message: "something went wrong while checking the email",
    };
  }
};
