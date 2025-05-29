import { me, updateProfile } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: me,
  });

  const updateMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: () => updateProfile(imageUri || ""),
    onSuccess: () => alert("Profile image updated!"),
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loader}>
        <Text style={styles.errorText}>Failed to load profile.</Text>
      </View>
    );
  }

  const username = data?.username ?? "User";
  const balance = data?.balance?.toFixed(2) ?? "0.00";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Greeting */}
        <Text style={styles.greeting}>
          Hello, <Text style={styles.username}>{username}</Text> 👋
        </Text>
        <Text style={styles.subtext}>Welcome to your profile</Text>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: imageUri
                ? imageUri
                : `https://react-bank-project.eapi.joincoded.com/${data?.image}`,
            }}
            style={styles.avatar}
          />
        </View>

        {/* Update Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.pickButton]}
            onPress={pickImage}
          >
            <Text style={styles.actionTextchoose}>Choose Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.uploadButton]}
            onPress={() => updateMutation.mutate()}
          >
            <Text style={styles.actionText}>Update</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceValue}>${balance}</Text>
        </View>

        {/* Credit Cards Carousel */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F5F5" },
  container: {
    alignItems: "center",
    paddingVertical: 24,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#D00",
    fontSize: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
  },
  username: {
    fontWeight: "700",
    color: "#007AFF",
  },
  subtext: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 80,
    padding: 4,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 24,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  pickButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  uploadButton: {
    backgroundColor: "#007AFF",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  actionTextchoose: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  balanceCard: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
    // Shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#28a745",
  },
});
