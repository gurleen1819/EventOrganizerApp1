// screens/CreateEditEventScreen.js
import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { EventsContext } from "../contexts/EventsProvider";
import { AuthContext } from "../contexts/AuthProvider";
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIES = ["Music", "Art", "Tech", "Sports", "Other"];

export default function CreateEditEventScreen({ route, navigation }) {
  const editingEvent = route.params?.event;
  const { createEvent, updateEvent } = useContext(EventsContext);
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState(editingEvent?.title || "");
  const [description, setDescription] = useState(editingEvent?.description || "");
  const [category, setCategory] = useState(editingEvent?.category || "Other");
  const [date, setDate] = useState(editingEvent?.date ? new Date(editingEvent.date) : new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    if (!title.trim()) return Alert.alert("Validation", "Title is required");
    if (!description.trim()) return Alert.alert("Validation", "Description required");
    setLoading(true);
    const payload = {
      title: title.trim(),
      description: description.trim(),
      category,
      date: date.toISOString(),
      ownerId: editingEvent?.ownerId || user.uid,
      favorites: editingEvent?.favorites || [],
      createdAt: editingEvent?.createdAt || new Date().toISOString()
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
    <ScrollView contentContainerStyle={{ padding:16 }}>
      <Text style={{ fontSize:18, fontWeight:"700", marginBottom:12 }}>{editingEvent ? "Edit Event" : "Create Event"}</Text>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Description" style={[styles.input, { height:100 }]} multiline value={description} onChangeText={setDescription} />
      <Text style={{ marginBottom:6 }}>Category</Text>
      <View style={{ flexDirection:"row", marginBottom:12 }}>
        {CATEGORIES.map(c => (
          <TouchableOpacity key={c} onPress={() => setCategory(c)} style={[styles.chip, category === c && styles.chipActive]}>
            <Text style={{ color: category === c ? "#fff" : "#000" }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{ marginBottom:6 }}>Date & Time</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text>{date.toLocaleString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          is24Hour={false}
          display="default"
          onChange={(e, selected) => {
            setShowPicker(false);
            if (selected) setDate(selected);
          }}
        />
      )}

      <Button title={editingEvent ? "Save Changes" : "Create Event"} onPress={save} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth:1, borderColor:"#ddd", padding:10, borderRadius:8, marginBottom:12 },
  chip: { paddingHorizontal:12, paddingVertical:8, borderRadius:20, borderWidth:1, borderColor:"#ddd", marginRight:8 },
  chipActive: { backgroundColor:"#4e91fc", borderColor:"#4e91fc" }
});
