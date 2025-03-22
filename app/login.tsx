import React, { useState } from "react";
 import { View, StyleSheet, Alert } from "react-native";
 import {
   TextInput,
   Button,
   Text,
   HelperText,
   Card,
   ActivityIndicator,
 } from "react-native-paper";
 import COLORS from "@/constants/colors";
 import { usePost } from "@/hooks/usePost";
 import withDimensions from "@/components/addDimensions/dimensionHOC";
 import { Link, router } from "expo-router";
import { storeToken } from "@/tokenStore/tokenStore";
import { userDetails } from "@/redux/loginSlice";
import { useDispatch } from "react-redux";
 
 interface MyComponentProps {
   width: number;
   height: number;
 }
 
 const LoginScreen: React.FC<MyComponentProps> = ({ width, height }) => {
   const apiUrl = process.env.EXPO_PUBLIC_API_URL;
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState({ email: false, password: false });
   const { data, error, isLoading, postData } = usePost<{ message: string }>();
  const dispatch = useDispatch();
   const validateForm = () => {
     const newErrors = {
       email: !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
       password: password.length < 6,
     };
 
     setErrors(newErrors);
     if (!newErrors.email && !newErrors.password) {
       handleLogin();
     }
   };
 
   const handleLogin = async () => {
     try {
       const body = { email, password };
       let res: any = await postData(`${apiUrl}/auth/login`, body);
 
       if (error) {
         Alert.alert("Error", error);
         return;
       }
 
       if (res?.data.success) {
        //  Alert.alert("Login Success", "Logged in successfully!");
         await storeToken(res.data?.token)
         dispatch(userDetails(res?.data?.userId))
         router.navigate('/(tab)');
       } else {
         Alert.alert("Error", res?.data?.message || "Invalid credentials");
       }
     } catch (err) {
       Alert.alert("Error", "An unexpected error occurred. Please try again.");
       console.error("Login Error:", err);
     }
   };
 
   return (
     <View style={styles.container}>
       <Card style={styles.card}>
         <Card.Title title="Login" titleStyle={styles.title} />
         <Card.Content>
           <TextInput
             label="Email"
             value={email}
             onChangeText={setEmail}
             mode="outlined"
             error={errors.email}
             keyboardType="email-address"
             style={styles.input}
           />
           <HelperText type="error" visible={errors.email}>
             Enter a valid email.
           </HelperText>
 
           <TextInput
             label="Password"
             value={password}
             onChangeText={setPassword}
             mode="outlined"
             error={errors.password}
             secureTextEntry
             style={styles.input}
           />
           <HelperText type="error" visible={errors.password}>
             Password must be at least 6 characters long.
           </HelperText>
 
           {isLoading ? (
             <Button
               mode="contained"
               style={[styles.button, { opacity: 0.5 }]}
               disabled
             >
               <ActivityIndicator
                 animating
                 size={15}
                 color="red"
                 style={{ paddingTop: 10, paddingRight: 10 }}
               />
               <Text style={styles.buttonText}>Loading...</Text>
             </Button>
           ) : (
             <Button
               mode="contained"
               onPress={validateForm}
               style={styles.button}
             >
               <Text style={styles.buttonText}>Login</Text>
             </Button>
           )}
           <Link href="/signup" style={styles.bottomSignupText}>
             Sign Up
           </Link>
         </Card.Content>
       </Card>
     </View>
   );
 };
 
 export default withDimensions(LoginScreen);
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: COLORS.background,
   },
   card: {
     width: "90%",
     padding: 20,
     borderRadius: 10,
     backgroundColor: "#fff",
   },
   title: {
     fontSize: 24,
     fontWeight: "bold",
     color: COLORS.primary,
     textAlign: "center",
   },
   input: {
     marginBottom: 10,
   },
   button: {
     backgroundColor: COLORS.button,
     paddingVertical: 6,
     marginTop: 10,
   },
   buttonText: {
     color: COLORS.buttonText,
     fontSize: 16,
     fontWeight: "bold",
   },
   bottomSignupText: {
     color: COLORS.primary,
     paddingTop: 5,
   },
 });