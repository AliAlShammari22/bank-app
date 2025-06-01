import { getUserId } from "@/api/auth";
import { transfer } from "@/api/transaction";
import colors from "@/types/colors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserTransferScreen = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [amount, setAmount] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUserId(userId),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["transfer"],
    mutationFn: (amountNumber: number) =>
      transfer(data?.username, amountNumber),
    onSuccess: () => alert("Transfer succeeded!"),
    onError: () => alert("Transfer failed!"),
  });

  const handleTransfer = () => {
    const amountNumber = parseFloat(amount); // Ensure correct type

    // ✅ Prevent invalid transfers
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    mutate(amountNumber);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading user data...</Text>
        ) : (
          <>
            <Image
              source={require("../../../../assets/images/transfer.png")}
              style={{ height: 190, width: 200 }}
            />
            <Text style={styles.username}>{data?.username}</Text>
            <Text style={styles.balance}>
              Balance: ${data?.balance?.toFixed(2)}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="number-pad"
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor="#888"
              returnKeyType="done"
            />

            <TouchableOpacity
              onPress={handleTransfer}
              style={[styles.button, isPending && styles.disabledButton]}
              disabled={isPending}
            >
              <Text style={styles.buttonText}>
                {isPending ? "Processing..." : "Transfer Money"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default UserTransferScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fcfdff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#777",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  balance: {
    fontSize: 18,
    marginBottom: 20,
    color: "#333",
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
  button: {
    backgroundColor: "#7f86b1",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "70%",
    marginBottom: 140,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
