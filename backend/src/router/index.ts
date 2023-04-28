import express from "express";
import {body} from "express-validator";

import UserController from "../controllers/user-controller";
import AuthMiddleware from "../middleware/auth-middleware";
import currencyController from "../controllers/currency-controller";

const router: express.Router = express.Router();

router.post(
    "/registration",
    body("username").isLength({min: 4, max: 16}),
    body("email").isEmail(),
    body("password").isLength({min: 8, max: 26}),
    UserController.registration,
);

router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({min: 8}),
    UserController.login,
);

router.post("/recovery",
    body("email").isEmail(),
    UserController.recovery,
);

router.post("/review",
    body("email").isEmail(),
    body("message").isLength({min: 8}),
    UserController.review,
);

router.post("/contact",
    body("email").isEmail(),
    body("message").isLength({min: 8}),
    UserController.contact
);

router.post("/wallet", UserController.createWallet);

router.post("/logout", UserController.logout);

router.get("/activate/:link", UserController.activate);

router.get("/refresh", UserController.refresh);

router.get("/review", UserController.getReviews);

router.get("/wallet", UserController.getWallets);

router.get("/users", AuthMiddleware, UserController.getUsers);

router.get("/currency", currencyController.getCurrency);

export default router;
