const express = require("express");

const payme = require("../controllers/transaction.controller");

const { paymeCheckToken } = require("../middlewares/transaction.middleware");

const router = express.Router();

router.post("/payment", payme);

module.exports = router;
