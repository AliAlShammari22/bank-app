// app/Users.jsx
import { getAllUsers } from "@/api/auth";
import UsersItem, { UsersProps } from "@/components/UsersItem";
import { useThemeContext } from "@/theme/ThemeProvidor";
import { useScrollToTop } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Users() {
  const { theme } = useThemeContext();
  const ref = useRef<FlatList>(null);

  useScrollToTop(ref);
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<UsersProps[], Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.textPrimary} />
      </View>
    );
  }

  if (isError || !users) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.error, { color: theme.accent }]}>
          Failed to load: {error?.message}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <Text style={[styles.header, { color: theme.textPrimary }]}>
        All Users
      </Text>
      <FlatList
        ref={ref}
        data={users}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <UsersItem {...item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  separator: {
    height: 8,
  },
});
