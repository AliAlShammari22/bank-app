import { getMyTransaction } from "@/api/transaction";
import TransactionItem from "@/components/TransactionItem";
import colors from "@/types/colors";
import { Transaction } from "@/types/Transactions";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<null | Transaction["type"]>(
    null
  );

  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery<Transaction[]>({
    queryKey: ["myTransactions"],
    queryFn: getMyTransaction,
  });

  // 1) First, filter by type
  let filtered = typeFilter
    ? transactions.filter((tx) => tx.type === typeFilter)
    : transactions;

  // 2) Then apply the search‐by‐createdAt or amount
  if (searchQuery) {
    filtered = filtered.filter((t) => {
      const matchesDate = t.createdAt.includes(searchQuery);
      const matchesAmount = String(t.amount).includes(searchQuery);
      return matchesDate || matchesAmount;
    });
  }

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

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      {/* Search Bar */}
      <Searchbar
        returnKeyType="done"
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor="#64748B"
        placeholderTextColor="#64748B"
        inputStyle={{ color: colors.primary }}
        style={{
          marginHorizontal: 10,
          borderColor: colors.border,
          borderWidth: 1,
          backgroundColor: "#fff",
        }}
      />

      {/* Type Filter Buttons */}
      <View style={styles.typeContainer}>
        {(
          [null, "deposit", "withdraw", "transfer"] as Array<
            null | Transaction["type"]
          >
        ).map((t) => (
          <TouchableOpacity
            key={String(t)}
            style={[styles.typeBtn, typeFilter === t && styles.typeBtnActive]}
            onPress={() => setTypeFilter(t)}
          >
            <Text
              style={[
                styles.typeText,
                typeFilter === t && styles.typeTextActive,
              ]}
            >
              {t === null ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No transactions</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red" },

  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  typeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    borderRadius: 20,
  },
  typeBtnActive: {
    backgroundColor: "#F16F0D",
    color: colors.textPrimary,
  },
  typeText: { color: colors.textPrimary, fontSize: 12 },
  typeTextActive: { color: colors.white },

  list: { padding: 16 },
  empty: {
    textAlign: "center",
    marginTop: 24,
    color: colors.textSecondary,
  },
});
