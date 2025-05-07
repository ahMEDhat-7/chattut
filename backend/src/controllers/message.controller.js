import asyncWrapper from "../middlewares/asyncWrapper.js";
import { User } from './../models/users.model.js';
import { Message } from './../models/messages.model.js';
import cloudinary from "../lib/cloudinary.js";



export const findUsers = asyncWrapper(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const sideBarUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    return res.status(200).json(sideBarUsers);
  } catch (error) {
    return next(new CustomError(error.message, 500, STATUS.ERROR));
  }
});

export const getMessage = asyncWrapper(async (req, res, next) => {
  try {
    const userToChat = req.params.id;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: userToChat, receiverId: myId },
        { senderId: myId, receiverId: userToChat },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    return next(new CustomError(error.message, 500, STATUS.ERROR));
  }
});

export const sendMessage = asyncWrapper(async (req, res, next) => {
  try {
    const { text, img } = req.body;

    const userToChat = req.params.id;
    const myId = req.user._id;
    let imgUrl = "";
    if (img) {
      const uplaodedImg = await cloudinary.uploader.upload(img);
      imgUrl = uplaodedImg.secure_url;
    }
    const message = await Message.create({
      senderId: myId,
      receiverId: userToChat,
      text,
      img: imgUrl,
    });
    return res.status(201).json(message);
  } catch (error) {
    return next(new CustomError(error.message, 500, STATUS.ERROR));
  }
});