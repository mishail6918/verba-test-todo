export type TodoStatus = 'TODO' | 'DONE' | 'DELETED';

export type Todo = {
  id: number;
  name: string;
  status: TodoStatus;
};
