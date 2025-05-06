import jwt from "jsonwebtoken";


export const getToken = (payload)=>{
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d"
    });
    return token;
}

export const getPayload = (token)=>{
  return jwt.verify(token,process.env.JWT_SECRET_KEY);
}