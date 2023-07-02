const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, deleteOrder, updateOrder } = require("../controllers/oderController");

const router = express.Router();

router.route("/oder/new").post(isAuthenticatedUser, newOrder);

router.route("/oder/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/oders/me").get(isAuthenticatedUser, getMyOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.
    route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router