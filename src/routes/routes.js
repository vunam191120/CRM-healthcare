import User from '../pages/users';
import CreateUser from '../pages/users/create';
import UpdateUser from '../pages/users/update';
import { PATH_USERS, PATH_USERS_CREATE, PATH_USERS_UPDATE } from './paths';

const appRoutes = [
  {
    path: PATH_USERS,
    element: <User />,
    roles: ['Admin'],
  },
  {
    path: PATH_USERS_CREATE,
    element: <CreateUser />,
    roles: ['Admin'],
  },
  {
    path: PATH_USERS_UPDATE,
    element: <UpdateUser />,
    roles: ['Admin'],
  },
];

export default appRoutes;
