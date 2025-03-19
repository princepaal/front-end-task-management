import React, { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Text, ActivityIndicator } from "react-native-paper";
import COLORS from "@/constants/colors";
import { useGet } from "@/hooks/useGet";
import { useFocusEffect, useRouter } from "expo-router";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  removeTask: boolean;
  userId: string;
}

interface ApiResponse {
  task: Task[];
}

const Home = () => {
  const router = useRouter();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { data, error, isLoading, refetch } = useGet<ApiResponse>(
    `${apiUrl}/auth/tasks`
  );

  const taskList: Task[] = data?.task ?? [];

  //refetch when user came again to this screen
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator animating size="large" color={COLORS.primary} />
          </View>
        )}
        {!isLoading && taskList?.length > 0 && (
          <View style={styles.taskHeaderContainer}>
            <Text style={styles.taskHeaderTop}>Task Listing</Text>
          </View>
        )}
        {!isLoading && taskList?.length > 0 && (
          <FlatList
            data={taskList}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/taskDetails",
                    params: item,
                  })
                }
              >
                <Card style={styles.card}>
                  <Card.Content>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <Text style={styles.taskDescription}>
                      {item.description}
                    </Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            )}
          />
        )}

        {!isLoading && taskList.length === 0 && (
          <View style={styles.noTaskContainer}>
            <Text style={styles.noTaskText}>No Tasks Available</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  taskHeaderTop: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  taskHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  card: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  taskDescription: {
    fontSize: 14,
    color: "gray",
    paddingTop: 10,
  },
  noTaskContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTaskText: {
    fontSize: 18,
    color: "gray",
  },
});
