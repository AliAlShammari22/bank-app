// app/UserTransferScreen.jsx
import { getUserId } from "@/api/auth";
import { transfer } from "@/api/transaction";
import { useThemeContext } from "@/theme/ThemeProvidor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserTransferScreen() {
  const { theme } = useThemeContext();
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [amount, setAmount] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["getUser", userId],
    queryFn: () => getUserId(userId),
  });

  const transferMutation = useMutation({
    mutationKey: ["transfer"],
    mutationFn: (amountNumber: number) =>
      transfer(data?.username, amountNumber),
    onSuccess: () => alert("Transfer succeeded!"),
    onError: () => alert("Transfer failed!"),
  });

  const handleTransfer = () => {
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }
    transferMutation.mutate(amountNumber);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.textPrimary} />
        ) : (
          <>
            <Image
              source={require("../../../../assets/images/transfer.png")}
              style={styles.image}
            />
            <Text style={[styles.username, { color: theme.textPrimary }]}>
              {data?.username}
            </Text>
            <Text style={[styles.balance, { color: theme.textSecondary }]}>
              Balance: {Math.max(data?.balance ?? 0, 0).toFixed(2)} KD
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
              value={amount}
              onChangeText={setAmount}
              returnKeyType="done"
            />

            <TouchableOpacity
              onPress={handleTransfer}
              style={[
                styles.button,
                {
                  backgroundColor: theme.accent,
                  opacity: transferMutation.isPending ? 0.7 : 1,
                },
              ]}
              disabled={transferMutation.isPaused}
            >
              <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
                {transferMutation.isPending
                  ? "Processing..."
                  : "Transfer Money"}
              </Text>
            </TouchableOpacity>
          </>
        )}
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
  username: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  balance: {
    fontSize: 18,
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
    width: "70%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
