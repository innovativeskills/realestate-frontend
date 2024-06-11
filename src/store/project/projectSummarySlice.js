import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [
  {
    project: 1,
    icon: 'https://example.com/icon1.png',
    number: '001',
    title: 'Project Alpha'
  },
  {
    project: 2,
    icon: 'https://example.com/icon2.png',
    number: '002',
    title: 'Project Beta'
  },
  {
    project: 3,
    icon: 'https://example.com/icon3.png',
    number: '003',
    title: 'Project Gamma'
  },
  {
    project: 4,
    icon: 'https://example.com/icon4.png',
    number: '004',
    title: 'Project Delta'
  },
  {
    project: 5,
    icon: 'https://example.com/icon5.png',
    number: '005',
    title: 'Project Epsilon'
  },
  {
    project: 6,
    icon: 'https://example.com/icon6.png',
    number: '006',
    title: 'Project Zeta'
  }
];


const fetchProjectSummary = createAsyncThunk('fetchProjectSummary', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const projectSummarySlice = createSlice({
  name: 'projectSummary',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProjectSummary.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchProjectSummary.rejected, (state, action) => {
      console.log('Project Summary Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchProjectSummary };
export default projectSummarySlice.reducer;
