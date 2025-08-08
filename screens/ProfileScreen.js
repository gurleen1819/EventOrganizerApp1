import React, { useContext } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../contexts/AuthProvider";
import { EventsContext } from "../contexts/EventsProvider";
import EventCard from "../components/EventCard";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const { events } = useContext(EventsContext);

  const myEvents = events.filter((e) => e.ownerId === user.uid);
  const favorites = events.filter((e) => e.favorites?.includes(user.uid));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Profile</Text>
      <Text style={styles.emailText}>{user.email}</Text>

      <View style={styles.logoutWrapper}>
        <Button title="Logout" onPress={() => logout()} color="#f06292" />
      </View>

      <Text style={styles.sectionHeader}>My Events</Text>
      <FlatList
        data={myEvents}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateEdit", { event: item })}
          >
            <EventCard
              event={item}
              onEdit={(e) => navigation.navigate("CreateEdit", { event: e })}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No events</Text>
        )}
        contentContainerStyle={myEvents.length === 0 && styles.emptyContainer}
      />

      <Text style={styles.sectionHeader}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateEdit", { event: item })}
          >
            <EventCard event={item} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No favorites</Text>
        )}
        contentContainerStyle={favorites.length === 0 && styles.emptyContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff0f6",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ad1457",
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: "#ad1457",
    marginBottom: 20,
  },
  logoutWrapper: {
    marginVertical: 12,
    alignSelf: "flex-start",
    borderRadius: 10,
    overflow: "hidden",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ad1457",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    color: "#ad1457",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
