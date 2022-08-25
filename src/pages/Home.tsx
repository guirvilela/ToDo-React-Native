import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface IEditTask {
  taskId: number;
  taskTitle?: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: newTaskTitle, done: false, edit: false },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map((task) => ({ ...task }));

    const taskFounded = updateTask.find((task) => task.id === id);

    if (!taskFounded) {
      return;
    }

    taskFounded.done = !taskFounded.done;
    setTasks(updateTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que deseja remover este item?", [
      {
        text: "Não",
      },
      {
        text: "Sim",
        onPress: () => {
          const taskFounded = tasks.filter((task) => task.id !== id);

          setTasks(taskFounded);
        },
      },
    ]);
  }

  function handleEditTask({ taskId, taskTitle }: IEditTask) {
    const updateTask = tasks.map((task) => ({ ...task }));

    const taskFounded = updateTask.find((task) => task.id === taskId);

    if (taskFounded && !taskTitle) {
      taskFounded.edit = true;
    }
    if (taskFounded && taskTitle) {
      taskFounded.edit = false;
      taskFounded.title = taskTitle;
    }
    setTasks(updateTask);
  }

  function handleCancelEditTask(id: number) {
    const updateTask = tasks.map((task) => ({ ...task }));
    const taskFounded = updateTask.find((task) => task.id === id);

    if (taskFounded) {
      taskFounded.edit = false;
    }
    setTasks(updateTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
        cancelEditTask={handleCancelEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
