import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView} from "react-native";

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if (task.trim().length > 0){
    setTasks([...tasks, { id: Math.random().toString(), task }]);
    setTask('');
    }
  }

  const removeTask = id => {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Digite uma nova tarefa"
          style={styles.input}
          onChangeText={text => setTask(text)}
          value={task}
        />
        <TouchableOpacity
          style={styles.touchable}
          onPress={addTask}
        >
          <Text style={styles.addButton}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {tasks.map(t => (
          <View key={t.id} style={styles.task}>
            <Text>{t.task}</Text>
            <TouchableOpacity onPress={() => removeTask(t.id)} style={styles.remove}>
              <Text>Remover</Text>
              </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    width: '100%',
  },
  form : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  input : {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
    width: '75%'
  },
  addButton : {
    color: 'white',
    textAlign: 'center'
  },
  touchable : {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5
  },
  task : {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5
  },
  scroll : {
    height: '70%',
    width: '100%'
  },
  remove : {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5
  }
}
);
