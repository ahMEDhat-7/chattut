import asyncWrapper from "../middlewares/asyncWrapper.js";
import { User } from "../models/users.model.js";
import { comparePassword, hashPassword } from "../utils/genHash.js";
import { getToken } from "../utils/genToken.js";
import cloudinary from './../lib/cloudinary.js';

export const signup = asyncWrapper(async (req, res,next) => {
 try {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password || password.length < 6 ) {
    return next(new Error("Invalid Input"))
   }
  const userExt = await User.findOne({email});
  if (userExt) {
    return next(new Error("Email already exists"))
  }

  const hPass = await hashPassword(password);
  const newUser = await User.create({
    fullName,
    email,
    password: hPass
  });
  const token = getToken({id:newUser._id});
  res.cookie("token",token,{
    maxAge: 1*24*60*60*1000,
    httpOnly:true,
    sameSite:"strict",
    secure: process.env.NODE_ENV !== "development"
  })
  return res.status(201).json({message: 'user created' });
 } catch (error) {

  next(error);
 }
})
export const login = asyncWrapper(async(req, res ,next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error('Please provide email or password'));
    }
    const userExt = await User.findOne({ email });
    if (!userExt) {
      return next(new Error('Invalid email or password'));
    }
    const isMatch = await comparePassword(password,userExt.password);
    if (!isMatch) {
      return next(new Error('Invalid email or password'));
    }
    const token = getToken({ id: userExt._id });
    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
      })
      return res.status(200).json({ message: 'user logged in' });
  } catch (error) {
    return next(error);
  }
  
});

export const logout = asyncWrapper(async(req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: 'user logged out' });
  } catch (error) {
    return next(error);
  }
});


export const update = asyncWrapper(async(req, res, next) => {
  try {
    const {profilePic} = req.body;

    if (!profilePic) {
      return next(new Error('Please provide profilePic'));
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(req.user._id , {profilePic:uploadResponse.secure_url} , {new:true});
    return res.status(200).json({message:"user profile picture add"});
  } catch (error) {
    return next(error);
  }
});


export const check = asyncWrapper(async(req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return next(error);
  }
});

