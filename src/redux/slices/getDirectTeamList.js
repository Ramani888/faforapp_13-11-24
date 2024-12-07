import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import apiRoutes from '../../constants/apiRoutes';

// Action for Login
export const getDirectTeamList = createAsyncThunk(
  'getDirectTeamList',
  async (requestData, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(
        apiRoutes.getDirectTeamList,
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

export const getDirectTeamListClear = createAction('CLEAR_ALL');

// Intial State
const initialState = {
  isLoading: null,
  data: null,
  error: null,
};

const getDirectTeamListSlice = createSlice({
  name: 'getDirectTeamListSlice',
  initialState,
  extraReducers: builder => {
    builder.addCase(getDirectTeamList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getDirectTeamList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(getDirectTeamList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message || action.payload;
    });
    builder.addCase(getDirectTeamListClear, () => initialState);
  },
});

export default getDirectTeamListSlice.reducer;
