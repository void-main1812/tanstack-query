import '../global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { DevToolsBubble } from 'react-native-react-query-devtools';
import { queryClient } from '~/queryClient';

if(__DEV__){
  import('~/reactotron').then(() => console.log('Reactotron Configured'))}

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
      <DevToolsBubble/>
    </QueryClientProvider>
  );
}
