import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function IndexPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setTimeout(() => {
      const userLoggedIn = false;
      setIsLoggedIn(userLoggedIn);
    }, 1000);
  }, []);

  if (isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? <Redirect href="/(tab)" /> : <Redirect href="/login" />;
}
