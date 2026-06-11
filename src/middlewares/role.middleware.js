export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error("No autenticado");    
      error.StatusCode = 401;
      return next(error);
    }

    if (!roles.includes(req.user.roles)) {
        const error = new Error("No tiene permisos suficientes");
        error.StatusCode = 403;
        return next(error);
    }
    next();
  };
};