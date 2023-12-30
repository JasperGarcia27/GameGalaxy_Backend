const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../auth");

const {verify, verifyAdmin} = auth;


const router = express.Router();



router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => {
		res.send(resultFromController)
	})
})

router.post("/login", userController.loginUser);

// router.post("/getOrder", verify, userController.createOrder);

router.get("/getUserDetails", verify, userController.userDetails);    

router.put("/updateAdmin", verify, verifyAdmin, userController.updateUserAsAdmin);

// router.get("/getUserOrders", verify, userController.userOrders);

router.put('/reset-password', verify, userController.resetPassword);

router.put('/profile', verify, userController.updateProfile);


module.exports = router;