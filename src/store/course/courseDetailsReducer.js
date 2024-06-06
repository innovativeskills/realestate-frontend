import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiService from 'api';
import toast from 'react-hot-toast';

const initialVal = [
  {
    id: 1,
    title: 'Web Development',
    banner_image_or_video: 'https://www.example.com/web-development',
    overview: 'Learn the fundamentals of web development.',
    course_details: 'HTML, CSS, JavaScript, React, Node.js',
    syllabus: 'HTML Basics, CSS Styling, JavaScript Fundamentals, React Components, Node.js Basics',
    free_video: 'https://www.youtube.com/watch?v=web-development',
    actual_price: '1500.00',
    discount_price: '1200.00',
    free_or_paid: 'Paid',
    what_you_will_learn: 'Build responsive websites and web applications.',
    company_work_with_technology: 'Web development agencies, Tech startups',
    course_slug: 'web-development',
    tag: 'Web Development',
    meta_tag: 'HTML, CSS, JavaScript, React, Node.js',
    live_or_prerecorded: 'Prerecorded',
    subcategory: 2,
    teacher: 3
  },
  {
    id: 2,
    title: 'Data Science',
    banner_image_or_video: 'https://www.example.com/data-science',
    overview: 'Explore the field of data science and its applications.',
    course_details: 'Statistics, Machine Learning, Data Visualization, Python, R',
    syllabus: 'Data Analysis Techniques, Machine Learning Algorithms, Data Visualization Tools',
    free_video: 'https://www.youtube.com/watch?v=data-science',
    actual_price: '1800.00',
    discount_price: '1500.00',
    free_or_paid: 'Paid',
    what_you_will_learn: 'Analyze data, build predictive models, and visualize insights.',
    company_work_with_technology: 'Tech companies, Research organizations',
    course_slug: 'data-science',
    tag: 'Data Science',
    meta_tag: 'Statistics, Machine Learning, Data Visualization, Python, R',
    live_or_prerecorded: 'Live',
    subcategory: 1,
    teacher: 2
  },
  {
    id: 3,
    title: 'Mobile App Development',
    banner_image_or_video: 'https://www.example.com/mobile-app-development',
    overview: 'Learn to build mobile applications for iOS and Android platforms.',
    course_details: 'React Native, Swift, Kotlin, Firebase',
    syllabus: 'React Native Fundamentals, iOS App Development, Android App Development',
    free_video: 'https://www.youtube.com/watch?v=mobile-app-development',
    actual_price: '2000.00',
    discount_price: '1800.00',
    free_or_paid: 'Paid',
    what_you_will_learn: 'Develop cross-platform mobile apps using modern technologies.',
    company_work_with_technology: 'App development agencies, Tech startups',
    course_slug: 'mobile-app-development',
    tag: 'Mobile App Development',
    meta_tag: 'React Native, Swift, Kotlin, Firebase',
    live_or_prerecorded: 'Prerecorded',
    subcategory: 2,
    teacher: 4
  },
  {
    id: 4,
    title: 'Blockchain Technology',
    banner_image_or_video: 'https://www.example.com/blockchain-technology',
    overview: 'Explore the decentralized world of blockchain.',
    course_details: 'Blockchain Fundamentals, Smart Contracts, Cryptocurrencies',
    syllabus: 'Introduction to Blockchain, Smart Contract Development, Cryptocurrency Trading',
    free_video: 'https://www.youtube.com/watch?v=blockchain-technology',
    actual_price: '2200.00',
    discount_price: '2000.00',
    free_or_paid: 'Paid',
    what_you_will_learn: 'Understand the principles of blockchain and its real-world applications.',
    company_work_with_technology: 'Fintech companies, Blockchain startups',
    course_slug: 'blockchain-technology',
    tag: 'Blockchain Technology',
    meta_tag: 'Blockchain Fundamentals, Smart Contracts, Cryptocurrencies',
    live_or_prerecorded: 'Live',
    subcategory: 3,
    teacher: 5
  },
  {
    id: 5,
    title: 'AI',
    banner_image_or_video: 'https://youtu.be/libNDVYu7RY',
    overview: '1243',
    course_details: 'ghfhgfhgfhgf',
    actual_price: '1200.00',
    discount_price: '1100.00',
    discount_percentage: 20,
    free_or_paid: 'Paid',
    what_you_will_learn: 'iui7tuytuyty',
    company_work_with_technology: 'jhfhghgj',
    course_slug: '2',
    tag: 'Javascript',
    meta_tag: 'Javascript',
    live_or_prerecorded: 'Live',
    course_evaluation: '1',
    subcategory: 1,
    teacher: 1
  }
];

const fetchCourseDetails = createAsyncThunk('fetchCourseDetails', async (url) => {
  const response = await apiService.getData(url);
  if (response.status == !200) {
    toast.error('Erro occured in Course details api call');
  }
  return response.data;
});

const courseDetailsSlice = createSlice({
  name: 'courseDetails',
  initialState: [],
  extraReducers(builder) {
    builder.addCase(fetchCourseDetails.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchCourseDetails.rejected, (state, action) => {
      console.log('Course state did not get proper response from API, got an error');
      return state;
    });
  }
});

export { fetchCourseDetails };
export default courseDetailsSlice.reducer;
