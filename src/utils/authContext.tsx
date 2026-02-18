import React, { createContext, useContext, useState, useEffect } from 'react';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  // On mount, check localStorage for saved user
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to parse saved user');
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

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
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (name: string, email: string, phone: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: any) => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      phoneNumber: phone,
      password,
      joinDate: new Date().toISOString().split('T')[0],
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userData: UserData = {
      id: newUser.id,
      name,
      email,
      phoneNumber: phone,
      joinDate: newUser.joinDate,
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    return { success: true, message: 'Registration successful!' };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedUser: UserData) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout, updateUser }}>
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
