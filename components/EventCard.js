// components/EventCard.js
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";
import { EventsContext } from "../contexts/EventsProvider";

export default function EventCard({ event, onPress, onEdit, highlight }) {
  const { user } = useContext(AuthContext);
  const { deleteEvent, toggleFavorite } = useContext(EventsContext);

  const isFav = event.favorites?.includes(user?.uid);

 const handleToggleFavorite = () => {
  if (isFav) {
    Alert.alert(
      "Confirm",
      "Are you sure you want to remove this event from favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => toggleFavorite(event.id, true), 
          style: "destructive",
        },
      ]
    );
  } else {
    toggleFavorite(event.id, false); 
  }
};


  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, highlight ? styles.highlightCard : null]}
    >
      
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[styles.title, highlight ? styles.highlightTitle : null]}>
          {event.title}
        </Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Text style={{ fontSize: 18 }}>{isFav ? "★" : "☆"}</Text>
        </TouchableOpacity>
      </View>

     
      <Text style={highlight ? styles.highlightText : null}>
        {event.category} • {new Date(event.date).toLocaleString()}
      </Text>

     
      <Text
        numberOfLines={2}
        style={[{ marginTop: 6 }, highlight ? styles.highlightText : null]}
      >
        {event.description}
      </Text>

      {/* Edit & Delete buttons */}
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 8 }}
      >
        <TouchableOpacity onPress={() => onEdit?.(event)} style={styles.btn}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Confirm", "Delete this event?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteEvent(event.id),
              },
            ]);
          }}
          style={[styles.btn, { marginLeft: 8 }]}
        >
          <Text style={{ color: "red" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  highlightCard: {
    backgroundColor: "#fce4ec", 
    borderColor: "#f48fb1",
    shadowColor: "#f8bbd0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  highlightTitle: {
    color: "#880e4f",
  },
  highlightText: {
    color: "#6a1b9a",
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
});
