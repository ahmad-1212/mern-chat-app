import axios from "axios";
import { uploadImage } from "../utils/uploadImage";

axios.defaults.withCredentials = true;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get all chats relating to a login user
export const getChats = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/chats`);
    if (res.data.status !== "success")
      throw new Error("Something went very wrong!");
    return res.data.data.chats;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// Get single chat with chat id
export const getChat = async (chatId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/chats/singleChat/${chatId}`);
    if (res.data.status !== "success")
      throw new Error("Something went very wrong!");

    return res.data.data.chat;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// create a chat
export const createChat = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/chats/${userId}`);

    return res.data.data.chat;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const createGroupChat = async ({ users, groupName, image }) => {
  try {
    let photo;
    // If image exists first save image in cloudinary than set url to photo
    if (image) {
      const res = await uploadImage(image);
      const result = await res.json();
      photo = result.url;
    }

    // create group with data
    const res = await axios.post(`${API_BASE_URL}/chats/createGroupChat`, {
      chatName: groupName,
      users: JSON.stringify(users),
      photo,
    });
    if (res.data.status !== "success")
      throw new Error("Something went very wrong, please try again!");
    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// Function to remove user from group
export const removeGroupChatUser = async (userId, chatId) => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/chats/removeGroupChatUser`, {
      userId,
      chatId,
    });
    if (res.data.status !== "success")
      throw new Error("Something went very wrong, try again!");
    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
