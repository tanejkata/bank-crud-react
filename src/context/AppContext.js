import React, { useContext, createContext, useState } from "react";
import Notification from "../components/Notification";

export const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    showNotification: false,
    message: "",
    type: "",
  });

  const showNotification = (message, type, time=800) => {
    setNotification({
      showNotification: true,
      message: message,
      type: type,
    });
    setTimeout(() => {
      setNotification({
        showNotification: false,
        message: "",
        type: "",
      });
    }, time);
  };

  return (
    <AppContext.Provider value={{ showNotification }}>
      {notification.showNotification ? (
        <Notification message={notification.message} type={notification.type} />
      ) : (
        <></>
      )}
      {children}
    </AppContext.Provider>
  );
};
