import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);
const STORAGE_KEY = "user";

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (name) => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return;
    const id = "u_" + trimmed.toLowerCase().replace(/\s+/g, "_");
    setUser({ id, name: trimmed });
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
}

