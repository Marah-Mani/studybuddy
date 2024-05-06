import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("userId", "Please Enter User ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
];

const chatIdValidator = () => [param("id", "Please Enter Chat ID").notEmpty()];

const renameValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please Enter Secret Key").notEmpty(),
];

const PostValidator = (req, res, next) => {
  const { title, description, image, user, category } = req.body;
  if (!title || !description || !user || !category) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Title, Description and User",
    });
  }
  if (image.length > 5) {
    return res.status(400).json({
      success: false,
      message: "Max 5 images are allowed",
    })
  }
  if (image.length < 0) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Image",
    })
  }
  next();
}

const BypassChatValidator = async (req, res, next) => {
  console.log("BypassChatValidator");
  const { name, members } = req.body;
  if (!name || !members) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Name and Members",
    });
  }


  if (members[0].toString() === members[1].toString()) {
    return res.status(400).json({
      success: false,
      message: "You cannot add same user in a chat",
    });
  }
  if (members.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Chat must have at least 2 members",
    })
  }
  const query = {
    $and: [
      { members: { $size: 2 } }, // Ensures there are exactly 2 members
      { members: { $all: members } }, // Ensures both specified IDs are present
    ],
  };
  const chat = await Chat.findOne(query);
  console.log(chat);
  if (chat === null) {
    next();
  } else {
    return res.status(200).json({
      success: true,
      chatId: chat._id.toString(),
    })
  }
}

export {
  acceptRequestValidator,
  addMemberValidator,
  adminLoginValidator,
  chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  sendRequestValidator,
  validateHandler,
  PostValidator,
  BypassChatValidator,
};
