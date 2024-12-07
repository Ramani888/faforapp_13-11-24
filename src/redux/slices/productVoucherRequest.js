import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';

// Action for Login
export const productVoucherRequest = createAsyncThunk(
  'productVoucherRequest',
  async (requestData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        apiRoutes.productVoucherRequest,
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

export const productVoucherRequestClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
};

const productVoucherRequestSlice = createSlice({
  name: 'productVoucherRequestSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(productVoucherRequest.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(productVoucherRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(productVoucherRequest.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(productVoucherRequestClear, () => initialState);
  },
});

export default productVoucherRequestSlice.reducer;
