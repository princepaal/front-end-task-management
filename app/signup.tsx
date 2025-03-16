import React, { useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
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
import { Link } from "expo-router";

const SignupScreen = () => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log("apiUrl", apiUrl);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const { data, error, isLoading, postData } = usePost<{ message: string }>();

  const validateForm = () => {
    const newErrors = {
      name: name.trim() === "",
      email: !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
      password: password.length < 6,
    };

    setErrors(newErrors);
    if (!newErrors.name && !newErrors.email && !newErrors.password) {
      handleSignup();
    }
  };
  //   console.log('errors', errors)

  const handleSignup = async () => {
    const showAlert = (title: string, message: string,login?: Boolean) => {
      Alert.alert(title, message, [
        {
          text: "OK",
          onPress: () => {
            if (login) {
              setName("");
              setEmail("");
              setPassword("");
            }
          },
        },
      ]);
    };
  
    try {
      const body = { name, email, password };
      let res: any = await postData(`${apiUrl}/auth/signup`, body);
       console.log('res', res)
      if (error) {
        showAlert("Error", error);
        return;
      }
  
      if (res?.data.success) {
        showAlert("Signup", "Signup Successfully",true);
        
      } else {
        showAlert("Error",res?.data?.message || "Something went wrong");
      }
    } catch (err) {
      showAlert("Error", "An unexpected error occurred. Please try again.");
      console.error("Signup Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Sign Up" titleStyle ={styles.title}/>
        <Card.Content>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            error={errors.name}
            style={styles.input}
          />
          <HelperText type="error" visible={errors.name}>
            Name is required.
          </HelperText>

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
              onPress={validateForm}
              style={[styles.button, isLoading && { opacity: 0.5 }]}
              disabled={isLoading}
            >
              <ActivityIndicator
                animating={isLoading}
                size={15}
                color="red"
                style={{ paddingTop: 10, paddingRight: 10 }}
              />
              <Text style={[styles.buttonText]}>Loading...</Text>
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={validateForm}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Button>
          )}
          <Link href="/login" style={styles.bottomSignupText}>
            Log In
          </Link>
        </Card.Content>
      </Card>
    </View>
  );
};

export default SignupScreen;

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
    fontSize: 16,
    fontWeight: "bold",
  },
});
