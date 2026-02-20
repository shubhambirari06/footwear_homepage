import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  joinDate: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData | null;
  login: (email: string, password: string) => { success: boolean; message?: string };
  register: (name: string, email: string, phone: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  updateUser: (user: UserData) => void;
  showAuthModal: boolean;
  authMode: 'login' | 'register';
  onOpenAuth: (mode: 'login' | 'register') => void;
  onCloseAuth: () => void;
  onAuthSuccess: (user: {
    email: string;
    name?: string;
    phoneNumber?: string;
    joinDate?: string;
  }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {}
    }
  }, []);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password,
    );

    if (foundUser) {
      const userData: UserData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phoneNumber: foundUser.phoneNumber,
        joinDate: foundUser.joinDate,
      };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const register = (
    name: string,
    email: string,
    phone: string,
    password: string,
  ) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u: any) => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      phoneNumber: phone,
      password,
      joinDate: new Date().toISOString().split("T")[0],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const userData: UserData = {
      id: newUser.id,
      name,
      email,
      phoneNumber: phone,
      joinDate: newUser.joinDate,
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("currentUser", JSON.stringify(userData));

    return { success: true, message: "Registration successful!" };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("currentUser");
  };

  const updateUser = (updatedUser: UserData) => {
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const onOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const onCloseAuth = () => {
    setShowAuthModal(false);
  };

  const onAuthSuccess = (
    userData: {
      email: string;
      name?: string;
      phoneNumber?: string;
      joinDate?: string;
    },
  ) => {
    if (!userData.email) {
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u: any) => u.email === userData.email);

    let userToSave: UserData;

    if (existingUser) {
      userToSave = { ...existingUser, name: userData.name || existingUser.name };
    } else {
      userToSave = {
        id: `user_${Date.now()}`,
        email: userData.email,
        name: userData.name || "New User",
        phoneNumber: userData.phoneNumber || "",
        joinDate: userData.joinDate || new Date().toISOString().split("T")[0],
      };
      users.push(userToSave);
      localStorage.setItem("users", JSON.stringify(users));
    }

    setUser(userToSave);
    setIsLoggedIn(true);
    localStorage.setItem("currentUser", JSON.stringify(userToSave));
    setShowAuthModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        register,
        logout,
        updateUser,
        showAuthModal,
        authMode,
        onOpenAuth,
        onCloseAuth,
        onAuthSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
