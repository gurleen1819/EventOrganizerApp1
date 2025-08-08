// screens/HomeScreen.js
import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Using MaterialIcons
import { AuthContext } from "../contexts/AuthProvider";
import { EventsContext } from "../contexts/EventsProvider";
import CategoryList from "../components/CategoryList";
import EventCard from "../components/EventCard";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const { events, loading } = useContext(EventsContext);
  const [category, setCategory] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (category !== "All" && e.category !== category) return false;
      const text = (e.title + " " + e.description).toLowerCase();
      if (q && !text.includes(q.toLowerCase())) return false;
      return true;
    });
  }, [events, category, q]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>gatherup</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search events"
          style={styles.search}
          value={q}
          onChangeText={setQ}
          placeholderTextColor="#bb7a90"
        />
        <TouchableOpacity style={styles.iconBtn}>
          <Icon name="search" size={22} color="#f06292" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <CategoryList selected={category} onSelect={setCategory} />

      {/* Events */}
      <Text style={styles.sectionTitle}>Events</Text>
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.eventsList}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate("CreateEdit", { event: item })}
            onEdit={(e) => navigation.navigate("CreateEdit", { event: e })}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No events yet.</Text>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="home" size={26} color="#f06292" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate("Events")}
        >
          <Icon name="event" size={26} color="#f06292" />
          <Text style={styles.navLabel}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate("CreateEdit")}
        >
          <View style={styles.addBtn}>
            <Icon name="add" size={32} color="#fff" />
          </View>
          <Text style={styles.navLabel}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon name="person" size={26} color="#f06292" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f6", // soft pink background
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8bbd0", // soft pink border
    backgroundColor: "#fff0f6",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ad1457", // deep pink
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    shadowColor: "#f48fb1", // pink shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  search: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#ad1457",
  },
  iconBtn: {
    padding: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
    marginLeft: 12,
    marginBottom: 6,
    color: "#ad1457",
  },
  eventsList: {
    paddingHorizontal: 12,
    paddingBottom: 90, // space for bottom nav
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#bb7a90",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    paddingBottom: 16,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#f8bbd0",
    backgroundColor: "#fff0f6",
  },
  navBtn: {
    flex: 1,
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    color: "#f06292",
    marginTop: 4,
    fontWeight: "600",
  },
  addBtn: {
    backgroundColor: "#f06292",
    borderRadius: 30,
    padding: 8,
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
  },
});
