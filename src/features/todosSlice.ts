import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoStatus } from '../types/Todo';

interface State {
  todos: Todo[];
}

const getTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const initialState: State = {
  todos: getTodos(),
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: state.todos.length ? state.todos.length + 1 : 1,
        name: action.payload,
        status: 'TODO' as TodoStatus,
      };
      state.todos.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    updateTodo: (state, action: PayloadAction<{ id: number; status: TodoStatus }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.status = action.payload.status;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      } else {
        throw new Error('Todo not found');
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    deleteAll: (state) => {
      state.todos = state.todos.map((todo) => ({ ...todo, status: 'DELETED' }));
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, deleteAll } = todosSlice.actions;
export default todosSlice.reducer;
