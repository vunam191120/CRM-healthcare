const checkRoleRoute = (role) => {
  switch (role) {
    case 1:
      return 'admin';
    case 2:
      return 'sale';
    case 3:
      return 'bo';
    case 4:
      return 'support';
    case 5:
      return 'marketing';
    default:
      return false;
  }
};

export default checkRoleRoute;
