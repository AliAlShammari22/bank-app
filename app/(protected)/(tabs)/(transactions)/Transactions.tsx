import { getMyTransaction } from "@/api/transaction";
import TransactionItem from "@/components/TransactionItem";
import colors from "@/types/colors";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
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

interface Transaction {
  _id: string;
  date: string;
  amount: number;
  type: "deposit" | "withdraw" | "transfer";
  createdAt: string;
  updatedAt: string;
}

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery<Transaction[]>({
    queryKey: ["myTransactions"],
    queryFn: getMyTransaction,
  });

  const [typeFilter, setTypeFilter] = useState<null | Transaction["type"]>(
    null
  );

  let filtered = useMemo(() => {
    return typeFilter
      ? transactions.filter((tx) => tx.type === typeFilter)
      : transactions;
  }, [transactions, typeFilter]);

  filtered = filtered.filter(
    (t: any) =>
      t.createdAt.includes(searchQuery) ||
      String(t.amount).includes(searchQuery)
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.border} />
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
      {/* Type Filter Buttons */}
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <View style={styles.typeContainer}>
        {[null, "deposit", "withdraw", "transfer"].map((t: any) => (
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
    borderColor: colors.textSecondary,
    borderRadius: 20,
  },
  typeBtnActive: {
    backgroundColor: colors.border,
  },
  typeText: { color: colors.textSecondary, fontSize: 12 },
  typeTextActive: { color: colors.white },

  list: { padding: 16 },
  empty: {
    textAlign: "center",
    marginTop: 24,
    color: colors.textSecondary,
  },
});
