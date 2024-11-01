import { Box, Button, FormControl, FormLabel, Input, Stack, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';

interface ILogin {
  login: string;
  password: string;
}

export const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const form = useForm<ILogin>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    dispatch(login(data));
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return (
    <>
      <Box>
        <Typography component="h1" variant="h3" mb={2}>
          Войти
        </Typography>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack sx={{ background: '#fff', padding: 3, borderRadius: 2, gap: 1 }}>
            <FormControl>
              <FormLabel>Логин:</FormLabel>
              <Input {...form.register('login')} type="text" placeholder="admin" />
            </FormControl>
            <FormControl>
              <FormLabel>Пароль:</FormLabel>
              <Input {...form.register('password')} type="password" placeholder="admin" />
            </FormControl>
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Войти
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};
