const express = require("express");
const { isAuthenticatedUser, athorizeRoles } = require("../middleware/auth");
const { newOrder } = require("../controllers/oderController");

const router = express.Router();

router.route("/oder/new").post(isAuthenticatedUser,newOrder);

module.exports = router