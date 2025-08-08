// screens/EventsScreen.js
import React, { useContext } from "react";
import { View, FlatList, SafeAreaView, Text, StyleSheet } from "react-native";
import { EventsContext } from "../contexts/EventsProvider";
import EventCard from "../components/EventCard";

export default function EventsScreen({ navigation }) {
  const { events } = useContext(EventsContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(i) => i.id}
        contentContainerStyle={events.length === 0 ? styles.emptyContainer : styles.listContent}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate("CreateEdit", { event: item })}
            onEdit={(e) => navigation.navigate("CreateEdit", { event: e })}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No Events Published</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f6", 
    padding: 12,
  },
  listContent: {
    paddingBottom: 90, 
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#bb7a90", 
  },
});
