import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { closeSignInModal, openSignUpModal, signIn } from 'src/store/slices/shortLinkSlice';
import { useAppDispatch } from 'src/hooks/hooks';
import styles from './signInForm.module.scss';

const SignInForm = () => {
type FormData = {
  username: string;
  password: string;
}
const {
  register,
  formState: { errors },
  handleSubmit,
  reset,
} = useForm<FormData>({ mode: 'onBlur' });
const dispatch = useAppDispatch();
const signInUser = (formState:FormData) => {
  dispatch(signIn(formState));
  dispatch(closeSignInModal());
  reset();
};
return (
  <form className={styles.SignIn_Form} onSubmit={handleSubmit(signInUser)}>
    <Grid container spacing={2}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextField
          id="outlined-name"
          label="username"
          type="username"
          {...register('username', {
            required: 'This field is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'use characters a-Z',
            },
          })}
        />
        {errors.username?.message && (
          <div className={styles.SignIn_Form__ErrorMessage}>{errors.username?.message}</div>
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
          <div className={styles.SignIn_Form__ErrorMessage}>{errors.password?.message}</div>
        )}
      </Grid>
      <div className={styles.SignIn_Form__Buttons}>
        <Button type="submit" variant="contained" color="success">
          Войти
        </Button>
        <Button variant="text" color="success" onClick={() => dispatch(openSignUpModal())}>
          Регистрация
        </Button>
      </div>
    </Grid>
  </form>
);
};
export default SignInForm;
