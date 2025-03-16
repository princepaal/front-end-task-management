import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack 
        screenOptions={{
          headerShown: false, 
          animation: "slide_from_right", 
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tab)/home" />
      </Stack>
    </Provider>
  );
}
