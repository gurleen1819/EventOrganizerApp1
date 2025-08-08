// screens/EventsScreen.js
import React, { useContext } from "react";
import { View, FlatList, SafeAreaView, Text } from "react-native";
import { EventsContext } from "../contexts/EventsProvider";
import EventCard from "../components/EventCard";

export default function EventsScreen({ navigation }) {
  const { events } = useContext(EventsContext);

  return (
    <SafeAreaView style={{ flex:1, padding:12 }}>
      <FlatList
        data={events}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => navigation.navigate("CreateEdit", { event: item })} onEdit={(e) => navigation.navigate("CreateEdit", { event: e })} />
        )}
        ListEmptyComponent={() => <Text>No Events Published</Text>}
      />
    </SafeAreaView>
  );
}
