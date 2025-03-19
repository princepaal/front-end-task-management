import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, Button, Switch } from "react-native-paper";
import COLORS from "@/constants/colors";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getToken } from "@/tokenStore/tokenStore";
import { usePut } from "@/hooks/usePut";

interface IProps{
  title: string
}
const TaskDetails = () => {
  const router = useRouter();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const params = useLocalSearchParams();
  const { _id, title, description } = params;
  const { isLoading, putData } = usePut();
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);

  // update Task
  const handleUpdateTask = async () => {
    const body = { title: taskTitle, description: taskDescription };
    try {
      const updatedData = await putData(`${apiUrl}/auth/tasks/${_id}`, body);
      if (updatedData) {
        Alert.alert("Success", "Task updated successfully!", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        throw new Error("No response data received.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      Alert.alert("Error", "Failed to update task. Try again!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }
  };

  // delete Task

  const handleDeleteTask = async () => {
    try {
      const token = await getToken();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `${apiUrl}/auth/task/${_id}`;
      const res = await axios.delete(url, config);
      if (res?.data) {
        Alert.alert("Deleted", "Task deleted successfully!", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      }
      
    } catch (error) {
      Alert.alert("Error", "Failed to delete task. Try again!");
    }
    
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={taskTitle}
            onChangeText={setTaskTitle}
            placeholder="Enter task title"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={taskDescription}
            onChangeText={setTaskDescription}
            placeholder="Enter task description"
            multiline
          />

          <Button
            mode="contained"
            onPress={handleUpdateTask}
            style={styles.updateButton}
          >
            {isLoading ? "Loading" : "Update Task"}
          </Button>

          <Button
            mode="contained"
            onPress={handleDeleteTask}
            style={[styles.deleteButton]}
            textColor="white"
          >
            Delete Task
          </Button>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.text,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  updateButton: {
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
  },
});
