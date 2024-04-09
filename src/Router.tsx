import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { PreferredAreas } from './pages/PreferredAreas.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/preferred-areas',
    element: <PreferredAreas />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
