import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import storageKeys from '../../constants/storageKeys';
import {clearStorageByMultipleKeys} from '../../utils/storageManager';

// Action for Logout
export const logout = createAsyncThunk(
  'logout',
  async (_, {rejectWithValue}) => {
    try {
      await clearStorageByMultipleKeys([
        storageKeys.accessToken,
        storageKeys.userData,
        'user_id',
      ]);
      global.userData = undefined;
      return 'Success';
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.msg);
    }
  },
);

export const logoutClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
  isLoggedOut: false,
};

const logoutSlice = createSlice({
  name: 'logoutSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(logout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedOut = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(logoutClear, () => initialState);
  },
});

export default logoutSlice.reducer;
