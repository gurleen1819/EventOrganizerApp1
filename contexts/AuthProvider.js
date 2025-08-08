// contexts/AuthProvider.js
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    return unsub;
  }, []);

  const signUp = async (email, password) => {
    if (!email || !password) throw new Error("Email and password required");
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    if (!email || !password) throw new Error("Email and password required");
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      Alert.alert("Logout failed", e.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, initializing, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
