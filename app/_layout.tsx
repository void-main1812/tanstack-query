import '../global.css';

import { Stack } from 'expo-router';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { DevToolsBubble } from 'react-native-react-query-devtools';

const queryClient = new QueryClient();  

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
      <DevToolsBubble/>
    </QueryClientProvider>
  );
}
