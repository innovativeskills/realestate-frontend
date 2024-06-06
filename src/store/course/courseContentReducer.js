import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from 'api';
import toast from 'react-hot-toast';

const initialValue = [
  {
    course: '1',
    title: 'Basics of Programming',
    class_number: 'CS101',
    content_video_link: 'https://example.com/videos/intro-to-programming'
  },
  {
    course: '12',
    title: 'Calculus and Linear Algebra',
    class_number: 'MATH201',
    content_video_link: 'https://example.com/videos/advanced-math'
  }
];

const fetchCourseContent = createAsyncThunk('fetchCourseContent', async (url) => {
  const response = await apiService.getData(url);
  if (response.status == !200) {
    toast.error('Erro occured in Course details api call');
  }
  return response.data;
});

const coursContentSlice = createSlice({
  name: 'courseContent',
  initialState: initialValue,
  reducers: {
    addToCourseContentList(state, action) {
      state.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchCourseContent.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchCourseContent.rejected, (state, action) => {
      console.log('Course content state did not get proper response from API, got an error');
      return state;
    });
  }
});

export const { addToCourseContentList } = coursContentSlice.actions;
export { fetchCourseContent };
export default coursContentSlice.reducer;
