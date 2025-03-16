import React from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const TabRoot = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={15} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addTask"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="logout" size={15} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabRoot;

const styles = StyleSheet.create({});
