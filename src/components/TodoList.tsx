import { FC } from 'react';
import { TodoStatus } from '../types/Todo';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../features/todosSlice';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

interface ITodoList {
  status: TodoStatus | 'ALL';
}

export const TodoList: FC<ITodoList> = ({ status }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const filteredTodos =
    status === 'ALL'
      ? todos.filter((todo) => todo.status !== 'DELETED')
      : todos.filter((todo) => todo.status === status);

  const updateHandle = (id: number, status: TodoStatus) => {
    dispatch(updateTodo({ id, status }));
  };
  return (
    <>
      <Stack gap={2}>
        {filteredTodos.map((todo) => (
          <Card
            key={todo.id}
            sx={{
              display: 'flex',
              background: 'transparent',
              border: '1px solid #fff',
              borderRadius: '0px 10px 0px 10px',
              boxShadow: 'none',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 30px',
            }}
          >
            <Typography component="h2">{todo.name}</Typography>
            <Box>
              <Button onClick={() => updateHandle(todo.id, 'DONE')} sx={{ minWidth: '50px' }}>
                <CheckIcon sx={{ fill: '#323232' }} />
              </Button>
              <Button onClick={() => updateHandle(todo.id, 'DELETED')} sx={{ minWidth: '50px' }}>
                <DeleteIcon sx={{ fill: '#323232' }} />
              </Button>
            </Box>
          </Card>
        ))}
      </Stack>
    </>
  );
};
