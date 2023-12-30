const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');


module.exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.send({ error: 'Invalid input data' });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.send({ error: 'Product not found' });
    }

    const { price, name, image } = product;

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId.toString());

      if (productIndex > -1) {
        const productItem = cart.products[productIndex];
        productItem.quantity += quantity;
        cart.products[productIndex] = productItem;
      } else {
        cart.products.push({ productId, name, quantity, price,image });
      }
      cart.bill += price * quantity;

      await cart.save();
      return res.send({ success: true });
    } else {
      const newCart = new Cart({
        userId: req.user.id,
        products: [{ productId, name, quantity, price, image }],
        bill: price * quantity,
      });

      await newCart.save();
      return res.send({ success: true });
    }
  } catch (err) {
    return res.send({ error: 'Internal Server Error' });
  }
};

module.exports.getCart = (req, res) => {

    Cart.find({ userId: req.user.id })
        .then(result => {
            res.send(result);
        })
        .catch(error => {
        });
};

module.exports.deleteCart = async (req, res) => {

	const userId = req.user.id;
  
	try {
  
	  const result = await Cart.deleteOne({ userId: userId });
	  return res.send(result);
	} catch (error) {
	  console.error(error);
	  return res.status(500).send({ error: "Failed to delete cart" });
	}
  }

