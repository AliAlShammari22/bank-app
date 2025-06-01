import { depositMyAcccount } from "@/api/transaction";
import colors from "@/types/colors";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Deposit() {
  const [amountText, setAmountText] = useState("");

  const depositMutation = useMutation({
    mutationFn: depositMyAcccount,
    onSuccess: () => alert("Deposit succeeded!"),
    onError: () => alert("Deposit failed!"),
  });

  const handleDeposit = () => {
    const amount = parseFloat(amountText);
    if (!amount || amount <= 0) return alert("Enter a valid amount");
    depositMutation.mutate(amount);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/images/depo.png")}
          style={{ height: 190, width: 200 }}
        />
        <Text style={styles.title}>Deposit Funds</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="number-pad"
          value={amountText}
          onChangeText={setAmountText}
          placeholderTextColor="#888"
          returnKeyType="done"
        />

        <TouchableOpacity style={styles.deposit} onPress={handleDeposit}>
          <Text style={styles.buttonText}>Deposit</Text>
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
    alignItems: "center",
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
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 24,
    alignSelf: "center",
    width: "70%",
  },
  deposit: {
    backgroundColor: "#7f86b1",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    width: "50%",
    marginBottom: 150,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
