import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useShortLinkServices from 'src/services/useShortLink';
import { IUserData } from 'src/types/IUserData';
import { IRegisteredUserData } from 'src/types/IRegisteredUserData';
import { ICreateShortLink } from 'src/types/ICreateShortLink';
import { IShortLinkData, IShortUrlTableData } from 'src/types/IShortLinkData';
import { IGetShortLink, IOrder } from 'src/types/IGetShortLink';

interface IAlertMessage{
  text: string;
  alert: 'error' | 'info' | 'success'| 'warning';
}
interface AuthorizationState {
  signUpModal:boolean;
  signInModal:boolean;
  registeredUserData:IRegisteredUserData | null;
  alertStatus:boolean;
  alertMessage: IAlertMessage;
  shortLinkData: IShortLinkData;
  shortUrlTable : IShortUrlTableData[] | null;
  pagesCount: number;
  sortedUrlTableMarks: IOrder | null;
  tableLoading:boolean;
}

const initialState:AuthorizationState = {
  signUpModal: false,
  signInModal: false,
  registeredUserData: null,
  alertStatus: false,
  alertMessage: {
    text: '',
    alert: 'success',
  },
  shortLinkData: {
    target: '',
    short: '',
  },
  shortUrlTable: null,
  pagesCount: 0,
  sortedUrlTableMarks: null,
  tableLoading: false,
};

export const signIn = createAsyncThunk(
  'shortLink/signIn',
  async (data:IUserData) => {
    const { signInUser } = useShortLinkServices();
    const response = await signInUser(data);
    return response;
  },
);
export const signUp = createAsyncThunk(
  'shortLink/signUp',
  async (data:IUserData) => {
    const { signUpUser } = useShortLinkServices();
    const response = await signUpUser(data);
    return response;
  },
);
export const createShortLink = createAsyncThunk(
  'shortLink/createShortLink',
  async (data:ICreateShortLink) => {
    const { createShortUrl } = useShortLinkServices();
    const response = await createShortUrl(data.token, data.url);
    return response;
  },
);
export const getShortLinks = createAsyncThunk(
  'shortLink/getShortLinks',
  async (data:IGetShortLink) => {
    const { getShortUrls } = useShortLinkServices();
    const response = await getShortUrls(data.offset, data.limit, data.token, data.order);
    return response;
  },
);
export const getPagesCount = createAsyncThunk(
  'shortLink/getPagesCount',
  async (token:string) => {
    const { getShortUrls } = useShortLinkServices();
    const response = await getShortUrls(0, 0, token, null);
    return response;
  },
);
const ShortLinkSlice = createSlice({
  name: 'shortLink',
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.signUpModal = true;
      state.signInModal = false;
    },
    closeSignUpModal: (state) => {
      state.signUpModal = false;
    },
    openSignInModal: (state) => {
      state.signInModal = true;
      state.signUpModal = false;
    },
    closeSignInModal: (state) => {
      state.signInModal = false;
    },
    closeAlertModal: (state) => {
      state.alertStatus = false;
    },
    signOut: (state) => {
      state.registeredUserData = null;
      localStorage.removeItem('registeredUserData');
      state.shortLinkData = {
        target: '',
        short: '',
      };
    },
    getRegisteredUserData: (state, action) => {
      state.registeredUserData = action.payload;
    },
    changeSortedMark: (state, action) => {
      state.sortedUrlTableMarks = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.access_token) {
          state.registeredUserData = action.payload;
          localStorage.setItem('registeredUserData', JSON.stringify(action.payload));
        } else {
          state.alertStatus = true;
          state.alertMessage = { text: 'Введен неверный логин или пароль', alert: 'error' };
        }
      })
      .addCase(signIn.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'Введен неверный логин или пароль', alert: 'error' };
      })
      .addCase(signUp.fulfilled, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'Регистрация прошла успешно ', alert: 'success' };
      })
      .addCase(signUp.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'что-то пошло не так', alert: 'error' };
      })
      .addCase(createShortLink.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'что-то пошло не так', alert: 'error' };
      })
      .addCase(getShortLinks.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'что-то пошло не так обновите страницу', alert: 'error' };
      })
      .addCase(getShortLinks.pending, (state) => {
        state.tableLoading = true;
      })
      .addCase(getShortLinks.fulfilled, (state, action) => {
        state.shortUrlTable = action.payload;
        state.tableLoading = false;
      })
      .addCase(createShortLink.fulfilled, (state, action) => {
        state.shortLinkData = { target: action.payload.target, short: action.payload.short };
        const newRow = { target: action.payload.target, short: action.payload.short, counter: action.payload.counter };
        if (state.shortUrlTable) state.shortUrlTable = [newRow, ...state.shortUrlTable];
        else state.shortUrlTable = [newRow];
      })
      .addCase(getPagesCount.fulfilled, (state, action) => {
        state.pagesCount = Math.ceil(action.payload.length / 7);
      });
  },
});

const { actions, reducer } = ShortLinkSlice;

export default reducer;

export const {
  openSignUpModal,
  closeSignUpModal,
  openSignInModal,
  closeSignInModal,
  closeAlertModal,
  signOut,
  getRegisteredUserData,
  changeSortedMark,
} = actions;
