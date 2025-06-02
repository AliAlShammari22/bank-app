// app/Transactions.jsx
import { getMyTransaction } from "@/api/transaction";
import TransactionItem from "@/components/TransactionItem";
import { useThemeContext } from "@/theme/ThemeProvidor";
import { Transaction } from "@/types/Transactions";
import { useScrollToTop } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
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
  const { theme } = useThemeContext();
  const ref = useRef<FlatList>(null);

  useScrollToTop(ref);
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

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      {/* Search Bar */}
      <Searchbar
        placeholder="Search by date or amount"
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor={theme.accent}
        placeholderTextColor={theme.textSecondary}
        inputStyle={[styles.searchInput, { color: theme.textPrimary }]}
        style={[
          styles.searchbar,
          { backgroundColor: theme.inputBackground, borderColor: theme.border },
        ]}
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
            style={[
              styles.typeBtn,
              { borderColor: theme.textPrimary },
              typeFilter === t && {
                backgroundColor: theme.accent,
              },
            ]}
            onPress={() => setTypeFilter(t)}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color:
                    typeFilter === t ? theme.background : theme.textPrimary,
                },
              ]}
            >
              {t === null ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transactions List */}
      <FlatList
        ref={ref}
        data={filtered.reverse()}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.textSecondary }]}>
            No transactions
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    marginTop: 20,
  },
  // Searchbar container
  searchbar: {
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  // Text inside Searchbar
  searchInput: {},
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  typeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 20,
  },
  typeText: {
    fontSize: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 24,
  },
});
