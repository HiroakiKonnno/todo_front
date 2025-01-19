import React, { createContext, useContext, useState, ReactNode } from "react";

type FlashMessageContextType = {
  message: string | null;
  type: "success" | "fail" | null;
  setFlashMessage: (message: string, type: "success" | "fail") => void;
  clearFlashMessage: () => void;
};

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(
  undefined
);

type Message = {
  message: string | null;
  type: "success" | "fail" | null;
};

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<Message>({
    message: null,
    type: null,
  });

  const setFlashMessage = (message: string, type: "success" | "fail") => {
    setMessage({ message: message, type: type });
    setTimeout(() => setMessage({ message: null, type: null }), 3000); // 3秒後に消える
  };

  const clearFlashMessage = () => setMessage({ message: null, type: null });

  return (
    <FlashMessageContext.Provider
      value={{
        message: message.message,
        type: message.type,
        setFlashMessage,
        clearFlashMessage,
      }}
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
