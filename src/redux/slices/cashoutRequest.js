import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';

// Action for Login
export const cashoutRequest = createAsyncThunk(
  'cashoutRequest',
  async (requestData, {rejectWithValue}) => {
    console.log('requestData',requestData)
    try {
      const response = await axiosInstance.post(
        apiRoutes.cashoutRequest,
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

export const cashoutRequestClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
};

const cashoutRequestSlice = createSlice({
  name: 'cashoutRequestSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(cashoutRequest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(cashoutRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(cashoutRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(cashoutRequestClear, () => initialState);
  },
});

export default cashoutRequestSlice.reducer;
