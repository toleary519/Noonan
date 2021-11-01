import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const pickerClubs = [
  "Dr",
  "3w",
  "5w",
  "1i",
  "2i",
  "3i",
  "4i",
  "5i",
  "6i",
  "7i",
  "8i",
  "9i",
];

function ClubPicker(props) {
  return (
    <View>
      <View>
        <Text style={styles.pickerTitle}>club</Text>
        <Picker>
          {pickerClubs.map((item) => (
            <Picker.Item key={item} value={item} label={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

export default ClubPicker;

const styles = StyleSheet.create({
  pickerTitle: {
    fontSize: 15,
    backgroundColor: "#edf6f9",
    padding: 10,
  },
});
