import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const CATEGORIES = ["All", "Music", "Art", "Tech", "Sports", "Other"];

export default function CategoryList({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(i) => i}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const active = item === selected;
          return (
            <TouchableOpacity
              onPress={() => onSelect(item)}
              style={[styles.chip, active && styles.active]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
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
  active: {
    backgroundColor: "#f06292", 
    borderColor: "#f06292",
  },
  chipText: {
    color: "#ad1457", 
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#fff", 
  },
});
