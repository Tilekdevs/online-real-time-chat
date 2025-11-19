import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { auth, db } from "../firebase";

export const Context = createContext<{
  auth: typeof auth;
  db: typeof db;
  loading: boolean;
  user: any;
} | null>(null);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <Context.Provider value={{ auth, db, loading, user }}>
      {children}
    </Context.Provider>
  );
}
