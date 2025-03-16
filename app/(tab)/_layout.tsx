import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/loginSlice"; 
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Home from ".";
import AddTask from "./addTask";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser(false)); 
    navigation.replace("login");
  };

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={AddTask}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="logout"
        component={() => null} 
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity  onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="red" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
