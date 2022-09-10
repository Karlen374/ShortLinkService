import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IShortUrlTableData } from 'src/types/IShortLinkData';
import { useClipboard } from 'use-clipboard-copy';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import styles from './shortUrlTable.module.scss';

const ShortUrlTable = ({ short, target, counter }:IShortUrlTableData) => {
  const [open, setOpen] = useState(false);
  const clipboard = useClipboard({
    onSuccess() {
      setOpen(true);
    },
  });
  const handleTooltipClose = () => {
    setOpen(false);
  };
  return (
    <TableRow>
      <TableCell sx={{ maxWidth: 150 }} align="center">{target}</TableCell>
      <TableCell align="center">
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
          >
            <button className={styles.short_button} type="button" onClick={clipboard.copy}>
              <input
                className={styles.short_input}
                disabled
                defaultValue={`http://79.143.31.216/s/${short}`}
                ref={clipboard.target}
              />
            </button>
          </Tooltip>
        </ClickAwayListener>
      </TableCell>
      <TableCell align="center">{counter}</TableCell>
    </TableRow>
  );
};
export default ShortUrlTable;
