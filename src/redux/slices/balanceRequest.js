import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';

// Action for Login
export const balanceRequest = createAsyncThunk(
  'balanceRequest',
  async (requestData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        apiRoutes.balanceRequest,
        requestData,
        {headers: {'Content-Type': 'multipart/form-data'}},
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

export const balanceRequestClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
};

const balanceRequestSlice = createSlice({
  name: 'balanceRequestSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(balanceRequest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(balanceRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(balanceRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(balanceRequestClear, () => initialState);
  },
});

export default balanceRequestSlice.reducer;
