import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { closeAlertModal } from 'src/store/slices/shortLinkSlice';

const AppAlert = () => {
  const dispatch = useAppDispatch();
  const { alertStatus, alertMessage } = useAppSelector((store) => store.shortLink);
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={alertStatus}>
        <Alert
          severity={alertMessage.alert}
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(closeAlertModal());
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )}
        >
          {alertMessage.text}
        </Alert>
      </Collapse>
    </Box>
  );
};
export default AppAlert;
