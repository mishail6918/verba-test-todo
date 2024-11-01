import { Button, Input, Stack, Box, Tab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import TabPanel from '@mui/lab/TabPanel';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { TodoStatus } from '../types/Todo';
import { useForm } from 'react-hook-form';
import { addTodo, deleteAll } from '../features/todosSlice';
import { TodoList } from '../components/TodoList';
import { TabContext, TabList } from '@mui/lab';
import { RootState } from '../store/store';
import { logout } from '../features/authSlice';

const tabs: { label: string; value: TodoStatus | 'ALL' }[] = [
  {
    label: 'Все дела',
    value: 'ALL',
  },
  {
    label: 'Текущие дела',
    value: 'TODO',
  },
  {
    label: 'Выполненные дела',
    value: 'DONE',
  },
  {
    label: 'Корзина',
    value: 'DELETED',
  },
];

export const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const form = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const addHandle = () => {
    const name = form.getValues('name');
    if (name.length > 3) {
      dispatch(addTodo(name));
      form.reset();
    }
  };

  const removeAllHandle = () => {
    dispatch(deleteAll());
  };
  return (
    <>
      <Box sx={{ marginBottom: 1, display: 'flex', justifyContent: 'end' }}>
        <Button onClick={() => dispatch(logout())}>Выйти</Button>
      </Box>
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          padding: '20px',
          background: '#9b9b9b',
          borderRadius: '10px',
        }}
        width={'100%'}
      >
        <Button startIcon={<AddIcon />} onClick={addHandle} color="primary" variant="contained">
          Добавить
        </Button>
        <Input
          placeholder="Пополните список..."
          {...form.register('name')}
          sx={{ color: 'inherit' }}
        ></Input>
        <Button
          endIcon={<ClearAllIcon />}
          variant="contained"
          color="error"
          onClick={removeAllHandle}
        >
          Очистить
        </Button>
      </Stack>
      <Box sx={{ background: '#9b9b9b', borderRadius: '10px', padding: '20px' }}>
        <TabContext value={activeTab}>
          <TabList onChange={handleChange} textColor="inherit">
            {tabs.map((tab) => (
              <Tab
                label={
                  <Typography>
                    {tab.label} (
                    {tab.value === 'ALL'
                      ? todos.filter((todo) => todo.status !== 'DELETED').length
                      : todos.filter((todo) => todo.status === tab.value).length}
                    )
                  </Typography>
                }
                value={tab.value}
                key={tab.value}
              />
            ))}
          </TabList>
          <Stack>
            {tabs.map((tab) => (
              <TabPanel value={tab.value} key={tab.value}>
                <TodoList status={tab.value} />
              </TabPanel>
            ))}
          </Stack>
        </TabContext>
      </Box>
    </>
  );
};
