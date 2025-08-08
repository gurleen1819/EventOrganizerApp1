import React, { useContext, useState, useEffect } from "react"; // <-- added useEffect
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { EventsContext } from "../contexts/EventsProvider";
import { AuthContext } from "../contexts/AuthProvider";

const CATEGORIES = ["Music", "Art", "Tech", "Sports", "Other"];

export default function CreateEditEventScreen({ route, navigation }) {
  const editingEvent = route.params?.event;

  // Dynamically set navigation header title
  useEffect(() => {
    navigation.setOptions({
      title: editingEvent ? "Edit Event" : "Create Event",
    });
  }, [editingEvent, navigation]);

  const { createEvent, updateEvent } = useContext(EventsContext);
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(editingEvent?.title || "");
  const [description, setDescription] = useState(editingEvent?.description || "");
  const [category, setCategory] = useState(editingEvent?.category || "Other");
  const [date] = useState(
    editingEvent?.date ? new Date(editingEvent.date) : new Date()
  );
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!title.trim()) return Alert.alert("Validation", "Title is required");
    if (!description.trim())
      return Alert.alert("Validation", "Description required");
    setLoading(true);
    const payload = {
      title: title.trim(),
      description: description.trim(),
      category,
      date: date.toISOString(),
      ownerId: editingEvent?.ownerId || user.uid,
      favorites: editingEvent?.favorites || [],
      createdAt: editingEvent?.createdAt || new Date().toISOString(),
    };
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, payload);
      } else {
        await createEvent(payload);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>
        {editingEvent ? "Edit Event" : "Create Event"}
      </Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#bb7a90"
      />

      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#bb7a90"
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.chipContainer}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCategory(c)}
            style={[styles.chip, category === c && styles.chipActive]}
          >
            <Text style={category === c ? styles.chipTextActive : styles.chipText}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Date & Time</Text>
      <View style={[styles.input, styles.dateInput]}>
        <Text style={styles.dateText}>{date.toLocaleString()}</Text>
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title={editingEvent ? "Save Changes" : "Create Event"}
          onPress={save}
          disabled={loading}
          color="#f06292"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff0f6",
    flexGrow: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#ad1457",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f48fb1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#ad1457",
  },
  label: {
    marginBottom: 8,
    color: "#ad1457",
    fontWeight: "600",
  },
  chipContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f48fb1",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  chipActive: {
    backgroundColor: "#f06292",
    borderColor: "#f06292",
  },
  chipText: {
    color: "#ad1457",
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  dateInput: {
    justifyContent: "center",
  },
  dateText: {
    color: "#ad1457",
  },
  buttonWrapper: {
    marginTop: 12,
  },
});
