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

const Index = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const { mutate, data } = useMutation({
    mutationKey: ["Login"],
    mutationFn: () => login({ username, password }),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/");
      alert("Logged in successfully!");
    },

    onError: () => {
      alert("Wrong email or password");
    },
  });

  console.log("This is the login Data:", data);
  const handleLogin = () => {
    console.log("This is the data sent", { username, password });
    mutate();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", padding: 20 }}>
          <Text style={{ color: "black", fontSize: 16 }}>
            Login to your account
          </Text>

          <TextInput
            style={{
              backgroundColor: "#7162eb",
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder={"username"}
            keyboardType="default"
            returnKeyType="done"
            placeholderTextColor={"white"}
            onChangeText={(text) => setEmail(text)}
          />
          {/* <Text></Text> */}

          <TextInput
            style={{
              backgroundColor: "#7162eb",
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            returnKeyType="done"
            placeholderTextColor={"white"}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#7162eb",
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              marginBottom: 10,
              alignItems: "center",
            }}
            onPress={() => {
              if (!username.trim() && !password.trim()) {
                return alert("Please enter your email and password");
              }
              if (!username.trim()) {
                return alert("Please enter your email");
              }
              if (!password.trim()) {
                return alert("Please enter your password");
              }
              handleLogin();
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <Text style={{ color: "black", fontSize: 16 }}>
            Don't have an account?{" "}
            <Link href={"/Register"}>
              <Text style={{ color: "black", fontWeight: "bold" }}>
                Register
              </Text>
            </Link>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({});
