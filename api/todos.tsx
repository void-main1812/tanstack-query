const API_URL = process.env.EXPO_PUBLIC_API_URL;
import sleep from "sleep-promise";

interface Todos {
  id: string;
  task: string;
  done: boolean;
}

export const getTodos = async () => {
    // await sleep(2000);
    const response = await fetch(`${API_URL}/todos`);
    const data = await response.json();
    return data;
};