import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';
import {setStorageValue} from '../../utils/storageManager';
import storageKeys from '../../constants/storageKeys';
// import axiosInstanceForLogin from '../../utils/axiosInstanceForLogin';

// Action for Login
export const userLogin = createAsyncThunk(
  'userLogin',
  async (requestData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(apiRoutes.login, requestData);
      const responseData = await response.data;
      if (responseData?.response == 200) {
        global.userData = responseData?.info;
        await setStorageValue('user_id', responseData?.info?.self_id); // remove this later
        await setStorageValue(storageKeys.userData, responseData?.info);
        return responseData;
      } else {
        return rejectWithValue(responseData?.msg);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.msg);
    }
  },
);

export const userLoginClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
  isLoggedIn: false,
};

const userLoginSlice = createSlice({
  name: 'userLoginSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(userLogin.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(userLoginClear, () => initialState);
  },
});

export default userLoginSlice.reducer;
