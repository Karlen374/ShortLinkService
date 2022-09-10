import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { getPagesCount, getShortLinks } from 'src/store/slices/shortLinkSlice';
import ShortUrlRows from 'src/components/shortUrlTable/shortUrlRows';
import styles from './shortUrlTable.module.scss';
import TableHeader from './tableHeader';

const ShortUrlTable = () => {
  const {
    shortUrlTable, pagesCount, sortedUrlTableMarks, tableLoading,
  } = useAppSelector((store) => store.shortLink);
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const UserData = localStorage.getItem('registeredUserData');
    if (UserData) {
      const token = JSON.parse(UserData).access_token;
      dispatch(getPagesCount(token));
    }
  }, []);
  useEffect(() => {
    const UserData = localStorage.getItem('registeredUserData');
    if (UserData) {
      const token = JSON.parse(UserData).access_token;
      dispatch(getShortLinks({
        token, offset: 7 * page - 7, limit: 7, order: sortedUrlTableMarks,
      }));
    }
  }, [page, sortedUrlTableMarks]);
  const tableBodyContent = tableLoading
    ? (
      <TableBody>
        <TableRow>
          <TableCell align="center"><CircularProgress /></TableCell>
          <TableCell align="center"><CircularProgress /></TableCell>
          <TableCell align="center"><CircularProgress /></TableCell>
        </TableRow>
      </TableBody>
    ) : (
      <TableBody>
        {shortUrlTable?.map((row) => (
          <ShortUrlRows
            key={row.short}
            short={row.short}
            target={row.target}
            counter={row.counter}
          />
        ))}
      </TableBody>
    );
  return (
    <>
      <Pagination
        className={styles.pagination}
        count={pagesCount}
        page={page}
        onChange={(_, num) => setPage(num)}
        color="secondary"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }}>
          <TableHeader />
          {tableBodyContent}
        </Table>
      </TableContainer>
    </>
  );
};
export default ShortUrlTable;
