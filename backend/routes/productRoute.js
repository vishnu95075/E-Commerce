const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview, getProductReviews, deleteProductReviews } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/products").get(getAllProduct);
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetail);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteProductReviews);
module.exports = router;