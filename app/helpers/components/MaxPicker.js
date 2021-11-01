import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const maxDistance = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function MaxPicker(props) {
  return (
    <View>
      <View>
        <Text style={styles.pickerTitle}>max</Text>
        <Picker>
          {maxDistance.map((item) => (
            <Picker.Item key={item} value={item} label={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

export default MaxPicker;

const styles = StyleSheet.create({
  pickerTitle: {
    fontSize: 15,
    backgroundColor: "#edf6f9",
    padding: 10,
  },
});
