import React, { useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { ItemWrapper } from "./ItemWrapper";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import closeIcon from "../assets/icons/close/close.png";
import { IEditTask } from "../pages/Home";

export interface Task {
  id: number;
  title: string;
  done: boolean;
  edit: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskTitle }: IEditTask) => void;
  cancelEditTask: (id: number) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
  cancelEditTask,
}: TasksListProps) {
  const [newTask, setNewTask] = useState<string>("");
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
              >
                <View
                  testID={`marker-${index}`}
                  style={!item.done ? styles.taskMarker : styles.taskMarkerDone}
                >
                  {item.done && <Icon name="check" size={12} color="#FFF" />}
                </View>
                {!item.edit ? (
                  <Text
                    style={!item.done ? styles.taskText : styles.taskTextDone}
                  >
                    {item.title}
                  </Text>
                ) : (
                  <TextInput
                    defaultValue={item.title}
                    style={styles.input}
                    onChangeText={setNewTask}
                    autoFocus={item.edit}
                    onSubmitEditing={() =>
                      editTask({ taskId: item.id, taskTitle: newTask })
                    }
                    // value={newTask}
                  />
                )}
              </TouchableOpacity>
            </View>

            {item.edit ? (
              <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 24 }}
                onPress={() => cancelEditTask(item.id)}
              >
                <Image source={closeIcon} />
              </TouchableOpacity>
            ) : (
              <View style={styles.taskButtons}>
                <TouchableOpacity onPress={() => editTask({ taskId: item.id })}>
                  <Image source={editIcon} />
                </TouchableOpacity>

                <TouchableOpacity
                  testID={`trash-${index}`}
                  style={{ paddingHorizontal: 24 }}
                  onPress={() => removeTask(item.id)}
                >
                  <Image source={trashIcon} />
                </TouchableOpacity>
              </View>
            )}
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },

  taskButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  input: {
    padding: 0,
  },
});
