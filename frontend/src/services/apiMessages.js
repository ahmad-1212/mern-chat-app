import axios from "axios";

axios.defaults.withCredentials = true;

// Get All messages related to a chat
export const getMessages = async (chatId) => {
  try {
    const res = await axios.get(`/api/v1/messages/${chatId}`);

    if (res.data.status !== "success")
      throw new Error("Something went very wrong!");

    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

// Send message or create message
export const createMessage = async (message, chatId) => {
  try {
    const res = await axios.post("/api/v1/messages", {
      content: message,
      chatId: chatId,
    });

    if (res.data.status !== "success")
      throw new Error("Something went very wrong!");

    return res.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
