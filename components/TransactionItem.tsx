import colors from "@/types/colors";
import { Transaction } from "@/types/Transactions";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { amount, type, createdAt } = transaction;
  const date = new Date(createdAt).toLocaleString();
  const color =
    type === "deposit"
      ? "#4caf50"
      : type === "withdraw"
      ? "#f44336"
      : "#2196f3";

  return (
    <View style={[styles.row, { borderLeftColor: color }]}>
      <View style={styles.info}>
        <Text style={styles.type}>{type.toUpperCase()}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={[styles.amount, { color }]}>
        {type === "withdraw" ? "-" : "+"}${amount.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#AC9FBB",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  info: {},
  type: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});

export default TransactionItem;
