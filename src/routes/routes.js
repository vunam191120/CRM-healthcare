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
} from './paths';
import Account from '../pages/accounts';
import CreateAccount from '../pages/accounts/create';
import UpdateAccount from '../pages/accounts/update';
import Category from '../pages/categories';
import CreateCategory from '../pages/categories/create';
import UpdateCategory from '../pages/categories/update';
import Service from '../pages/services';
import CreateService from '../pages/services/create';
import UpdateService from '../pages/services/update';
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
];

export default appRoutes;
