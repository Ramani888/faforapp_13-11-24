import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';

// Action for Login
export const getUserDetails = createAsyncThunk(
  'getUserDetails',
  async (requestData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        apiRoutes.getUserDetails,
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

export const getUserDetailsClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
};

const getUserDetailsSlice = createSlice({
  name: 'getUserDetailsSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(getUserDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(getUserDetailsClear, () => initialState);
  },
});

export default getUserDetailsSlice.reducer;
