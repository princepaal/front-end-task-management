import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="dark" backgroundColor="#1e90ff" />
      <Stack 
        screenOptions={{
          headerShown: false, 
          animation: "slide_from_right", 
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="taskDetails" options={{headerShown:true,title: 'Task Details', headerBackTitle:'Back'}}/>
        <Stack.Screen name="(tab)/home" />
      </Stack>
    </Provider>
  );
}
