import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';

// Action for Login
export const unilevelWithdrawRequest = createAsyncThunk(
  'unilevelWithdrawRequest',
  async (requestData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        apiRoutes.unilevelWithdrawRequest,
        requestData,
      );
      const responseData = await response.data;
      if (responseData?.response == 200) {
        return responseData;
      } else {
        return rejectWithValue(responseData?.msg);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.msg);
    }
  },
);

export const unilevelWithdrawRequestClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
};

const unilevelWithdrawRequestSlice = createSlice({
  name: 'unilevelWithdrawRequestSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(unilevelWithdrawRequest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(unilevelWithdrawRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(unilevelWithdrawRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(unilevelWithdrawRequestClear, () => initialState);
  },
});

export default unilevelWithdrawRequestSlice.reducer;
