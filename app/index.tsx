import { getToken } from "@/tokenStore/tokenStore";
import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function IndexPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<string| null>('');
  const fetchToken = async () => {
    const tokenAuth = await getToken();
    setTimeout(() => {
      setIsLoggedIn(tokenAuth);
    }, 1000);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  if (isLoggedIn == '') {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? <Redirect href="/(tab)" /> : <Redirect href="/login" />;
}
