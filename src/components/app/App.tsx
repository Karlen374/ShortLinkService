import React, { useEffect } from 'react';
import AppHeader from 'src/components/appHeader/appHeader';
import { getRegisteredUserData } from 'src/store/slices/shortLinkSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import AppAlert from './appAlert';
import ShortUrl from '../shortUrl/shortUrl';

const App = () => {
  const dispatch = useAppDispatch();
  const { registeredUserData } = useAppSelector((store) => store.shortLink);
  useEffect(() => {
    const UserData = localStorage.getItem('registeredUserData');
    if (UserData) dispatch(getRegisteredUserData(JSON.parse(UserData)));
  }, []);
  return (
    <div className="App">
      <AppAlert />
      <AppHeader />
      {registeredUserData && (<ShortUrl />)}
    </div>
  );
};
export default App;
