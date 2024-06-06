import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [
  { title: 'Tech Partners', amount: 16, icon: '<i class="fa fa-google"></i>' },
];

const fetchCompanySummary = createAsyncThunk('fetchCompanySummary', async (url) => {
  console.log('called summary async')
  const response = await apiService.getData(url);
  return response.data;
});

const companySummarySlice = createSlice({
  name: 'companySummary',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCompanySummary.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchCompanySummary.rejected, (state, action) => {
      console.log('Banner details Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchCompanySummary };
export default companySummarySlice.reducer;
