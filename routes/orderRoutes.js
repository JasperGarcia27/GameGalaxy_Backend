const express = require("express");
const orderController = require("../controllers/orderController");
const auth = require("../auth");

const {verify, verifyAdmin} = auth;


const router = express.Router();


router.get("/orderHistory", verify, orderController.getOrderHistory);

router.post("/directCheckout", verify, orderController.directOrder);

router.post("/cartCheckout", verify, orderController.cartOrder);



module.exports = router;