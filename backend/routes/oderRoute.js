const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, getMyOrders } = require("../controllers/oderController");

const router = express.Router();

router.route("/oder/new").post(isAuthenticatedUser,newOrder);

router.route("/oder/:id").get(isAuthenticatedUser,getSingleOrder);

router.route("/oders/me").get(isAuthenticatedUser,getMyOrders);

module.exports = router