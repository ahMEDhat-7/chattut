import mongoose from "mongoose";



export const dbConnect = async ()=> {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("DataBase Connected Successfully to " + conn.connection.db.namespace);
    
  } catch (error) {
    console.log("Cant Connect DataBase !!!");
  }

} 
