import { me } from "@/api/auth";
import { getMyTransaction } from "@/api/transaction";
import TransactionItem from "@/components/TransactionItem";
import colors from "@/types/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myTransactions"],
    queryFn: getMyTransaction,
  });
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: me,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.textPrimary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load: {error.message}</Text>
      </View>
    );
  }
  const balance = data?.balance?.toFixed(2) ?? "0.00";
  const recentTx = transactions.slice(-5).reverse();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.background}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={colors.textPrimary}
          />
          <Text style={styles.greeting}>{`Hi,${data.username}`} </Text>
          <View style={styles.headerIcons}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.textPrimary}
            />
            <Ionicons
              name="help-circle-outline"
              size={24}
              color={colors.textPrimary}
              style={{ marginLeft: 16 }}
            />
          </View>
        </View>

        {/* Screen Title */}
        <Text style={styles.screenTitle}>HOME</Text>

        {/* Card Carousel */}
        <View style={{ height: 165 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cardScroll}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            <Image
              source={require("../../../../assets/images/cardme.png")}
              style={styles.card}
            />
            <Image
              source={require("../../../../assets/images/cardfajr.png")}
              style={styles.card}
            />
            <Text style={styles.balanceLabel}>{`Balance: $${balance}`}</Text>
          </ScrollView>
        </View>

        {/* Additional content can go here */}
        <View>
          <Text style={styles.screenTitle}>Finance</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 60,
            }}
          >
            <View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => router.push("/Deposit")}
              >
                <AntDesign name="arrowdown" size={30} color="#7f86b1" />
              </TouchableOpacity>
              <Text style={styles.depowithtext}>Deposit</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => router.push("/Withdraw")}
              >
                <AntDesign name="arrowup" size={30} color="#7f86b1" />
              </TouchableOpacity>
              <Text style={styles.depowithtext}>Withdraw</Text>
            </View>
          </View>
        </View>
        <Text style={styles.screenTitle}>Recent Transactions</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recentTx}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          ListEmptyComponent={
            <Text style={styles.empty}>No recent transactions</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 0,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
  },
  screenTitle: {
    marginTop: 10,
    marginHorizontal: 24,
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  cardScroll: {
    marginTop: 16,
    maxHeight: 150,
  },
  card: {
    resizeMode: "contain",
    width: 230,
    height: 150,
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    marginRight: 10,
  },
  balanceLabel: {
    position: "absolute",
    top: 25,
    left: 51,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  button: {
    marginTop: 13,
    marginLeft: 20,
    width: 70,
    height: 70,
    backgroundColor: "#d3d5e4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  depowithtext: {
    textAlign: "center",
    width: 110,
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
    marginTop: 5,
    marginBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  error: {
    color: "red",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
