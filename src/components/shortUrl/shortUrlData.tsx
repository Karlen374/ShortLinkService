import { useAppSelector } from 'src/hooks/hooks';
import { useClipboard } from 'use-clipboard-copy';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import styles from './shortUrl.module.scss';

const ShortUrlData = () => {
  const [open, setOpen] = useState(false);
  const clipboard = useClipboard({
    onSuccess() {
      setOpen(true);
    },
  });
  const { shortLinkData } = useAppSelector((store) => store.shortLink);

  const handleTooltipClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.short}>
      <h3>Короткая Ссылка :</h3>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="Скопировано !"
          sx={{ color: 'red', backgroundColor: 'red', fontSize: 40 }}
        >
          <button className={styles.short_button} type="button" onClick={clipboard.copy}>
            <input
              className={styles.short_input}
              disabled
              defaultValue={`http://79.143.31.216/s/${shortLinkData.short}`}
              ref={clipboard.target}
            />
          </button>
        </Tooltip>
      </ClickAwayListener>
    </div>
  );
};
export default ShortUrlData;
