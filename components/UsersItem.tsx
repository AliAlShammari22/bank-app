import colors from "@/types/colors";
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

  return (
    <View style={[styles.row, { borderLeftColor: colors.border }]}>
      <Image
        style={styles.image}
        source={{
          uri: image
            ? `https://react-bank-project.eapi.joincoded.com/${image}`
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        }}
      />
      <View style={styles.info}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.balance}>
          {balance > 1_000_000
            ? "He is a millionaire!"
            : `$${balance.toFixed(2)}`}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/${_id}`)}
        style={styles.transferButton}
      >
        <Text style={styles.transferText}>Transfer</Text>
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
    backgroundColor: "#d3d5e4",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
    color: "#363a56",
    marginTop: 4,
  },
  transferButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#5f6898",
    borderRadius: 6,
  },
  transferText: {
    color: "#fff",
    fontWeight: "600",
  },
});
