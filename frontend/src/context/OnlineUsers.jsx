import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { useUser } from "../features/Authentication/useUser";

const OnlineUsers = createContext();

const OnlineUsersProvider = ({ children }) => {
  const { user, isAuthenticated } = useUser();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      socket.connect();
      socket.emit("user-online", user?.user._id);
      socket.on("get-online-users", (users) => {
        setOnlineUsers(users);
      });
    }

    return () => socket.disconnect();
  }, [isAuthenticated, user?.user._id]);

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
