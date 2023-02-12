import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const categories = ["personal", "Work", "Listes", "Ideas"];
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getNotes();
    }, [])
  );

  const getNotes = () => {
    console.log(notes);
    AsyncStorage.getItem("NOTES").then((notes) => {
      setNotes(JSON.parse(notes));
    });
  };
  const categoryCounts = notes.reduce((counts, note) => {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
    return counts;
  }, {});

//   const counter = Object.keys(categoryCounts);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.roundButton1}
        onPress={() => {
          navigation.navigate("Add Note");
        }}
      >
        <Text>
          <Icon style={styles.icon} name="add-outline" />
        </Text>
      </TouchableOpacity>

      <View>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("My Notes", { category })}
          >
            <View style={styles.item}>
              <Text style={styles.note}>{category}</Text>
              <Text style={styles.counter}>{categoryCounts[category]||0 }</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    fontSize: 20,
  },
  counter: {
    fontSize: 20,
    borderRadius:100,
    width: 20,
    height: 20,
   

  },
  item: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "#483D8B",
    marginTop: 5,
    marginLeft: 10,
    backgroundColor: "#F8F8FF",
    fontSize: 20,
    padding: 10,
    alignItems: "center",
  },
  note: {
    fontSize: 30,
  },
  roundButton1: {
    marginTop: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#6495ED",
    marginLeft: "40%",
  },
  icon: {
    fontSize: 30,
    // flexDirection: "row",
  },
});
