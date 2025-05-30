// app/register.jsx
import { register } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
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
    onError: (error) => {
      alert("Registration failed. Please try again.");
      console.log(error);
    },
  });

  const handleRegister = () => {
    mutate();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardView}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Register Your Account</Text>
          {image && (
            <Image source={{ uri: image }} style={styles.profileImage} />
          )}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#777"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.photoText}>Choose a Profile Photo</Text>
          </TouchableOpacity>
          <Text style={styles.linkContainer}>
            Already have an account?{" "}
            <Link href="/Login" style={styles.linkText}>
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
    backgroundColor: "#f0f2f5",
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
    backgroundColor: "#fff",
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
    color: "#333",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  photoText: {
    marginTop: 15,
    textAlign: "center",
    color: "#1e90ff",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  linkContainer: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  linkText: {
    color: "#1e90ff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
