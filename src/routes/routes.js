import Account from '../pages/accounts';
import UpdateAccount from '../pages/accounts/update';
import CreateAccount from '../pages/accounts/create';

import {
  PATH_ACCOUNTS,
  PATH_ACCOUNTS_CREATE,
  PATH_ACCOUNTS_UPDATE,
} from './paths';

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
];

export default appRoutes;
