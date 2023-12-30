// [SECTION] Dependencies and Modules
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const cartController = require('../controllers/cartController')
const bcrypt = require('bcrypt');
const auth = require("../auth");


module.exports.getOrderHistory = (req, res) => {
	return Order.find({ userId: req.user.id })
		.then(result => {
			return res.send(result);
		})
		.catch(err => res.send(err))
}

module.exports.directOrder = async (req, res) => {

	if (req.user.isAdmin) {
		return res.send("Action Forbidden")
	}

	console.log(req.user.id)
	console.log(req.body.productId)

	const user_Id = await User.findById(req.user.id);
	const product_Id = await Product.findById(req.body.productId);
	// Check if the product id entered has a record in the database.
	if (!product_Id) {
		return res.send({ message: "Unavailable product" });
	}
	// Access item using product id
	const product_price = product_Id.price;
	const product_image = product_Id.image;
	const product_name = product_Id.name;
	const checkAvailable = product_Id.isActive;
	const quantityVal = req.body.quantity
	const userId = req.user.id;
	console.log(checkAvailable)
	console.log(user_Id)


	// Check if the product is available
	if (checkAvailable !== true) {
		return res.send({ Note: "This item has sold out." });
	}


	let isOrderUpdated = await User.findById(req.user.id).then(user => {

		let addOrder = {
			productId: req.body.productId,
			image: product_image,
			productName: product_name,
			quantity: quantityVal,
			price: product_price
		}

		const order = new Order({
			userId: userId,
			products: addOrder,
			bill: product_price * quantityVal
		});


		return order.save().then(user => true).catch(err => err.message)
	})

	if (isOrderUpdated !== true) {
		return res.send({ message: isOrderUpdated })
	}

	let isProductUpdated = await Product.findById(req.body.productId).then(product => {
		let customer = {
			userId: req.user.id,
		}
		product.userOrders.push(customer)
		return product.save().then(product => true).catch(err => err.message)
	})

	if (isProductUpdated !== true) {
		return res.send({ message: isProductUpdated })
	}

	if (isOrderUpdated && isProductUpdated) {
		return res.send({ message: "Order Successfully" })
	}
}

module.exports.cartOrder = async (req, res) => {
	try {
		const userId = req.user.id;
		const cart = await Cart.findOne({ userId: userId });
		if (cart) {
			const { userId, products, bill } = cart;

			const order = new Order({
				userId: userId,
				products: products,
				bill: bill
			});

			const savedOrder = await order.save();
			console.log(savedOrder.userId);

			await cartController.deleteCart(req, res);

			return savedOrder;
		} else {
			return false;
		}
	} catch (err) {
		console.error(err);
		return false;
	}
};

