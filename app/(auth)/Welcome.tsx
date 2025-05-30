import { Video } from "expo-av";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ② Background video absolutely filling */}
      <Video
        source={require("../../assets/videos/bankwelcome.mp4")}
        style={StyleSheet.absoluteFillObject}
        shouldPlay
        isLooping
        resizeMode="cover"
        isMuted
      />

      {/* ③ Your UI goes on top */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.push("/Login")}
          style={styles.login}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcometext}>
          Welcome to your New Banking Experience
        </Text>
        <Text style={styles.text}>
          Our mobile app empowers you to manage your finances effortlessly.
          Enjoy features like instant deposits, transaction tracking, and
          personalized profile updates.
        </Text>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.blackButton}>
            <Text style={styles.blackButtonText}>Learn More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/Register")}
            style={styles.register}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
        {/* <Image
          source={require("../../assets/images/B3.png")}
          style={styles.photo}
        /> */}
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfdff", // fallback color
  },
  topBar: {
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 10,
  },
  login: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    width: 100,
    alignItems: "center",
    borderColor: "#0170df",
    backgroundColor: "#0170df",
  },
  loginText: {
    color: "white",
    fontSize: 17,
    fontWeight: 500,
  },
  content: {
    flex: 1,
    marginHorizontal: 30,
    // justifyContent: "",
    marginTop: 70,
  },
  welcometext: {
    fontSize: 43,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    marginVertical: 30,
    color: "white",
    fontSize: 14,
  },
  buttonsRow: {
    flexDirection: "row",
  },
  blackButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    marginRight: 10,
    backgroundColor: "#0170df",
    borderColor: "#0170df",
  },
  blackButtonText: {
    color: "white",
    fontWeight: "500" as any,
  },
  register: {
    borderWidth: 2.5,
    borderRadius: 4,
    padding: 15,
    borderColor: "#0170df",
  },
  registerText: {
    color: "#0170df",
    fontWeight: "500" as any,
  },
  photo: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 20,
  },
});
