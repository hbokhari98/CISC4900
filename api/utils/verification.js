/* eslint-disable eqeqeq */
module.exports = {
  // The admin field would exist if user is admin (or not be set to false)
  isAdmin(user) {
    if (user.admin) {
      return true;
    }

    return false;
  },
  // Check if current user is same as user specified
  usersMatch(userTarget, userCurrent) {
    if (userTarget == userCurrent) {
      return true;
    }

    return false;
  },
};
