import { createBrowserRouter } from 'react-router-dom';

// routes
import ClientAdminRoutes from './ClientAdminRoute';

// ==============================|| ROUTING RENDER ||============================== //
// const router = createBrowserRouter([ClientRoutes, MainRoutes, LoginRoutes], {
//   // basename: import.meta.env.VITE_APP_BASE_NAME
// });
const router = createBrowserRouter(ClientAdminRoutes);

export default router;
