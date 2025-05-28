import { register } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
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

const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setname] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["Register"],
    mutationFn: () => register({ username, password }, image || ""),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/");
      alert("Registered successfully!");
    },
    onError: (err) => {
      alert("Registration failed. Please try again.");
      console.log(err);
    },
  });

  const handleRegister = () => {
    console.log({ username, password });

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
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 50 }}>Register Your Account</Text>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <TextInput
          style={styles.textinput}
          placeholder="username"
          returnKeyType="done"
          onChangeText={(text) => {
            setname(text);
          }}
        ></TextInput>

        <TextInput
          style={styles.textinput}
          placeholder="password"
          returnKeyType="done"
          onChangeText={(text) => {
            setPassword(text);
          }}
        ></TextInput>
        <TouchableOpacity onPress={handleRegister} style={{ marginBottom: 20 }}>
          <Text>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage}>
          <Text>Choose a profile photo</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  image: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  textinput: {
    borderWidth: 1,
    width: 200,
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
});
