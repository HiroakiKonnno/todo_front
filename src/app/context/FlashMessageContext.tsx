import React, { createContext, useContext, useState, ReactNode } from "react";

type FlashMessageContextType = {
  message: string | null;
  setFlashMessage: (message: string) => void;
  clearFlashMessage: () => void;
};

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(
  undefined
);

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);

  const setFlashMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => setMessage(null), 3000); // 3秒後に消える
  };

  const clearFlashMessage = () => setMessage(null);

  return (
    <FlashMessageContext.Provider
      value={{ message, setFlashMessage, clearFlashMessage }}
    >
      {children}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (!context) {
    throw new Error(
      "useFlashMessage must be used within a FlashMessageProvider"
    );
  }
  return context;
};
