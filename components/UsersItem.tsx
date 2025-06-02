// components/UsersItem.jsx
import { useThemeContext } from "@/theme/ThemeProvidor";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface UsersProps {
  _id: string;
  username: string;
  balance: number;
  image: string;
}

const UsersItem = ({ _id, username, balance, image }: UsersProps) => {
  const router = useRouter();
  const { theme } = useThemeContext();

  const displayBalance =
    balance > 1_000_000
      ? "He is a millionaire!"
      : `$${Math.max(balance, 0).toFixed(2)} KD`;

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
          borderLeftColor: theme.accent,
        },
      ]}
    >
      <Image
        style={[styles.image, { backgroundColor: theme.inputBackground }]}
        source={{
          uri: image
            ? `https://react-bank-project.eapi.joincoded.com/${image}`
            : "https://gimgs2.nohat.cc/thumb/f/640/male-face-icon-default-profile-image--c3f2c592f9.jpg",
        }}
      />
      <View style={styles.info}>
        <Text style={[styles.username, { color: theme.textPrimary }]}>
          {username}
        </Text>
        <Text style={[styles.balance, { color: theme.textSecondary }]}>
          {displayBalance}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/${_id}`)}
        style={[styles.transferButton, { backgroundColor: theme.accent }]}
      >
        <Text style={[styles.transferText, { color: theme.textPrimary }]}>
          Transfer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UsersItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
  },
  balance: {
    fontSize: 12,
    marginTop: 4,
  },
  transferButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  transferText: {
    fontWeight: "600",
  },
});
