import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


export default function AddNote(props) {
  const categories = ["personal", "Work", "Listes", "Ideas"];

  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [note, setNote] = useState();
  const newNote = {
    category: selectedCategory,
    note,
    date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`,
  };
  const handlePress = (category) => {
    setSelectedCategory(category);
    newNote.category = category;
  };
  const saveNote = async () => {
    if (selectedCategory && newNote.note) {
      console.log({ newNote });
      const value = await AsyncStorage.getItem("NOTES");
      const n = value ? JSON.parse(value) : [];
      n.push(newNote);
      await AsyncStorage.setItem("NOTES", JSON.stringify(n));
      console.log(n);

      setNote("");
      setSelectedCategory("");
      console.log(n);
    } else Alert.alert("Empty data :(");
    setNote("");
    setSelectedCategory("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <TextInput
            value={note}
            onChangeText={setNote}
            style={styles.input}
            placeholder="Write here..."
          />
        </View>
        <View style={styles.buttons}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button]}
              onPress={() => handlePress(category)}
            >
              <Text style={styles.text}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button onPress={saveNote} title="Add" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "#ADD8E6",
    padding: 5,
    margin: 5,
  },
  button: {
    padding: 10,
    backgroundColor: "#ADD8E6",
    borderRadius: 10,
    margin: 10,
   

  },
  input: {
    marginVertical: 20,
    width: "90%",
    fontSize: 20,
    borderBottomWidth: 2,
    padding: 10,
  },
  form: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 20,
  },
});
