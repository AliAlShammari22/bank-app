import { me, updateProfile } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: me,
  });

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: () => updateProfile(imageUri || ""),
    onSuccess: () => Alert.alert("Profile image updated!"),
    onError: (err: any) => Alert.alert("Update failed", err.message),
  });

  const handleUpdate = () => {
    if (!imageUri) {
      Alert.alert("Please choose an image first");
      return;
    }
    mutate();
  };

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
        <ActivityIndicator size="large" color="#7f86b1" />
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
  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            await deleteToken();
            setIsAuthenticated(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const username = data?.username ?? "User";
  const balance = data?.balance?.toFixed(2) ?? "0.00";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Greeting */}
        <View
          style={{
            width: "100%",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={handleLogout}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={{}}>Logout </Text>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>

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
            <Text style={styles.actionTextChoose}>Choose Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.uploadButton]}
            onPress={handleUpdate}
          >
            <Text style={styles.actionText}>Update</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceValue}>${balance}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f5f8", // very light gray for subtle contrast
  },
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
    color: "#333333", // dark gray for primary text
  },
  username: {
    fontWeight: "700",
    color: "#7f86b1", // accent color
  },
  subtext: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 24,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: "#7f86b1",
    borderRadius: 80,
    padding: 4,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e0e0e0", // placeholder gray while loading
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
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#7f86b1",
  },
  uploadButton: {
    backgroundColor: "#7f86b1",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  actionTextChoose: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7f86b1",
  },
  balanceCard: {
    backgroundColor: "#ffffff",
    width: "90%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
    // subtle shadow for depth
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#7f86b1",
  },
});
