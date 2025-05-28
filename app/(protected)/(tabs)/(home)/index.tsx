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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fcfdff" }}
      edges={["top"]}
    >
      <View style={styles.container}>
        {/* Account Bar */}
        <View style={styles.accountBar}>
          <View style={styles.accountLeft}>
            <View style={styles.accountIcon} />
            <View style={styles.accountText}>
              <Text style={styles.accountDate}>MAY 28, 2025</Text>
              <Text style={styles.accountName}>HI, FAJER</Text>
            </View>
          </View>
          <View style={styles.accountRight}>
            <View style={styles.notificationIcon} />
            <View style={styles.helpIcon} />
          </View>
        </View>

        <View style={styles.bottomBarRight} />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="number-pad"
          value={amountText}
          onChangeText={setAmountText}
          placeholderTextColor="white"
        />

        <TouchableOpacity onPress={handleDeposit} style={styles.button}>
          <Text style={styles.buttonText}>Deposit To My Account</Text>
        </TouchableOpacity>
        {/* {depositMutation.isLoading && <Text>Depositing…</Text>} */}
        {depositMutation.error && (
          <Text style={styles.error}>Deposit failed.</Text>
        )}

        <TouchableOpacity onPress={handleWithdraw} style={styles.button}>
          <Text style={styles.buttonText}>Withdraw From My Account</Text>
        </TouchableOpacity>
        {/* {withdrawMutation.isLoading && <Text>Withdrawing…</Text>} */}
        {withdrawMutation.error && (
          <Text style={styles.error}>Withdrawal failed.</Text>
        )}
      </View>
    </SafeAreaView>
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
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    width: 210,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "600" },
  error: { marginTop: 5, color: "red" },
  notch: {
    position: "absolute",
    top: 0,
    left: 78,
    width: 219,
    height: 30,
    backgroundColor: "#000",
  },
  statusBar: {
    position: "absolute",
    top: 0,
    height: 32,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
  },
  accountBar: {
    position: "absolute",
    top: 46,
    left: 0,
    right: 0,
    height: 42,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
  },
  accountIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#000",
  },
  accountText: {
    marginLeft: 16,
  },
  accountDate: {
    fontSize: 9,
    color: "#000",
  },
  accountName: {
    fontSize: 9,
    color: "#000",
  },
  accountRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingRight: 16,
  },
  notificationIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#000",
    marginRight: 16,
  },
  helpIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#000",
  },
  dividerTop: {
    position: "absolute",
    top: 1,
    height: 1,
    left: 0,
    right: 0,
    backgroundColor: "#CCC",
  },
  dividerBottom: {
    position: "absolute",
    bottom: 0,
    height: 1,
    left: 0,
    right: 0,
    backgroundColor: "#CCC",
  },
  bottomBarLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 51,
    width: 188,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    color: "#333",
  },
  bottomBarRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 52,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16,
  },
});
