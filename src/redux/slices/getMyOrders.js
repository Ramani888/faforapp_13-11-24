import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';

// Action for Login
export const getMyOrders = createAsyncThunk(
  'getMyOrders',
  async (requestData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        apiRoutes.getMyOrderList,
        requestData,
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

export const getMyOrdersClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
};

const getMyOrdersSlice = createSlice({
  name: 'getMyOrdersSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(getMyOrders.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(getMyOrdersClear, () => initialState);
  },
});

export default getMyOrdersSlice.reducer;
