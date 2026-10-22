export const verifyAdmin = (req, res, next) => {
  const category = req.user.category;
  if (category !== "Admin") {
    return res.status(403).json({
      isSuccess: false,
      message: "Admin access required",
      statusCode: 403,
    });
  }
  next();
};
