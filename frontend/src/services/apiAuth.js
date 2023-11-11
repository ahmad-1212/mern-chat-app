import axios from "axios";

axios.defaults.withCredentials = true;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Login function
export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
    });
    if (res.data.data.status === "success")
      throw new Error("Something went very wrong, Try again!");
    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// Signup function
export const signup = async ({
  fullName,
  email,
  password,
  passwordConfirm,
}) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/signup`, {
      name: fullName,
      email,
      password,
      passwordConfirm,
    });

    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// Get User function
export const getUser = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/getUser`);
    if (res.data.status !== "success")
      throw new Error("Something went very wrong!");
    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// Logout function
export const logout = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/logout`);

    if (res.data.status !== "success")
      throw new Error("Something went very wrong!");

    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
