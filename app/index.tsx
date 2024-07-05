import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { getTodos } from '~/api/todos';


export default function Home() {

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  return (
    <>
      <Stack.Screen options={{ title: 'To-dos' }} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20}} >
        {todosQuery.isLoading ? <ActivityIndicator size="large" color="#000" /> : null}
        {todosQuery.isError ? <Text>Couldn't load todos</Text> : null}
        <FlatList data={todosQuery.data} keyExtractor={item => item.id} renderItem={({item}) => <Text>{item.id}. {item.task}</Text>} />
      </View>
    </>
  );
}
