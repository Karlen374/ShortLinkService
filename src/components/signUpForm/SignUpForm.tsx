import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/hooks/hooks';
import { closeSignUpModal, openSignInModal, signUp } from 'src/store/slices/shortLinkSlice';
import styles from './SignUpForm.module.scss';

type FormData = {
  username:string;
  password:string;
};

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({ mode: 'onBlur' });
  const dispatch = useAppDispatch();
  const signUpUser = (formState:FormData) => {
    dispatch(signUp(formState));
    dispatch(closeSignUpModal());
    reset();
  };

  return (
    <form className={styles.SignUp_Form} onSubmit={handleSubmit(signUpUser)}>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label="username"
            type="text"
            {...register('username', {
              required: 'This field is required',
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'use characters a-Z',
              },
            })}
          />
          {errors.username?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>{errors.username?.message}</div>
          )}
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 3,
                message: 'Password is too short',
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: 'use characters a-Z',
              },
            })}
          />
          {errors.password?.message && (
            <div className={styles.SignUp_Form__ErrorMessage}>{errors.password?.message}</div>
          )}
        </Grid>
        <div className={styles.SignUp_Form__Buttons}>
          <Button variant="contained" type="submit" color="success">
            Создать
          </Button>
          <Button variant="text" onClick={() => dispatch(openSignInModal())} color="success">
            Уже есть Аккаунт ?
          </Button>
        </div>
      </Grid>
    </form>
  );
};
export default SignUpForm;
