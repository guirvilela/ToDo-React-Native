import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: newTaskTitle, done: false },
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
    const taskFounded = tasks.filter((task) => task.id !== id);

    setTasks(taskFounded);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
