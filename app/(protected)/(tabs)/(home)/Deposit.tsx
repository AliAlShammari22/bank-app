// app/Deposit.jsx
import { depositMyAcccount } from "@/api/transaction";
import { useThemeContext } from "@/theme/ThemeProvidor";
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
  const { theme } = useThemeContext();
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
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/images/depo.png")}
          style={styles.image}
        />

        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Deposit Funds
        </Text>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.textPrimary,
            },
          ]}
          placeholder="Enter amount"
          placeholderTextColor={theme.textSecondary}
          keyboardType="number-pad"
          value={amountText}
          onChangeText={setAmountText}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.accent },
            depositMutation.isPending && styles.buttonDisabled,
          ]}
          onPress={handleDeposit}
          disabled={depositMutation.isPending}
        >
          <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
            {depositMutation.isPending ? "Depositing..." : "Deposit"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 190,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    width: "70%",
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 24,
  },
  button: {
    width: "50%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 190,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
