import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import Header from '../../../components/Header';

export default function ShowTodo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch todos from the server
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:8001/get/:user_id');
      // Assuming the response data contains the todos array
      if (response.status === 200) {
        setTodos(response.data.todos);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      alert('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  // Call fetchTodos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Render each todo item
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text style={styles.todoDescription}>{item.description}</Text>
      <Text style={styles.todoPrice}>${item.price}</Text>
      <Button title="Delete" onPress={() => handleDelete(item.uid)} />
    </View>
  );

  // Handle deletion of a todo
  const handleDelete = async (uid) => {
    try {
      const response = await axios.delete(`http://192.168.100.13:8000/delete/${uid}`);
      if (response.status === 200) {
        alert('Todo deleted successfully');
        // Refresh the todo list after deletion
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo');
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.loadingText}>Loading todos...</Text>
        ) : (
          <FlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={(item) => item.uid}
            style={styles.todoList}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
  },
  todoPrice: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
});
