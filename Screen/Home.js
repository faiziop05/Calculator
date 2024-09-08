import {
    Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

import Buttons from "../Components/Buttons";
import { FlatList } from "react-native-gesture-handler";
const ButtonsList = [
  {
    Icon: Ionicons,
    name: "backspace-outline",
    Val: "Backspace",
    color: Colors.LIGHT_GRAY,
  },
  { Val: "+/-", color: Colors.LIGHT_GRAY },
  { Val: "%", color: Colors.LIGHT_GRAY },
  { Icon: FontAwesome6, name: "divide", Val: "/", color: Colors.YELLOW },
  { Val: "7", color: Colors.DARK_GRAY },
  { Val: "8", color: Colors.DARK_GRAY },
  { Val: "9", color: Colors.DARK_GRAY },
  { Val: "x", color: Colors.YELLOW },
  { Val: "4", color: Colors.DARK_GRAY },
  { Val: "5", color: Colors.DARK_GRAY },
  { Val: "6", color: Colors.DARK_GRAY },
  { Val: "-", color: Colors.YELLOW },
  { Val: "1", color: Colors.DARK_GRAY },
  { Val: "2", color: Colors.DARK_GRAY },
  { Val: "3", color: Colors.DARK_GRAY },
  { Val: "+", color: Colors.YELLOW },
  {
    Icon: MaterialCommunityIcons,
    Val: "more",
    name: "calculator",
    color: Colors.DARK_GRAY,
  },
  { Val: "0", color: Colors.DARK_GRAY },
  { Val: ".", color: Colors.DARK_GRAY },
  { Val: "=", color: Colors.YELLOW },
];

const Home = () => {
  const [numColumns, setNumColumns] = useState(4); // Set the number of columns to 4
  const [result, setResult] = useState(); // Set the number of columns to 4
  const [isResultCalulated, SeyIsResultCalulated] = useState(true); // Set the number of columns to 4
  const [show, setShow] = useState(""); // Set the number of columns to 4
  const [prev, setPrev] = useState("");

  const handleKepPress = (value) => {
    SeyIsResultCalulated(false);
    setResult("");

    if (String(prev).includes("*")) {
      const array = Array.from(prev)
        .map((item) =>
          typeof item === "string" ? item.replace("*", "x") : item
        )
        .join("");
      setShow(array + value);
    } else if (value == "+/-") {
      let res = prev * -1;
      setShow(res);
    } else if (value == ".") {
      if (prev.includes(".")) {
        return;
      }

      setShow(prev + ".");
    } else if (value == "Backspace") {
      let array = Array.from(prev);
      array.pop(); // Removes the last element
      let str = array.join(""); // Converts the array to a string without commas

      setShow(str);
    } else {
      setShow(prev + value);
    }

    if (value == "x") {
      setPrev(prev + "*");
    } else if (value == "%") {
      setPrev(prev / 100);
      // } else if (prev == "0") {
      //   return;
    } else if (value == "Backspace") {
      let array = Array.from(prev);
      let length = array.length;
      array.pop(); // Removes the last element
      let str = array.join(""); // Converts the array to a string without commas
      if (array.length > 0) {
        setShow(str);
        setPrev(str);
      } else {
        setShow("");
        setPrev("");
        setResult("");
      }
    } else if (value == "+/-") {
      let res = prev * -1;
      setPrev(res);
      setResult(res);
    } else if (value == ".") {
      if (prev.includes(".")) {
        return;
      }
      setPrev(prev + ".");
    } else {
      setPrev(prev + value);
    }
  };

  const handleEqual = () => {
    try {
      let res = eval(prev);
      let calres=String(res).includes('.') ? Number(res).toFixed(4).toString() : res
      setResult(eval(calres));
      SeyIsResultCalulated(true);
      setPrev("");
      setShow("");
    } catch (err) {
      setResult("0");
      SeyIsResultCalulated(true);
      setPrev("");
      setShow("");
    }
  };

  return (
    <View style={styles.Conatianer}>
      <SafeAreaView style={styles.wrapperelement}>
        <Text style={styles.resultText}>
          {isResultCalulated == true ? result : show}
        </Text>
        <View style={styles.FlatListWrapper}>
          <FlatList
            data={ButtonsList}
            numColumns={numColumns} // Set 4 items per row
            key={numColumns} // Force re-render when numColumns changes
            renderItem={({ item }) => (
              <TouchableOpacity
                value={item.Val}
                onPress={() =>
                  item.Val == "=" ? handleEqual() : handleKepPress(item.Val)
                }
                onLongPress={() => {
                  setResult("0");
                  setPrev("");
                  setShow("");
                }}
              >
                <Buttons data={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Conatianer: {
    backgroundColor: Colors.BLACK,
    height: "100%",
  },
  wrapperelement: {
    flex: 1, // Fill available space
    flexDirection: "column",
    justifyContent: "flex-end", // Ensure content is aligned to the bottom
  },
  FlatListWrapper: {
    position: "absolute", // Align relative to the screen
    bottom: 0, // Stick to the bottom
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: Platform.OS=="android" ? 20 : 50, // Space for FlatList
  },
  resultText: {
    color: Colors.WHITE,
    fontSize: 80,
    alignSelf: "flex-end", // Center the text horizontally
    marginBottom: (screenWidth / 4.5) * 5 + 90, // Position it above the FlatList with some space
  },
});
