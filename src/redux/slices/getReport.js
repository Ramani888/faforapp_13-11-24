import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';

// Action for Login
export const getReport = createAsyncThunk(
  'getReport',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        payload?.reportType,
        payload?.data,
      );
      const responseData = await response.data;
      if (responseData?.response == 200) {
        return responseData?.info;
      } else {
        return rejectWithValue(responseData?.msg);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.msg);
    }
  },
);

export const getReportClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
};

const getReportSlice = createSlice({
  name: 'getReportSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(getReport.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getReport.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(getReport.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(getReportClear, () => initialState);
  },
});

export default getReportSlice.reducer;
