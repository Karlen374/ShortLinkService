import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import shortLink from 'src/store/slices/shortLinkSlice';

export const store = configureStore({
  reducer: {
    shortLink,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
