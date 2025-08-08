// components/CategoryList.js
import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const CATEGORIES = ["All", "Music", "Art", "Tech", "Sports", "Other"];

export default function CategoryList({ selected, onSelect }) {
  return (
    <View style={{ marginVertical: 8 }}>
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(i) => i}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const active = item === selected;
          return (
            <TouchableOpacity onPress={() => onSelect(item)} style={[styles.chip, active && styles.active]}>
              <Text style={{ color: active ? "#fff" : "#222" }}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { paddingHorizontal:14, paddingVertical:8, borderRadius:20, borderWidth:1, borderColor:"#ddd", marginRight:8 },
  active: { backgroundColor:"#4e91fc", borderColor:"#4e91fc" }
});
