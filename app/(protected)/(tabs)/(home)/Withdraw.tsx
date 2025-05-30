import { withdraw } from "@/api/transaction";
import colors from "@/types/colors";
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

export default function Withdraw() {
  const [amountText, setAmountText] = useState("");

  const withdrawMutation = useMutation({
    mutationFn: withdraw,
    onSuccess: () => alert("Withdrawal succeeded!"),
    onError: () => alert("Withdrawal failed!"),
  });

  const handleWithdraw = () => {
    const amount = parseFloat(amountText);
    if (!amount || amount <= 0) return alert("Enter a valid amount");
    withdrawMutation.mutate(amount);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Withdraw Funds</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="number-pad"
          value={amountText}
          onChangeText={setAmountText}
          placeholderTextColor="#888"
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.withdraw} onPress={handleWithdraw}>
          <Text style={styles.buttonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
    color: colors.textPrimary,
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
  withdraw: {
    backgroundColor: "#dc3545",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
