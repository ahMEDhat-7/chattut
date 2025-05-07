import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useAuth = create((set)=>({
  authUser:null,
  isSigningUp :false,
  isLoggingIn :false,
  isUpdatingProfile:false,
  isCheckingAuth:true,

  checkAuth: async()=>{
    try {
      
      const res = await axiosInstance.get('/auth/check');
      set({authUser:res.data});

    } catch (error) {
      console.log("CHECK-AUTH-ERROR :", error); 
      set({authUser:null});
    }finally{
      set({isCheckingAuth:false});
    }
  },
  signup : async (data)=>{
    try {
      set({isSigningUp: true});
      const res = await axiosInstance.post('/auth/signup',data);
      set({authUser:res.data});
      toast.success("Account Created Successfully");

    } catch (error) {
      console.log("CHECK-AUTH-ERROR :", error); 
      set({authUser:null});
    }finally{
      set({isSigningUp:false});
    }
  },
  login : async (data)=>{
    try {
      set({isLoggingIn: true});
      const res = await axiosInstance.post('/auth/login',data);
      set({authUser:res.data});
      toast.success("Logged In Successfully");

    } catch (error) {
      console.log("CHECK-AUTH-ERROR :", error); 

      toast.error(error.response.data.error.message)
      set({authUser:null});
    } finally{
      
      set({isLoggingIn:false});
    }
  },
  logout : async ()=>{
    try {
      const res = await axiosInstance.post('/auth/logout');
      set({authUser:null});
      toast.success("Logged out Successfully");

    } catch (error) {
      console.log("CHECK-AUTH-ERROR :", error);
    }
  }

}));
