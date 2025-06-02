// app/Home.jsx
import { me } from "@/api/auth";
import { getMyTransaction } from "@/api/transaction";
import TransactionItem from "@/components/TransactionItem";
import { useThemeContext } from "@/theme/ThemeProvidor";
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
  const { theme } = useThemeContext();

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
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.textPrimary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.error, { color: theme.accent }]}>
          Failed to load: {error.message}
        </Text>
      </View>
    );
  }

  const balance = data?.balance?.toFixed(2) ?? "0.00";
  const recentTx = transactions.slice(-5).reverse();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={[styles.background, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={theme.textPrimary}
          />
          <Text style={[styles.greeting, { color: theme.textPrimary }]}>
            {`Hi, ${data?.username}`}
          </Text>
          <View style={styles.headerIcons}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.textPrimary}
            />
            <Ionicons
              name="help-circle-outline"
              size={24}
              color={theme.textPrimary}
              style={{ marginLeft: 16 }}
            />
          </View>
        </View>

        {/* Screen Title */}
        <Text style={[styles.screenTitle, { color: theme.textPrimary }]}>
          HOME
        </Text>

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
            <Text style={[styles.balanceLabel, { color: theme.textPrimary }]}>
              {`Balance: ${balance} KD`}
            </Text>
          </ScrollView>
        </View>

        {/* Finance Buttons */}
        <View>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Finance
          </Text>
          <View style={styles.financeRow}>
            <View style={styles.financeItem}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: theme.accent, borderColor: theme.border },
                ]}
                activeOpacity={0.7}
                onPress={() => router.push("/Deposit")}
              >
                <AntDesign
                  name="arrowdown"
                  size={30}
                  color={theme.textPrimary}
                />
              </TouchableOpacity>
              <Text style={[styles.depowithText, { color: theme.textPrimary }]}>
                Deposit
              </Text>
            </View>
            <View style={styles.financeItem}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: theme.accent, borderColor: theme.border },
                ]}
                activeOpacity={0.7}
                onPress={() => router.push("/Withdraw")}
              >
                <AntDesign name="arrowup" size={30} color={theme.textPrimary} />
              </TouchableOpacity>
              <Text style={[styles.depowithText, { color: theme.textPrimary }]}>
                Withdraw
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Recent Transactions
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recentTx}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: theme.textSecondary }]}>
              No recent transactions
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 5,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
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
  },
  cardScroll: {
    marginTop: 16,
    maxHeight: 150,
  },
  card: {
    resizeMode: "cover",
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
    marginRight: 10,
  },
  balanceLabel: {
    position: "absolute",
    top: 25,
    left: 45,
    fontWeight: "500",
  },
  sectionTitle: {
    marginTop: 15,
    marginHorizontal: 24,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  financeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 5,
  },
  financeItem: {
    alignItems: "center",
    marginHorizontal: 30,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  depowithText: {
    textAlign: "center",
    width: 110,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
  },
  error: {
    marginTop: 20,
  },
});
