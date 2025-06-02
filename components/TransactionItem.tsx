// components/TransactionItem.jsx
import { useThemeContext } from "@/theme/ThemeProvidor";
import { Transaction } from "@/types/Transactions";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { theme } = useThemeContext();
  const { amount, type, createdAt } = transaction;
  const date = new Date(createdAt).toLocaleString();

  // Use theme.accent for deposits, theme.textSecondary for others
  const amountColor = type === "deposit" ? theme.accent : theme.textSecondary;
  const sign = type === "deposit" ? "+" : "-";

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
          borderLeftColor: theme.accent,
        },
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.type, { color: theme.textPrimary }]}>
          {type.toUpperCase()}
        </Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>
          {date}
        </Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        {sign}
        {amount.toFixed(2)} KD
      </Text>
    </View>
  );
}

export default TransactionItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  info: {},
  type: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
