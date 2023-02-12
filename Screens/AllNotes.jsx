import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllNotes(props) {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const category = props.route.params.category;
  console.log(category + " working!");

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
  const handleDelete = async (index) => {
    try {
      let notes = await AsyncStorage.getItem("NOTES");
      notes = JSON.parse(notes);
      notes.splice(index, 1);
      await AsyncStorage.setItem("NOTES", JSON.stringify(notes));
      setNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Text style={styles.title}>{category}</Text>
      <View>
        { notes.filter(note => note.category === category).map((item, index) => (
          <View style={styles.item}>
             <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Icon style={styles.icon1} name="trash-outline" />
                </TouchableOpacity>

            <View key={index}>
              <Text style={styles.note}>{item.note}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
  },
  icon1: {
    width: "80%",
    // textAlign: "right",
    paddingRight: 10,
    width: "100%",
    fontSize: 30,
  },
  item: {
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
  title: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 50,
  },
  note: {
    fontSize: 20,
    width: "60%",
    padding: 10,
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
    flexDirection: "row",
  },
  date: {
    flexDirection: "row",
    paddingRight: 30,
    color: "#696969",
  },
});
