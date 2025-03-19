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
import { Link, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "@/redux/loginSlice";
import { storeToken } from "@/tokenStore/tokenStore";

interface MyComponentProps {
  width: number;
  height: number;
}

const LoginScreen: React.FC<MyComponentProps> = ({ width, height }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log('apiUrl', apiUrl)
  const [email, setEmail] = useState("pps@gmail.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState({ email: false, password: false });
  const { data, error, isLoading, postData } = usePost<{ message: string }>();
const route = useRouter()
  const login = useSelector((state: any)=> state.userDetails);
  const dispatch = useDispatch()
  console.log('login', login);

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
      console.log('res &&&&&', res)

      if (error) {
        Alert.alert("Error", error);
        return;
      }
      console.log('res?.data', res?.data)

      if (res?.data.success) {

        await storeToken(res?.data?.token);
        dispatch(userDetails(res?.data?.userId));// storing only user id.
        route.navigate('/(tab)');
      } else {
        Alert.alert("Error", res?.data?.message || "Invalid credentials");
      }
    } catch (err) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
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
              style={[styles.button, { opacity: 0.7 }]}
              disabled
            >
              <ActivityIndicator
                animating
                size={15}
                color="red"
                style={{ marginTop: 18, paddingRight: 10 }}
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
    fontSize: 16,
    fontWeight: "bold",
  },
});
