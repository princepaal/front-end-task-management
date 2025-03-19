import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to save token
const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("userToken", token);
    console.log("Token stored successfully!");
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    console.log("Token removed successfully!");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export {storeToken, getToken, removeToken}
