// app/Login.jsx
import { login } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useThemeContext } from "@/theme/ThemeProvidor";
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

// If you used ThemeProvider above:

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { theme, setMode, mode } = useThemeContext();

  const { mutate } = useMutation({
    mutationKey: ["login"],
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
      alert("Please enter both username and password");
      return;
    }
    mutate();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.keyboardView, { backgroundColor: theme.background }]}
    >
      <View style={[styles.container]}>
        <View
          style={[
            styles.formContainer,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <Text style={[styles.headerText, { color: theme.textPrimary }]}>
            Login to Your Account
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
            onPress={validateAndLogin}
            style={[styles.button, { backgroundColor: theme.accent }]}
          >
            <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
              Login
            </Text>
          </TouchableOpacity>

          <Text style={[styles.linkContainer, { color: theme.textSecondary }]}>
            Don't have an account?{" "}
            <Link
              href="/Register"
              style={[styles.linkText, { color: theme.accent }]}
            >
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
  linkContainer: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  linkText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  toggleButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: "center",
  },
});
