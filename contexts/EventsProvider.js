// contexts/EventsProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  where
} from "firebase/firestore";
import { AuthContext } from "./AuthProvider";
import { Alert } from "react-native";

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(docu => ({ id: docu.id, ...docu.data() }));
      setEvents(items);
      setLoading(false);
    }, (err) => {
      console.log("events snapshot error:", err);
      setLoading(false);
    });
    return unsub;
  }, []);

  const createEvent = async (payload) => {
    const docRef = await addDoc(collection(db, "events"), payload);
    return docRef.id;
  };

  const updateEvent = async (eventId, updates) => {
    const d = doc(db, "events", eventId);
    await updateDoc(d, updates);
  };

  const deleteEvent = async (eventId) => {
    await deleteDoc(doc(db, "events", eventId));
  };

  const toggleFavorite = async (eventId, isFav) => {
    const d = doc(db, "events", eventId);
    // maintain favorites as array of uids
    try {
      if (isFav) {
        // remove
        await updateDoc(d, {
          favorites: (events.find(e => e.id === eventId)?.favorites || []).filter(uid => uid !== user.uid)
        });
      } else {
        // add
        const existing = events.find(e => e.id === eventId)?.favorites || [];
        const newFavorites = existing.includes(user.uid) ? existing : [...existing, user.uid];
        await updateDoc(d, { favorites: newFavorites });
      }
    } catch (e) {
      Alert.alert("Favorite update failed", e.message);
    }
  };

  return (
    <EventsContext.Provider value={{
      events,
      loading,
      createEvent,
      updateEvent,
      deleteEvent,
      toggleFavorite
    }}>
      {children}
    </EventsContext.Provider>
  );
};
