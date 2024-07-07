const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Todo {
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

// create a new todo
export const createTodo = async (task: string): Promise<Todo> => {
  const todo = { task, done: false };

  const result = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  return result.json();
}

// import axios from 'axios'; // Import axios library

// export const createTodo = async (task: string): Promise<Todo> => {
//   const todo = { task, done: false }; // Create a new todo object with the given task and done set to false

//   try {
//     const response = await axios.post(`${API_URL}/todos`, todo); // Send a POST request to the API_URL with the todo object as the request body
//     return response.data; // Return the response data, which should be the created todo object
//   } catch (error) {
//     throw new Error('Failed to create todo'); // Throw an error if the request fails
//   }
// }

// update a todo
export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const result = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  return result.json();
}

// delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  const result = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  })

  return result.json()
}

// Get todo by id
export const getTodo = async (id: string): Promise<Todo> => {
  const result = await fetch(`${API_URL}/todos/${id}`);
  return result.json();
}