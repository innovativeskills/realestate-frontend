import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';

const initialData = [
  {
    id: 1,
    project_name: 'Sunrise Apartments',
    project_code: 'SUN123',
    description:
      'Sunrise Apartments is a luxurious residential project offering modern amenities and serene living spaces. Located in the heart of the city, it features 2, 3, and 4 BHK apartments with stunning views and state-of-the-art facilities.',
    brochure_pdf: 'https://example.com/brochures/sunrise_apartments.pdf',
    agent: 2
  },
  {
    id: 2,
    project_name: 'Green Valley Villas',
    project_code: 'GVV456',
    description:
      'Green Valley Villas offers a peaceful retreat with its eco-friendly design and lush green surroundings. The project includes spacious villas with private gardens, modern amenities, and excellent connectivity to the city.',
    brochure_pdf: 'https://example.com/brochures/green_valley_villas.pdf',
    agent: 4
  }
];

const fetchProjectInfo = createAsyncThunk('fetchProjectInfo', async (url) => {
  const response = await apiService.getData(url);
  return response.data;
});

const projectInfoSlice = createSlice({
  name: 'projectInfo',
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProjectInfo.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchProjectInfo.rejected, (state, action) => {
      console.log('Project Info Store did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchProjectInfo };
export default projectInfoSlice.reducer;
