import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { openSignUpModal, signOut } from 'src/store/slices/shortLinkSlice';
import styles from './appHeader.module.scss';
import AppModals from './appModals';

const AppHeader = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.shortLink);
  const content = registeredUserData
    ? (
      <div>
        <Chip
          className={styles.AppHeader_Chip}
          sx={{ color: grey[50] }}
          icon={<SettingsIcon />}
          variant="outlined"
          label={registeredUserData.username}
        />
        <Button
          variant="text"
          className={styles.AppHeader_Button}
          onClick={() => dispatch(signOut())}
          sx={{ color: grey[50] }}
        >
          <LogoutIcon />
        </Button>
      </div>
    )
    : (
      <Button
        onClick={() => dispatch(openSignUpModal())}
        variant="contained"
        color="success"
      >
        Регистрация
      </Button>
    );
  return (
    <header className={styles.header}>
      <h2 className={styles.header_name}>Short Link Service</h2>
      {content}
      <AppModals />
    </header>
  );
};
export default AppHeader;
