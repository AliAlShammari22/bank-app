// app/Login.jsx
import { login } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useThemeContext } from "@/theme/ThemeProvidor";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { theme } = useThemeContext();

  const { mutate, isPending } = useMutation({
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

          {/* Header */}
          <Text style={[styles.headerText, { color: theme.textPrimary }]}>
            Tharwa Bank
          </Text>
          <Text style={[styles.subtext, { color: theme.textSecondary }]}>
            Please sign in to continue
          </Text>

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
              placeholder="Enter your username"
              placeholderTextColor={theme.placeholder}
              autoCapitalize="none"
              onChangeText={setUsername}
              value={username}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordHeader}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>
                Password
              </Text>
              <TouchableOpacity onPress={() => alert("Forgot password flow")}>
                <Text style={[styles.forgotText, { color: theme.accent }]}>
                  Forgot?
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.border,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="••••••••"
              placeholderTextColor={theme.placeholder}
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={validateAndLogin}
            style={[
              styles.primaryButton,
              { backgroundColor: theme.accent },
              isPending && styles.buttonDisabled,
            ]}
            disabled={isPending}
          >
            <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
              {isPending ? "Signing In..." : "Login"}
            </Text>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.dividerContainer}>
            <View style={[styles.dividerLine, { borderColor: theme.border }]} />
            <Text
              style={[
                styles.dividerText,
                {
                  backgroundColor: theme.cardBackground,
                  color: theme.textSecondary,
                },
              ]}
            >
              Or continue with
            </Text>
            <View style={[styles.dividerLine, { borderColor: theme.border }]} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.inputBackground,
                },
              ]}
              onPress={() => alert("Login with Apple")}
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/256/0/747.png",
                }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.inputBackground,
                },
              ]}
              onPress={() => alert("Login with Google")}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=512&id=17949&format=png",
                }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialButton,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.inputBackground,
                },
              ]}
              onPress={() => alert("Login with Meta")}
            >
              <Image
                source={{
                  uri: "https://static-00.iconduck.com/assets.00/brand-meta-icon-512x358-6oqf35bx.png",
                }}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: theme.textSecondary }]}>
              Don’t have an account?{" "}
            </Text>
            <Link href="/Register" asChild>
              <TouchableOpacity>
                <Text style={[styles.signUpLink, { color: theme.accent }]}>
                  Sign Up
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

  // CARD (mimics the web Card + CardContent)
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

  // HEADER
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
    marginTop: 40, // push down so it doesn’t overlap back button
  },
  subtext: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },

  // INPUT GROUP
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotText: {
    fontSize: 13,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  // LOGIN BUTTON
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

  // DIVIDER ("Or continue with")
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    borderWidth: 0,
    borderTopWidth: 1,
  },
  dividerText: {
    marginHorizontal: 8,
    fontSize: 13,
  },

  // SOCIAL LOGIN
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  socialButton: {
    width: (SCREEN_WIDTH - 80) / 3, // (cardWidth – totalHorizontalPadding) ÷ 3
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    width: "50%",
    height: "50%",
  },

  // SIGN UP LINK
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
