import { authenticationService } from '../services/authentication.service';

export const authHeader = () => {
  const currentUser = authenticationService.currentUser();
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
};
