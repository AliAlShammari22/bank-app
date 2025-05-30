// app/index.jsx
import { login } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["Login"],
    mutationFn: () => login({ username, password }),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/");
      alert("Logged in successfully!");
    },
    onError: () => {
      alert("Wrong username or password");
    },
  });

  const validateAndLogin = () => {
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
    mutate();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardView}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Login to Your Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#777"
            keyboardType="default"
            returnKeyType="done"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            returnKeyType="done"
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={validateAndLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.linkContainer}>
            Don't have an account?{" "}
            <Link href="/Register" style={styles.linkText}>
              Register
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
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
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
