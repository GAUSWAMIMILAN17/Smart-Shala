export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user JWT middleware mathi aave che
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied ! Only Admin This Action Perform",
      });
    }

    next();
  };
};
