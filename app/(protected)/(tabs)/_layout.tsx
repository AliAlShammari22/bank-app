import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          //   backgroundColor: colors.primary,
          //   borderTopColor: colors.primary,
          height: 70,
          paddingBottom: 0,
          borderRadius: 50,
          borderColor: "white",
          marginBottom: 0,
        },
        tabBarActiveTintColor: "#7162eb",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(transactions)"
        options={{
          headerShown: false,
          title: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="compare-arrows" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(users)"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="users" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
