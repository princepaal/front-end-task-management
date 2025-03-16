import { Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

export default function IndexPage() {
  const {token} = useSelector((state: any)=> state.userDetails);
  console.log('token', token)
  const [isLoggedIn, setIsLoggedIn] = useState(token);
  console.log('isLoggedIn **********', isLoggedIn)

  useEffect(() => {
    setTimeout(() => {
      const userLoggedIn = false;
      setIsLoggedIn(userLoggedIn);
    }, 1000);
  }, []);

  if (isLoggedIn == null || undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? <Redirect href="/(tab)" /> : <Redirect href="/login" />;
}
