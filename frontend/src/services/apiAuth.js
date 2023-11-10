import axios from "axios";

axios.defaults.withCredentials = true;

// Login function
export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`/api/v1/users/login`, {
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
    const res = await axios.post("/api/v1/users/signup", {
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
    const res = await axios.get("/api/v1/users/getUser");

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
    const res = await axios.get("/api/v1/users/logout");

    if (res.data.status !== "success")
      throw new Error("Something went very wrong!");

    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
