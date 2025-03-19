import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Home from "@/app/(tab)/index";
import AddTask from '@/app/(tab)/addTask';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { removeToken } from "@/tokenStore/tokenStore";
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const navigation = useNavigation<any>();

  const handleLogout = async() => {
    await removeToken();
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
        name="Add a Task"
        component={AddTask}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="add" size={24} color="black" />
          ),
        }}
      />
      
      <Tab.Screen
        name="logout"
        component={() => null} 
        options={{
          title: 'logout',
          tabBarButton: (props: any) => (
            <TouchableOpacity {...props} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color="red" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
