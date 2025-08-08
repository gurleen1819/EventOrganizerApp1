// screens/ProfileScreen.js
import React, { useContext } from "react";
import { View, Text, Button, SafeAreaView, FlatList } from "react-native";
import { AuthContext } from "../contexts/AuthProvider";
import { EventsContext } from "../contexts/EventsProvider";
import EventCard from "../components/EventCard";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const { events } = useContext(EventsContext);

  const myEvents = events.filter(e => e.ownerId === user.uid);
  const favorites = events.filter(e => e.favorites?.includes(user.uid));

  return (
    <SafeAreaView style={{ flex:1, padding:12 }}>
      <Text style={{ fontSize:20, fontWeight:"700" }}>Profile</Text>
      <Text style={{ marginTop:8 }}>{user.email}</Text>
      <View style={{ marginVertical:12 }}>
        <Button title="Logout" onPress={() => logout()} color="#d9534f" />
      </View>

      <Text style={{ fontSize:18, marginTop:12 }}>My Events</Text>
      <FlatList data={myEvents} keyExtractor={(i)=>i.id} renderItem={({ item }) => (
        <EventCard event={item} onPress={() => navigation.navigate("CreateEdit", { event: item })} onEdit={(e) => navigation.navigate("CreateEdit", { event: e })} />
      )} ListEmptyComponent={() => <Text>No events</Text>} />

      <Text style={{ fontSize:18, marginTop:12 }}>Favorites</Text>
      <FlatList data={favorites} keyExtractor={(i)=>i.id} renderItem={({ item }) => (
        <EventCard event={item} onPress={() => navigation.navigate("CreateEdit", { event: item })} />
      )} ListEmptyComponent={() => <Text>No favorites</Text>} />
    </SafeAreaView>
  );
}
