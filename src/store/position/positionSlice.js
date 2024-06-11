import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const fetchPosition = createAsyncThunk('fetchPosition', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const positionSlice = createSlice({
  name: 'position',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPosition.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchPosition.rejected, (state, action) => {
      console.log('Position Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchPosition };
export default positionSlice.reducer;
