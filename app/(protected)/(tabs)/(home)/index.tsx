import { depositMyAcccount } from "@/api/transaction";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [amount, setAmount] = useState<string>("");

  const { mutate, data, error } = useMutation({
    mutationKey: ["setAmount"],
    mutationFn: depositMyAcccount,
    onSuccess: () => alert("Deposit Success!"),
    onError: () => alert("Deposit Faild!"),
  });

  const handleDeposit = () => {
    const n = Number(amount);
    if (isNaN(n) || n <= 0) {
      alert("Enter a valid amount");
      return;
    }

    mutate(n);
  };
  console.log("this is data", data);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="number-pad"
        value={amount}
        onChangeText={setAmount}
        placeholderTextColor="white"
      />

      <TouchableOpacity onPress={handleDeposit} style={styles.button}>
        <Text style={styles.buttonText}>Deposit To My Account</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>Deposit failed.</Text>}
      {/* {data && <Text style={styles.status}>New balance: {data.balance}</Text>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: 120,
    backgroundColor: "#7162eb",
    padding: 10,
    borderRadius: 5,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "600" },
  status: { marginTop: 10, color: "#333" },
  error: { marginTop: 10, color: "red" },
});
