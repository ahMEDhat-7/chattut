import { User } from "../models/users.model.js";
import { getPayload } from "../utils/genToken.js";
import { CustomError, STATUS } from "../utils/responseHelpers.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(
        new CustomError("Token Required - No token provided", 400, STATUS.FAIL)
      );
    }
    const payload = getPayload(token);
    if (!payload) {
      return next(
        new CustomError(
          "Invalid Token - Token is invalid or expired",
          401,
          STATUS.ERROR
        )
      );
    }
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return next(
        new CustomError(
          "User Not Found - User does not exist",
          404,
          STATUS.ERROR
        )
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return new CustomError(
      "Invalid Token - Token is invalid or expired",
      401,
      STATUS.ERROR
    );
  }
};