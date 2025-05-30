import { depositMyAcccount, withdraw } from "@/api/transaction";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [amountText, setAmountText] = useState("");

  const handleTransaction = (action: "deposit" | "withdraw") => {
    const amount = parseFloat(amountText);
    if (!amount || amount <= 0) return alert("Enter a valid amount");

    action === "deposit"
      ? depositMutation.mutate(amount)
      : withdrawMutation.mutate(amount);
  };

  const depositMutation = useMutation({
    mutationFn: depositMyAcccount,
    onSuccess: () => alert("Deposit succeeded!"),
    onError: () => alert("Deposit Faild!"),
  });

  const withdrawMutation = useMutation({
    mutationFn: withdraw,
    onSuccess: () => alert("Withdrawal succeeded!"),
    onError: () => alert("Withdrawal Faild!"),
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Manage Your Funds</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="number-pad"
          value={amountText}
          onChangeText={setAmountText}
          placeholderTextColor="#888"
          returnKeyType="done"
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.deposit}
            onPress={() => handleTransaction("deposit")}
          >
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.withdraw}
            onPress={() => handleTransaction("withdraw")}
          >
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fcfdff" },
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#f4f4f6",
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 24,
    alignSelf: "center",
    width: "70%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  deposit: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  withdraw: {
    flex: 1,
    backgroundColor: "#dc3545",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
