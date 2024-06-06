import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from 'api';
import toast from 'react-hot-toast';

// eslint-disable-next-line prettier/prettier

const initialVal = [
  {
    id: 1,
    name: 'John Doe',
    educational_background: 'B.Sc in Computer Science',
    job_exp: '3 Years',
    projects: 'Web Development, Mobile App Development',
    skills: 'JavaScript, React, Node.js'
  },
  {
    id: 2,
    name: 'Jane Smith',
    educational_background: 'B.A in Economics',
    job_exp: '4 Years',
    projects: 'Data Analysis, Market Research',
    skills: 'Python, R, SQL'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    educational_background: 'MBA in Marketing',
    job_exp: '6 Years',
    projects: 'Brand Management, Advertising Campaigns',
    skills: 'Marketing Strategy, Social Media Management'
  },
  // Add more objects here...
  {
    id: 4,
    name: 'Michael Brown',
    educational_background: 'Ph.D in Physics',
    job_exp: '8 Years',
    projects: 'Research Projects, Scientific Publications',
    skills: 'Quantum Mechanics, Computational Physics'
  },
  {
    id: 5,
    name: 'Emily Davis',
    educational_background: 'B.F.A in Fine Arts',
    job_exp: '2 Years',
    projects: 'Art Exhibitions, Freelance Illustration',
    skills: 'Drawing, Painting, Digital Art'
  },
  {
    id: 6,
    name: 'Robert Wilson',
    educational_background: 'M.Sc in Mathematics',
    job_exp: '5 Years',
    projects: 'Statistical Analysis, Data Visualization',
    skills: 'Statistics, Data Science, Machine Learning'
  },
  {
    id: 7,
    name: 'Olivia Martinez',
    educational_background: 'B.A in English Literature',
    job_exp: '4 Years',
    projects: 'Content Writing, Copyediting',
    skills: 'Writing, Editing, Proofreading'
  },
  {
    id: 8,
    name: 'David Rodriguez',
    educational_background: 'M.Eng in Civil Engineering',
    job_exp: '7 Years',
    projects: 'Infrastructure Development, Structural Analysis',
    skills: 'Civil Engineering, AutoCAD, Project Management'
  },
  {
    id: 9,
    name: 'Sophia Moore',
    educational_background: 'BBA in Finance',
    job_exp: '3 Years',
    projects: 'Financial Analysis, Investment Management',
    skills: 'Financial Modeling, Excel, Risk Assessment'
  },
  {
    id: 10,
    name: 'Daniel Taylor',
    educational_background: 'M.S in Environmental Science',
    job_exp: '6 Years',
    projects: 'Environmental Impact Assessment, Sustainability Planning',
    skills: 'Environmental Science, GIS, Renewable Energy'
  },
  {
    id: 11,
    name: 'Isabella Brown',
    educational_background: 'B.A in Psychology',
    job_exp: '4 Years',
    projects: 'Clinical Research, Counseling',
    skills: 'Psychological Assessment, Therapy Techniques'
  },
  {
    id: 12,
    name: 'Ethan White',
    educational_background: 'B.Eng in Mechanical Engineering',
    job_exp: '5 Years',
    projects: 'Product Design, Manufacturing Process Optimization',
    skills: 'Mechanical Engineering, CAD, Finite Element Analysis'
  }
];

const fetchTeacherDetails = createAsyncThunk('fetchTeacher', async (url) => {
  const response = await apiService.getData(url);

  if (response.status == !200) {
    toast.error('Erro occured in Teacher api call');
  }
  return response.data;
});

const teacherDetailsSlice = createSlice({
  name: 'teachers',
  initialState: [],
  extraReducers(builder) {
    builder.addCase(fetchTeacherDetails.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchTeacherDetails.rejected, (state, action) => {
      console.log('Teacher store did not get proper response from API, got and error');
      return state;
    });
  }
});

export { fetchTeacherDetails };

export default teacherDetailsSlice.reducer;
