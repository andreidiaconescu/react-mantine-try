import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { PreferredAreas } from './pages/PreferredAreas.page';
import { PreferredCategsLvl1 } from './pages/PreferredCategsLvl1.page';
import { CitizenCreateProfile } from './components/CitizenCreateProfile/CitizenCreateProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/citizen',
    children: [
      {
        path: 'create-profile',
        element: <CitizenCreateProfile />,
        children: [
          {
            path: 'preferred-areas',
            element: <PreferredAreas />,
          },
          {
            path: 'preferred-categs-lvl1',
            element: <PreferredCategsLvl1 />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
