import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'src/hooks/hooks';
import { changeSortedMark } from 'src/store/slices/shortLinkSlice';

const TableHeader = () => {
  const dispatch = useAppDispatch();
  const onSortAscendingCounter = () => {
    dispatch(changeSortedMark('asc_counter'));
  };
  const onSortDescendingCounter = () => {
    dispatch(changeSortedMark('desc_counter'));
  };
  const onSortedAscendingShort = () => {
    dispatch(changeSortedMark('asc_short'));
  };
  const onSortedDescendingShort = () => {
    dispatch(changeSortedMark('desc_short'));
  };
  const onSortedAscendingUrl = () => {
    dispatch(changeSortedMark('asc_target'));
  };
  const onSortedDescendingUrl = () => {
    dispatch(changeSortedMark('desc_target'));
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">
          Ссылка
          <IconButton onClick={onSortedAscendingUrl} color="secondary" aria-label="sorting">
            <NorthIcon />
          </IconButton>
          <IconButton onClick={onSortedDescendingUrl} color="secondary" aria-label="sorting">
            <SouthIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          Короткая ссылка
          <IconButton onClick={onSortedAscendingShort} color="secondary" aria-label="sorting">
            <NorthIcon />
          </IconButton>
          <IconButton onClick={onSortedDescendingShort} color="secondary" aria-label="sorting">
            <SouthIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          Количество переходов
          <IconButton onClick={onSortAscendingCounter} color="secondary" aria-label="sorting">
            <NorthIcon />
          </IconButton>
          <IconButton onClick={onSortDescendingCounter} color="secondary" aria-label="sorting">
            <SouthIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
export default TableHeader;
