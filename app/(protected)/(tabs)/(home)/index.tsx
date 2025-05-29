import { depositMyAcccount, withdraw } from "@/api/transaction";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [amountText, setAmountText] = useState("");

  const depositMutation = useMutation({
    mutationKey: ["deposit"],
    mutationFn: depositMyAcccount,
    onSuccess: () => alert("Deposit succeeded!"),
    onError: () => alert("Deposit failed!"),
  });

  const withdrawMutation = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: withdraw,
    onSuccess: () => alert("Withdrawal succeeded!"),
    onError: () => alert("Withdrawal failed!"),
  });

  const parseAmount = () => {
    const n = Number(amountText);
    if (isNaN(n) || n <= 0) {
      alert("Please enter a valid amount");
      return null;
    }
    return n;
  };

  const handleDeposit = () => {
    const n = parseAmount();
    if (n !== null) depositMutation.mutate(n);
  };

  const handleWithdraw = () => {
    const n = parseAmount();
    if (n !== null) withdrawMutation.mutate(n);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Manage Funds</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="number-pad"
          value={amountText}
          onChangeText={setAmountText}
          placeholderTextColor="#888"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={handleDeposit}
            style={[styles.button, styles.deposit]}
          >
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleWithdraw}
            style={[styles.button, styles.withdraw]}
          >
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {depositMutation.error && (
          <Text style={styles.error}>Deposit failed.</Text>
        )}
        {withdrawMutation.error && (
          <Text style={styles.error}>Withdrawal failed.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fcfdff",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#f4f4f6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 18,
    color: "#333",
    marginBottom: 24,
    // Shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    // Elevation (Android)
    elevation: 2,
    alignSelf: "center",
    width: "70%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  deposit: {
    backgroundColor: "#28a745",
  },
  withdraw: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loader: {
    marginBottom: 16,
  },
  error: {
    color: "#dc3545",
    textAlign: "center",
    marginTop: 8,
  },
});
