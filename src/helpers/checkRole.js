const checkRole = (roleId) => {
  switch (roleId) {
    case 1:
      return 'Admin';
    case 2:
      return 'Sale';
    case 3:
      return 'Back Officer';
    case 4:
      return 'Support';
    case 5:
      return 'Marketing';
    default:
      return 'Invalid Role';
  }
};

export default checkRole;
