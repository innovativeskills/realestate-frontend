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
import { useEffect } from 'react';;
import { fetchContactInfo } from 'store/company/contactInfoSlice';
import { fetchCompanySummary } from 'store/company/companySummary';
import { fetchBannerDetails } from 'store/banner/banner';
import { fetchMembershipDetails } from 'store/membership/membershipDetailsSlice';

// ==============================|| APP ||============================== //

const App = () => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    dispatch(fetchContactInfo('https://realestateback.innovativeskillsbd.com/api/contactinfo/'));
    dispatch(fetchCompanySummary('https://realestateback.innovativeskillsbd.com/api/companysummary/'));
    dispatch(fetchBannerDetails('https://realestateback.innovativeskillsbd.com/api/banner/'));
    dispatch(fetchMembershipDetails('https://realestateback.innovativeskillsbd.com/api/membership/'));
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
