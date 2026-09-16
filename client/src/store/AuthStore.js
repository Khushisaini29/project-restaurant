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
      const result = await axiosClient.post("/auth/login", data);

      set({
        userData: result.data.data,
        isAdmin: result.data.data.role,
      });

      return result.data.success;
    } catch (error) {
      console.log(
        "Login Error:",
        error.response?.data || error.message
      );

      return false;
    }
  },
  checkAuthApi: async () => {
  try {
    const { data } = await axiosClient.get("/auth/check");

    console.log("Check Auth Response:", data);

    set({
      userData: data.token.id,
      isAdmin: data.token.role,
    });

  } catch (err) {
    console.log("CHECK AUTH ERROR:", err.response?.data);
    console.log("STATUS:", err.response?.status);
    console.log("MESSAGE:", err.message);
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