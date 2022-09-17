const checkRole = (roleId) => {
  switch (roleId) {
    case 1:
      return 'Admin';
    case 2:
      return 'Sale';
    case 3:
      return 'Back Officer';
    default:
      return 'Invalid Role';
  }
};

export default checkRole;
