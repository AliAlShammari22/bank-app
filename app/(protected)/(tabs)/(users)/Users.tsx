import { getAllUsers } from "@/api/auth";
import { transfer } from "@/api/transaction";
import UsersItem, { UsersProps } from "@/components/UsersItem";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Users() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersProps | null>(null);
  const [transferAmount, setTransferAmount] = useState("");

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery<UsersProps[], Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6a69d6" />
      </View>
    );
  }
  if (isError || !users) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load: {error?.message}</Text>
      </View>
    );
  }
  const openTransferModal = (user: UsersProps) => {
    setSelectedUser(user);
    setTransferAmount("");
    setModalVisible(true);
  };

  const handleSend = () => {
    const amt = Number(transferAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!selectedUser) return;

    transfer(selectedUser.username, amt)
      .then(() => {
        alert(`Transferred $${amt.toFixed(2)} to ${selectedUser.username}`);
      })
      .catch(() => {
        alert("Transfer failed");
      })
      .finally(() => {
        setModalVisible(false);
      });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <UsersItem {...item} onTransfer={() => openTransferModal(item)} />
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.prompt}>
              {`Amount to send to ${selectedUser?.username}`}
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter amount"
              value={transferAmount}
              onChangeText={setTransferAmount}
            />
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                color="#32303e"
                onPress={() => setModalVisible(false)}
              />
              <Button title="Send" color="#6a69d6" onPress={handleSend} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { color: "red" },
  list: { padding: 16 },
  separator: { height: 8 },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  prompt: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
