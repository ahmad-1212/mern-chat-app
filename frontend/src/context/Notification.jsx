import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);

  return context;
};

export { NotificationProvider, useNotification };
