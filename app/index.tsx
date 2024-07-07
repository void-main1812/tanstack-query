import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Todo, createTodo, deleteTodo, getTodos, updateTodo } from '~/api/todos';
import { Button } from '~/components/Button';

export default function Home() {
  const [todo, setTodo] = useState('');

  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const addTodo = () => {
    addMutation.mutate(todo);
    setTodo('');
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      alert('Todo deleted');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      alert(error);
    },
  });

  const deleteTodoFn = (id: string) => {
    deleteMutation.mutate(id);
  };

  const updateQueryClient = (updatedTodos: Todo) => {
    queryClient.setQueryData(['todos'], (data: any) => {
      return data.map((todo: Todo) => {
        return todo.id === updatedTodos.id ? updatedTodos : todo;
      });
    });
  };

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: updateQueryClient,
  });

  const renderTodo: ListRenderItem<Todo> = ({ item }) => {
    const updateTodoFn = () => {
      updateMutation.mutate({ ...item, done: !item.done });
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginVertical: 4,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 10,
            marginVertical: 4,
            width: '90%',
          }}
          onPress={() => updateTodoFn()}>
          {item.done ? (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          ) : (
            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
          )}
          <Text
            style={{
              textDecorationLine: item.done ? 'line-through' : 'none',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            {item.task}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodoFn(item.id)}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'To-dos' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            flexDirection: 'row',
          }}>
          <TextInput
            placeholder="Add a new task"
            style={{
              borderWidth: 1,
              borderColor: 'black',
              padding: 10,
              width: '70%',
              borderRadius: 10,
            }}
            onChangeText={setTodo}
            value={todo}
          />
          <Button title="Add" onPress={addTodo} style={{ width: '20%', borderRadius: 10 }} />
        </View>
        {todosQuery.isLoading ? <ActivityIndicator size="large" color="#000" /> : null}
        {todosQuery.isError ? <Text>Couldn't load todos</Text> : null}
        <FlatList
          data={todosQuery.data}
          renderItem={renderTodo}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
}
