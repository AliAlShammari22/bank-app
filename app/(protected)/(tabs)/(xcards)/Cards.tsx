import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cards = [
  {
    id: "1",
    title: "Premium Visa Card",
    image: require("../../../../assets/images/cardme.png"),
  },
  {
    id: "2",
    title: "Platinum MasterCard",
    image: require("../../../../assets/images/cardfajr.png"),
  },
];

export default function CardsPage() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fcfdff" }}
      edges={["top"]}
    >
      <View style={styles.container}>
        {cards.map((card) => (
          <View key={card.id} style={styles.card}>
            <Image source={card.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{card.title}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

// Get full width minus padding
const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40; // 20px padding on each side

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f2f5",
    alignItems: "center",
    // Default flexDirection is 'column'
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    padding: 12,
    color: "#333",
  },
});
