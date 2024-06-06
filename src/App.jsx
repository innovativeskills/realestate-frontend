import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { Toaster } from 'react-hot-toast';

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { fetchCategory } from 'store/category/categoryReducer';
import { fetchSubCategories } from 'store/sub-category/SubCategoryReducer';
import { fetchTeacherDetails } from 'store/teacher/teacherReducer';
import { fetchCourseDetails } from 'store/course/courseDetailsReducer';
import { fetchContactInfo } from 'store/company/contactInfoSlice';
import { fetchCompanySummary } from 'store/company/companySummary';

// ==============================|| APP ||============================== //

const App = () => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    dispatch(fetchContactInfo('https://realestateback.innovativeskillsbd.com/api/contactinfo/'));
    dispatch(fetchCompanySummary('https://realestateback.innovativeskillsbd.com/api/companysummary/'));
    // dispatch(fetchCategory('https://website.innovativeskillsbd.com/mainCategories/categories/')); //category api
    // dispatch(fetchSubCategories('https://website.innovativeskillsbd.com/subCategories/subcategories/')); //subcategory api
    // dispatch(fetchTeacherDetails('https://website.innovativeskillsbd.com/teacher/teachers/')); //teacher api
    // dispatch(fetchCourseDetails('https://website.innovativeskillsbd.com/course/courses/')); //course api
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Toaster position="top-right" reverseOrder={false} />
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
