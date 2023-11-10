import { createContext, useContext, useState } from "react";

const OnlineUsers = createContext();

const OnlineUsersProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState(null);

  return (
    <OnlineUsers.Provider
      value={{
        onlineUsers,
        chatUsers,
        setChatUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </OnlineUsers.Provider>
  );
};

const useOnlineUsers = () => {
  const context = useContext(OnlineUsers);
  if (context === undefined)
    throw new Error("Chat user hook is used out side of chat user provider");
  return context;
};

export { OnlineUsersProvider, useOnlineUsers };
