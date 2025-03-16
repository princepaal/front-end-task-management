import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Simulate fetching auth state (Replace with AsyncStorage or Firebase)
    setTimeout(() => {
      const userLoggedIn = false; // Replace this with actual login check
      setIsLoggedIn(userLoggedIn);
    }, 1000);
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      ) : (
        <>
        <Stack.Screen name="login" />
        <Stack.Screen name ="signup"/>
        </>
      )}
    </Stack>
  );
}
