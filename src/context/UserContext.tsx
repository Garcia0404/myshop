'use client'
import { useBodyOverflow } from "app/hooks/useBodyOverflow";
import React, { createContext, RefObject, useContext, useEffect, useRef, useState } from "react";

interface User {
  username: string;
  email: string;
}

interface ProviderProps {
  isLoged: boolean;
  setIsLoged: React.Dispatch<React.SetStateAction<boolean>>;
  checkSession: () => Promise<void>;
  user: User;
  openLogin: boolean
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
  refLogin: RefObject<HTMLDivElement>
}

const UserContext = createContext<ProviderProps | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoged, setIsLoged] = useState(false);
  const refLogin = useRef(null as unknown as HTMLDivElement)
  const [user, setUser] = useState<User>({ username: "", email: "" });
  const [openLogin, setOpenLogin] = useState(false)
  useBodyOverflow(openLogin)
  const checkSession = async () => {
    try {
      const response = await fetch("/api/validate-token");
      if (response.ok) {
        const data = await response.json();
        setIsLoged(true);
        setUser(data.data);
      } else {
        setIsLoged(false);
        setUser({ username: "", email: "" });
      }
    } catch (error) {
      console.error("Error al validar la sesión:", error);
      setIsLoged(false);
      setUser({ username: "", email: "" });
    }
  };

  useEffect(() => {
    checkSession();
  }, []);
  useEffect(() => {
    console.log('Está logeado ?', isLoged)
    if (isLoged) console.log(user)
  }, [isLoged])

  return (
    <UserContext.Provider value={{ isLoged, setIsLoged, checkSession, user, openLogin, setOpenLogin, refLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};