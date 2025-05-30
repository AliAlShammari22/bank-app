import colors from "@/types/colors";
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
          backgroundColor: colors.background,
          borderTopColor: "#AC9FBB",
          height: 70,
          paddingBottom: 0,
          borderRadius: 0,
          borderColor: "white",
          marginBottom: 0,
        },
        tabBarActiveTintColor: "#AC9FBB",
        tabBarInactiveTintColor: "#F7EBEC",
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Finance",

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
          title: "Beneficiaries",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="users" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="(xcards)"
        options={{
          title: "Cards",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="credit-card" size={size} color={color} />
          ),
        }}
      /> */}
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
