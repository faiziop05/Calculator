import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../Colors";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const Buttons = ({ data }) => {
  //   console.log(data.Icoms);
  const { name, Val, Icon } = data;

  return (
    <View style={[styles.btn, { backgroundColor: data.color }]}>
      {Icon ? (
        <Icon
          name={name}
          size={30}
          color={'white'}
        />
      ) : (
        <Text style={styles.fontColor}>{Val}</Text>
      )}
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  btn: {
    width: screenWidth /4.5,
    height:  screenWidth /4.5,
    borderRadius:60,
    alignItems:"center",
    justifyContent:"center",
    margin:screenWidth/100
  },
  fontColor: { color: Colors.WHITE ,
    fontSize:40
  },
});
