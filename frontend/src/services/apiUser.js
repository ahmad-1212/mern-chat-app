import axios from "axios";
import { uploadImage } from "../utils/uploadImage";

axios.defaults.withCredentials = true;

// Search user with query
export const searchUser = async (query) => {
  try {
    const res = await axios.get(`/api/v1/users/searchUser?query=${query}`);

    if (res.data.status !== "success")
      throw new Error("Something went very wrong!");

    return res.data.data.users;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// Update login user data
export const updateUser = async (data) => {
  try {
    // if user want to upload a new image
    let photo;
    if (data.photo) {
      const res = await uploadImage(data.photo);
      const result = await res.json();
      photo = result.url;
    }

    // update user data
    const res = await axios.patch("/api/v1/users/updateUser", {
      name: data.name,
      email: data.email,
      photo: photo,
    });
    if (res.data.status !== "success")
      throw new Error("Something went very wrong, try again");

    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
