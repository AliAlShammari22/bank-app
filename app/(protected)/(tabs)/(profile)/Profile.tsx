// app/Profile.jsx
import { me, updateProfile } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { useThemeContext } from "@/theme/ThemeProvidor";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const { theme, mode, setMode } = useThemeContext();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: me,
  });

  const updateMutation = useMutation({
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
    updateMutation.mutate();
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

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
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

  if (isLoading) {
    return (
      <View style={[styles.loader, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.textPrimary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.loader, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.textPrimary }]}>
          Failed to load profile.
        </Text>
      </View>
    );
  }

  const username = data?.username ?? "User";
  const balance = data?.balance?.toFixed(2) ?? "0.00";

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      {/* Side Menu Overlay */}
      {menuVisible && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View />
        </TouchableOpacity>
      )}
      <View style={styles.menuContainer}>
        {menuVisible && (
          <View
            style={[styles.sideMenu, { backgroundColor: theme.cardBackground }]}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.replace("/");
              }}
            >
              <Text style={[styles.menuText, { color: theme.textPrimary }]}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.replace("/Transactions");
              }}
            >
              <Text style={[styles.menuText, { color: theme.textPrimary }]}>
                Transactions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                router.replace("/Users");
              }}
            >
              <Text style={[styles.menuText, { color: theme.textPrimary }]}>
                Users
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                handleLogout();
              }}
            >
              <Text style={[styles.menuText, { color: theme.textPrimary }]}>
                Logout
              </Text>
            </TouchableOpacity>

            {/* Dark/Light Mode Switch */}
            <View style={styles.switchContainer}>
              <Text style={[styles.switchLabel, { color: theme.textPrimary }]}>
                {mode === "dark" ? "Dark Mode" : "Light Mode"}
              </Text>
              <Switch
                value={mode === "dark"}
                onValueChange={() =>
                  setMode(mode === "dark" ? "light" : "dark")
                }
                trackColor={{
                  false: theme.border,
                  true: theme.accent,
                }}
                thumbColor={theme.textPrimary}
              />
            </View>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with Hamburger */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <MaterialCommunityIcons
              name="menu"
              size={28}
              color={theme.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text style={[styles.greeting, { color: theme.textPrimary }]}>
          Hello,{" "}
          <Text style={[styles.username, { color: theme.accent }]}>
            {username}
          </Text>{" "}
          👋
        </Text>
        <Text style={[styles.subtext, { color: theme.textSecondary }]}>
          Welcome to your profile
        </Text>

        {/* Avatar */}
        <View style={[styles.avatarContainer, { borderColor: theme.accent }]}>
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
            style={[
              styles.actionButton,
              styles.pickButton,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              },
            ]}
            onPress={pickImage}
            disabled={updateMutation.isPending}
          >
            <Text style={[styles.pickText, { color: theme.textPrimary }]}>
              Choose Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.uploadButton,
              { backgroundColor: theme.accent },
            ]}
            onPress={handleUpdate}
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <ActivityIndicator color={theme.textPrimary} />
            ) : (
              <Text style={[styles.uploadText, { color: theme.textPrimary }]}>
                Update
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View
          style={[
            styles.balanceCard,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.balanceLabel, { color: theme.accent }]}>
            Current Balance
          </Text>
          <Text style={[styles.balanceValue, { color: theme.accent }]}>
            {balance} KD
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
  },
  container: {
    alignItems: "center",
    paddingVertical: 24,
  },
  header: {
    width: "100%",
    paddingHorizontal: 24,
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "600",
  },
  username: {
    fontWeight: "700",
  },
  subtext: {
    fontSize: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    borderWidth: 2,
    borderRadius: 80,
    padding: 4,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#4E4A4A", // placeholder gray when loading
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
    borderWidth: 1,
  },
  uploadButton: {},
  pickText: {
    fontSize: 14,
    fontWeight: "600",
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "600",
  },
  balanceCard: {
    width: "90%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: "700",
  },

  // Side menu
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 250,
    height: "100%",
    paddingTop: 60,
    paddingHorizontal: 16,
    zIndex: 2,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  switchLabel: {
    fontSize: 16,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 250,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
});
