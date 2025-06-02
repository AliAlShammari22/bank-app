// app/_layout.jsx (or wherever your TabLayout resides)
import { useThemeContext } from "@/theme/ThemeProvidor";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const TabLayout = () => {
  const { theme } = useThemeContext();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderWidth: 0,
          height: 70,
          paddingBottom: 0,
          borderRadius: 0,
          borderColor: theme.border,
          marginBottom: 0,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textPrimary,
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
