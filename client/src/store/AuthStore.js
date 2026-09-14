import { create } from "zustand";
import axiosClient from "../libs/axios";
import axios from "axios";

const Auth = create((set) => ({
  userData: null,
  isAdmin: null,
  SignUpApi: async (data) => {
    let result = await axiosClient.post("/auth/register", data);
    set({ userData: result.data.data });
    // set({ isAdmin: result.data.data.role });
    return result.data.success;
  },
  SignInApi: async (data) => {
    try {
      let result = await axiosClient.post("/auth/login", data);
      set({ userData: result.data.data });

      set({ isAdmin: result.data.data.role });
      return result.data.success;
    } catch (error) {
      console.log("error", error);
    }
  },
  checkAuthApi: async () => {
    try {
      let { data } = await axiosClient.get("/auth/check");
      console.log(data);
      set({ userData: data.token.id });
      set({ isAdmin: data.token.role });
      // if (data.success) {
      //   window.location.href = "/dashboard";
      // }
    } catch (err) {
      console.log("error", err);
    }
  },
  logoutApi: async () => {
    try {
      let { data } = await axiosClient.get("/auth/logout");

      console.log(data);

      if (data.success) {
        alert("Logout Successfully");
        window.location.replace("/");
      }
    } catch (error) {
      console.log({
        error: "you Error ",
        errorinfo: error,
      });
    }
  },
}));

export default Auth;