import User from '../pages/users';
import { PATH_USERS, PATH_USERS_UPDATE } from './paths';

/* <Route path="/" element={} /> */

export const appRoutes = [
  {
    path: PATH_USERS,
    element: User,
    roles: ['Admin'],
  },
  {
    path: PATH_USERS_UPDATE,
    element: 'hello',
    roles: ['Admin'],
  },
];
