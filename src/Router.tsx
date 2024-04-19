import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { PreferredAreas } from './pages/PreferredAreas.page';
import { PreferredCategsLvl1 } from './pages/PreferredCategsLvl1.page';
import { CitizenCreateProfile } from './components/CitizenCreateProfile/CitizenCreateProfile';
import { PreferredCategsLvl2 } from './pages/PreferredCategsLvl2.page';
import { PreferredAudiences } from './pages/PreferredAudiences.page';
import { PreferredCulturalCreators } from './pages/PreferredCulturalCreators.page';
import { PreferredCulturalOperators } from './pages/PreferredCulturalOperators.page';
import { CitizenCreateProfileChooseEmail } from './pages/CitizenCreateProfileChooseEmail.page';
import { CitizenCreateProfileShareProfileWithOperator } from './pages/CitizenCreateProfileShareProfileWithOperator.page';
import { CitizenCreateProfileActivateAccountEmailSent } from './pages/CitizenCreateProfileActivateAccountEmailSent.page';

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
          {
            path: 'preferred-categs-lvl2',
            element: <PreferredCategsLvl2 />,
          },
          {
            path: 'preferred-audiences',
            element: <PreferredAudiences />,
          },
          {
            path: 'preferred-cultural-creators',
            element: <PreferredCulturalCreators />,
          },
          {
            path: 'preferred-cultural-operators',
            element: <PreferredCulturalOperators />,
          },
          {
            path: 'choose-email',
            element: <CitizenCreateProfileChooseEmail />,
          },
          {
            path: 'share-profile-with-operator',
            element: <CitizenCreateProfileShareProfileWithOperator />,
          },
          {
            path: 'activate-account-email-sent',
            element: <CitizenCreateProfileActivateAccountEmailSent />,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
