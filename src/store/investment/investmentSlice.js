import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [{ id: 1, title: 'Default Investment', description: 'Good to take', image: 'www.example.com/images/8' }];

const fetchInvestmentDetails = createAsyncThunk('fetchInvestmentDetails', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const investmentSlice = createSlice({
  name: 'investmentDetails',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchInvestmentDetails.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchInvestmentDetails.rejected, (state, action) => {
      console.log('Investment details Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchInvestmentDetails };
export default investmentSlice.reducer;
