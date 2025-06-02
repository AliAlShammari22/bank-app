import { getToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { ThemeProvider } from "@/theme/ThemeProvidor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  const checkToken = async () => {
    // await deleteToken();
    const token = await getToken();
    if (token) {
      setIsAuthenticated(true);
    }
    setReady(true);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      {/* <SafeAreaView
        style={{ flex: 1, backgroundColor: "#fcfdff" }}
        edges={["top"]}
      > */}
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(protected)" />
            </Stack>
          </AuthContext.Provider>
        </QueryClientProvider>
        <StatusBar barStyle={"default"} />
        {/* </SafeAreaView> */}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
