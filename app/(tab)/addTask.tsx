import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, HelperText, Card, ActivityIndicator } from "react-native-paper";
import COLORS from "@/constants/colors";
import { usePost } from "@/hooks/usePost";
import withDimensions from "@/components/addDimensions/dimensionHOC";
import { useRouter } from "expo-router";
import { Platform } from 'react-native';
import { useSelector } from "react-redux";
import { getToken } from "@/tokenStore/tokenStore";
interface MyComponentProps {
  width: number;
  height: number;
}

const AddTaskScreen: React.FC<MyComponentProps> = ({ width, height }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ taskName: false, description: false });
  const { data, error, isLoading, postData } = usePost<{ message: string }>();
  // const router = useRouter();

  // const {token} = useSelector((state: any)=> state?.userDetails);


  const validateForm = () => {
    const newErrors = {
      taskName: taskName.trim().length === 0,
      description: description.trim().length === 0,
    };

    setErrors(newErrors);
    if (!newErrors.taskName && !newErrors.description) {
      handleAddTask();
    }
  };

  const handleAddTask = async () => {
    try {
      const token = await getToken();
      console.log('authToken *********&&&&&&&&&&&&&&', token)
      const body = { title : taskName, description: description };
      let res: any = await postData(`${apiUrl}/auth/tasks`, body, token);

      if (error) {
        Alert.alert("Error", error);
        return;
      }
      if (res?.data.success) {
        Alert.alert("Success", "Task added successfully!",[
          {
            text: "OK",
            onPress: () => {
              setTaskName('');
              setDescription('');
            },
          },
        ]);
        // router.navigate("/(tab)/tasks");
      } else {
        Alert.alert("Error", res?.data?.message || "Failed to add task.");
      }
    } catch (err) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Add Task" titleStyle={styles.title} />
        <Card.Content>
          <TextInput
            label="Enter task name"
            value={taskName}
            onChangeText={setTaskName}
            mode="outlined"
            error={errors.taskName}
            style={styles.input}
          />
          <HelperText type="error" visible={errors.taskName}>
            Task name is required.
          </HelperText>

          <TextInput
            label="Write description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            error={errors.description}
            style={styles.input}
            multiline
            numberOfLines={3}
          />
          <HelperText type="error" visible={errors.description}>
            Description is required.
          </HelperText>

          {isLoading ? (
            <Button mode="contained" style={[styles.button, { opacity: 0.7 }]} disabled>
              <ActivityIndicator animating size={18} color="red" style={{  marginTop:  10, paddingRight: 10 }} />
              <Text style={styles.buttonText}>Adding Task</Text>
            </Button>
          ) : (
            <Button mode="contained" onPress={validateForm} style={styles.button}>
              <Text style={styles.buttonText}>Add Task</Text>
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

export default withDimensions(AddTaskScreen);

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
});
