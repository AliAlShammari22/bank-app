// app/register.jsx
import { register } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useThemeContext } from "@/theme/ThemeProvidor";
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
  const [image, setImage] = useState<string | null>(null);
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["Register"],
    mutationFn: () =>
      register(
        { username, password },
        image ||
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
      if (!username.trim() && !password.trim()) {
        alert("Please enter your username and password");
      } else if (!username.trim()) {
        alert("Please enter your username");
      } else {
        alert("Please enter your password");
      }
      return;
    }
    if (password.length < 8) {
      return alert("Please enter more than 8 characters");
    }
    mutate();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
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
            styles.formContainer,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <Text style={[styles.headerText, { color: theme.textPrimary }]}>
            Register Your Account
          </Text>

          {image && (
            <Image
              source={{ uri: image }}
              style={[styles.profileImage, { borderColor: theme.textPrimary }]}
            />
          )}

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
            placeholder="Username"
            placeholderTextColor={theme.placeholder}
            onChangeText={setUsername}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.textPrimary,
              },
            ]}
            placeholder="Password"
            placeholderTextColor={theme.placeholder}
            secureTextEntry
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={handleRegister}
            style={[styles.button, { backgroundColor: theme.accent }]}
          >
            <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickImage}>
            <Text style={[styles.photoText, { color: theme.textSecondary }]}>
              Choose a Profile Photo
            </Text>
          </TouchableOpacity>

          <Text style={[styles.linkContainer, { color: theme.textSecondary }]}>
            Already have an account?{" "}
            <Link
              href="/Login"
              style={[styles.linkText, { color: theme.accent }]}
            >
              Login
            </Link>
          </Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  photoText: {
    marginTop: 15,
    textAlign: "center",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  linkContainer: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  linkText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
