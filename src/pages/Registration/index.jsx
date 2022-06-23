import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Navigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';

export const Registration = () => {

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if(!data.payload){
      alert('Не удалось авторизоваться') 
    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token); 
    }
    // эта тема вернет промис, и там есть поле пейлод, в котором токен, тут надо запомнить, или ваще чекать все что возвращается
  };

  if(isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField  
        className={styles.field} 
        label="Полное имя" 
        fullWidth 
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', { required: 'Укажите имя' })}/>
        <TextField  
        className={styles.field} 
        label="E-mail" 
        fullWidth 
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', { required: 'Укажите почту' })}/>
        <TextField  
        className={styles.field} 
        label="Password" 
        fullWidth 
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password', { required: 'Укажите пароль' })}/>
        <Button disabled={!isValid} size="large" variant="contained" fullWidth type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
