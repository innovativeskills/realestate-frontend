import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Teacher from 'views/admin/teachers/Teacher';
import CourseDetails from 'views/courses/CourseDetails';
import AuthGuard from 'components/shared/Authentication/AuthGuard';
import CourseContent from 'views/courses/course-content/CourseContent';
import Category from 'views/admin/categories/Category';
import SubCategory from 'views/admin/categories/SubCategory';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/admin',
  element: <MainLayout />,
  children: [
    {
      path: '/admin',
      element: <DashboardDefault />
    },
    {
      path: 'admin/dashboard',
      children: [
        {
          path: 'default',
          element: (
            <AuthGuard>
              <DashboardDefault />
            </AuthGuard>
          )
        }
      ]
    }
    // {
    //   path: 'admin/categories',
    //   children: [
    //     {
    //       path: 'category',
    //       element: (
    //         <AuthGuard>
    //           <Category />
    //         </AuthGuard>
    //       )
    //     },
    //     {
    //       path: 'sub-category',
    //       element: (
    //         <AuthGuard>
    //           <SubCategory />
    //         </AuthGuard>
    //       )
    //     }
    //   ]
    // },
    // {
    //   path: 'admin/teachers',
    //   children: [
    //     {
    //       path: 'teacher',
    //       element: (
    //         <AuthGuard>
    //           <Teacher />
    //         </AuthGuard>
    //       )
    //     }
    //   ]
    // },
    // {
    //   path: 'admin/courses',
    //   children: [
    //     {
    //       path: 'course-details',
    //       element: (
    //         <AuthGuard>
    //           <CourseDetails />
    //         </AuthGuard>
    //       )
    //     },
    //     {
    //       path: 'course-content',
    //       element: (
    //         <AuthGuard>
    //           <CourseContent />
    //         </AuthGuard>
    //       )
    //     }
    //   ]
    // },

    // {
    //   path: 'admin/utils',
    //   children: [
    //     {
    //       path: 'util-typography',
    //       element: (
    //         <AuthGuard>
    //           <UtilsTypography />
    //         </AuthGuard>
    //       )
    //     }
    //   ]
    // },
    // {
    //   path: 'admin/utils',
    //   children: [
    //     {
    //       path: 'util-color',
    //       element: (
    //         <AuthGuard>
    //           <UtilsColor />
    //         </AuthGuard>
    //       )
    //     }
    //   ]
    // },
    // {
    //   path: 'admin/utils',
    //   children: [
    //     {
    //       path: 'util-shadow',
    //       element: (
    //         <AuthGuard>
    //           <UtilsShadow />
    //         </AuthGuard>
    //       )
    //     }
    //   ]
    // },
    // // {
    // //   path: 'icons',
    // //   children: [
    // //     {
    // //       path: 'tabler-icons',
    // //       element: <UtilsTablerIcons />
    // //     }
    // //   ]
    // // },
    // // {
    // //   path: 'icons',
    // //   children: [
    // //     {
    // //       path: 'material-icons',
    // //       element: <UtilsMaterialIcons />
    // //     }
    // //   ]
    // // },
    // {
    //   path: 'admin/sample-page',
    //   element: (
    //     <AuthGuard>
    //       <SamplePage />
    //     </AuthGuard>
    //   )
    // }
  ]
};

export default MainRoutes;
