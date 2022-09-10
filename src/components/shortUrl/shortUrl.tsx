import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { createShortLink } from 'src/store/slices/shortLinkSlice';
import ShortUrlTable from 'src/components/shortUrlTable/shortUrlTable';
import styles from './shortUrl.module.scss';
import ShortUrlData from './shortUrlData';

const ShortUrl = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData, shortLinkData } = useAppSelector((store) => store.shortLink);
  const [value, setValue] = useState<string>('');
  const getShort = () => {
    if (value && registeredUserData) {
      dispatch(createShortLink({ token: registeredUserData?.access_token, url: value }));
    }
    setValue('');
  };
  const onChangeInputValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.link}>
      <input
        className={styles.link_input}
        onChange={onChangeInputValue}
        type="text"
        placeholder="Ссылка"
        value={value}
      />
      <div>
        <Button onClick={getShort} variant="outlined">Получить</Button>
      </div>
      {shortLinkData.short && (<ShortUrlData />)}
      <ShortUrlTable />
    </div>
  );
};
export default ShortUrl;
