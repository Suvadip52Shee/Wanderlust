const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");

const {validateReview, isLoggedIn, isReviewAuthor} = require("../Middleware.js");
const reviewController = require("../controllers/reviews.js");

 // Post Reviews Route
  router.post("/",
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview));

  // Delete Review Route
  router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
     wrapAsync(reviewController.deleteReview));


module.exports = router;