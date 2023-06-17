const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/guard-auth.middleware');
/* GET home page */
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("index");
});

module.exports = router;
