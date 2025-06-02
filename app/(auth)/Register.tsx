// app/Register.jsx
import { register } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useThemeContext } from "@/theme/ThemeProvidor";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const { theme } = useThemeContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: () =>
      register(
        { username, password },
        imageUri ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      ),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/");
      alert("Registered successfully!");
    },
    onError: () => {
      alert("Registration failed. Please try again.");
    },
  });

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.keyboardView, { backgroundColor: theme.background }]}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.cardBackground,
              shadowColor: theme.border,
            },
          ]}
        >
          {/* Back button at top-left */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={theme.textPrimary}
            />
            <Text style={[styles.backText, { color: theme.textPrimary }]}>
              Back
            </Text>
          </TouchableOpacity>

          {/* Heading */}
          <Text style={[styles.headerText, { color: theme.textPrimary }]}>
            Create Your Account
          </Text>

          {/* Optional Profile Image Preview */}
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={[styles.profileImage, { borderColor: theme.accent }]}
            />
          )}

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Username
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="Enter a username"
              placeholderTextColor={theme.placeholder}
              autoCapitalize="none"
              onChangeText={setUsername}
              value={username}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Password
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="At least 8 characters"
              placeholderTextColor={theme.placeholder}
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            style={[
              styles.primaryButton,
              { backgroundColor: theme.accent },
              isPending && styles.buttonDisabled,
            ]}
            disabled={isPending}
          >
            <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
              {isPending ? "Creating..." : "Register"}
            </Text>
          </TouchableOpacity>

          {/* Choose Profile Photo */}
          <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
            <Text style={[styles.photoText, { color: theme.accent }]}>
              {imageUri ? "Change Profile Photo" : "Choose Profile Photo"}
            </Text>
          </TouchableOpacity>

          {/* Link to Login */}
          <View style={styles.signInContainer}>
            <Text style={[styles.signInText, { color: theme.textSecondary }]}>
              Already have an account?{" "}
            </Text>
            <Link href="/Login" asChild>
              <TouchableOpacity>
                <Text style={[styles.signInLink, { color: theme.accent }]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  // CARD
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    position: "relative",
  },

  // BACK BUTTON
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 16,
    left: 16,
  },
  backText: {
    fontSize: 16,
    marginLeft: 4,
  },

  // HEADING
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 40, // push down so it doesn’t overlap the back button
  },

  // PROFILE IMAGE PREVIEW
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
  },

  // INPUT GROUP
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  // REGISTER BUTTON
  primaryButton: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  // CHOOSE PHOTO LINK
  photoButton: {
    marginTop: 16,
    alignItems: "center",
  },
  photoText: {
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },

  // SIGN-IN LINK
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signInText: {
    fontSize: 14,
  },
  signInLink: {
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
