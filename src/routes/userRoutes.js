import { Router } from "express";

const router = Router();

import verifyToken from "../middlewares/authMiddleware.js";
import authRoles from "../middlewares/roleMiddleware.js";

// admin
router.get(
  "/admin",
  verifyToken,
  authRoles("admin ", "manager"),
  (req, res) => {
    res.json({
      message: "welcome  Admin",
    });
  }
);

// manager
router.get("/manager", verifyToken, authRoles("manager"), (req, res) => {
  res.json({
    message: "welcome  manager",
  });
});

// user
router.get(
  "/user",
  verifyToken,
  authRoles("user", "manager", "admin"),
  (req, res) => {
    res.json({
      message: "welcome  user",
    });
  }
);

export { router as userRoutes };
