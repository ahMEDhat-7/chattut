import { User } from "../models/users.model.js";
import { getPayload } from "../utils/genToken.js";
import asyncWrapper from "./asyncWrapper.js";


export const verifyToken = asyncWrapper(async (req,res,next)=>{
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new Error("Token Required - No token provided"));
    }
    const payload = getPayload(token);
    if(!payload){
      return next(new Error("Invalid Token - Token is invalid or expired"))
    }
    const user = await User.findById(payload.id).select("-password");
    if(!user){
      return next(new Error("User Not Found - User does not exist"))
      }

    req.user = user;
    next();
  } catch (error) {
    return next(new Error("unauthorized access"));
  }
});