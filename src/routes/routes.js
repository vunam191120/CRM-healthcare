import {
  PATH_ACCOUNTS,
  PATH_ACCOUNTS_CREATE,
  PATH_ACCOUNTS_UPDATE,
  PATH_CATEGORIES,
  PATH_CATEGORIES_CREATE,
  PATH_CATEGORIES_UPDATE,
  PATH_SERVICES,
  PATH_SERVICES_CREATE,
  PATH_SERVICES_UPDATE,
  PATH_SERVICE_DETAIL,
  PATH_CLINICS,
  PATH_CLINICS_CREATE,
  PATH_CLINICS_UPDATE,
  PATH_CLINICS_DETAIL,
  PATH_CATEGORIES_DETAIL,
} from './paths';
import Account from '../pages/accounts';
import CreateAccount from '../pages/accounts/create';
import UpdateAccount from '../pages/accounts/update';
import Category from '../pages/categories';
import CreateCategory from '../pages/categories/create';
import UpdateCategory from '../pages/categories/update';
import CategoryDetail from '../pages/categories/detail';
import Service from '../pages/services';
import CreateService from '../pages/services/create';
import UpdateService from '../pages/services/update';
import ServiceDetail from '../pages/services/detail';
import Clinic from '../pages/clinics';
import CreateClinic from '../pages/clinics/create';
import UpdateClinic from '../pages/clinics/update';
import ClinicDetail from '../pages/clinics/detail';
// import NoMatch from '../components/NoMatch';

const appRoutes = [
  {
    path: PATH_ACCOUNTS,
    element: <Account />,
    roles: ['Admin'],
  },
  {
    path: PATH_ACCOUNTS_CREATE,
    element: <CreateAccount />,
    roles: ['Admin'],
  },
  {
    path: PATH_ACCOUNTS_UPDATE,
    element: <UpdateAccount />,
    roles: ['Admin'],
  },
  {
    path: PATH_CATEGORIES,
    element: <Category />,
    roles: ['Admin'],
  },
  {
    path: PATH_CATEGORIES_CREATE,
    element: <CreateCategory />,
    roles: ['Admin'],
  },
  {
    path: PATH_CATEGORIES_UPDATE,
    element: <UpdateCategory />,
    roles: ['Admin'],
  },
  {
    path: PATH_CATEGORIES_DETAIL,
    element: <CategoryDetail />,
  },
  {
    path: PATH_SERVICES,
    element: <Service />,
    roles: ['Admin'],
  },
  {
    path: PATH_SERVICES_CREATE,
    element: <CreateService />,
    roles: ['Admin'],
  },
  {
    path: PATH_SERVICES_UPDATE,
    element: <UpdateService />,
    roles: ['Admin'],
  },
  {
    path: PATH_SERVICE_DETAIL,
    element: <ServiceDetail />,
    roles: ['Admin'],
  },
  {
    path: PATH_CLINICS,
    element: <Clinic />,
    roles: ['Admin'],
  },
  {
    path: PATH_CLINICS_CREATE,
    element: <CreateClinic />,
    roles: ['Admin'],
  },
  {
    path: PATH_CLINICS_UPDATE,
    element: <UpdateClinic />,
    roles: ['Admin'],
  },
  {
    path: PATH_CLINICS_DETAIL,
    element: <ClinicDetail />,
    roles: ['Admin'],
  },
];

export default appRoutes;
