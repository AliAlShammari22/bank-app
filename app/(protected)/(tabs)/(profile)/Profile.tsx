// Profile.tsx
import { me } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: me,
  });

  //   console.log(data);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://react-bank-project.eapi.joincoded.com/${data?.image}`,
        }}
        style={styles.avatar}
      />
      <Text style={styles.username}>{data?.username}</Text>
      <Text style={styles.balance}>Balance: ${data.balance.toFixed(2)}</Text>
      <View style={styles.cardcontainer}>
        <View style={styles.card}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQihPgqcZeP-Qoswt2GJUh16eMoPL27lzWj1w&s",
            }}
            style={styles.flag}
          />
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6404/6404078.png",
            }}
            style={styles.chip}
          />
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/633/633611.png",
            }}
            style={styles.nfc}
          />
          <Text style={styles.brand}>VISA</Text>
          <View style={styles.row}>
            <Text style={styles.number}>4552 6218 2043 8931</Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.name}>FAJER A. ALKANDARI</Text>
            <Text style={styles.expiry}>02/24</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#D00",
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    marginTop: 70,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#007AFF",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  username: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  balance: {
    fontSize: 18,
    color: "#555",
    marginTop: 4,
  },
  cardcontainer: {
    // flex: 1,
    // backgroundColor: "#0A0A0A",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 340,
    height: 200,
    borderRadius: 20,
    backgroundColor: "#1C1C1C",
    padding: 20,
    position: "relative",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    borderColor: "#3A3A3A",
    borderWidth: 1,
  },
  chip: {
    width: 40,
    height: 30,
    resizeMode: "contain",
    position: "absolute",
    top: 50,
    left: 20,
  },
  nfc: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    position: "absolute",
    top: 22,
    right: 20,
    opacity: 0.9,
  },
  flag: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 32,
    height: 20,
    resizeMode: "cover",
    borderRadius: 3,
  },
  brand: {
    position: "absolute",
    bottom: 10,
    right: 20,
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  row: {
    marginTop: 80,
    marginBottom: 10,
  },
  number: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
    letterSpacing: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  name: {
    color: "#AAAAAA",
    fontSize: 14,
    fontWeight: "400",
  },
  expiry: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});
