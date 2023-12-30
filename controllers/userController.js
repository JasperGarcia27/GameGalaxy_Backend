// [SECTION] Dependencies and Modules
const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require('bcrypt');
const auth = require("../auth");



// http://localhost:4000/users/register
// - User Registration
module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		address: reqBody.address,
		email : reqBody.email,
		password : bcrypt.hashSync(reqBody.password, 10)
	})
	return newUser.save().then((user, error) => {
		if(error){
			return {"message":"Invalid to Register"}
		
		}else{
			return {"message":"Your Account is Successfully Register"}
		}
	}).catch(err => err)
}

// http://localhost:4000/users/login
// - User Authentication
module.exports.loginUser = (req, res) => {
	User.findOne({ email : req.body.email} ).then(result => {

		console.log(result);

		// User does not exist
		if(result == null){

			return res.send(false);

		// User exists
		} else {
			
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
			// If the passwords match/result of the above code is true
			if (isPasswordCorrect) {

				return res.send({ access : auth.createAccessToken(result) })

			// Passwords do not match
			} else {

				return res.send(false);
			}
		}
	})
	.catch(err => res.send(err))
};

// http://localhost:4000/users/getOrder
// - Non-admin User Checkout(Create Order)
module.exports.createOrder = async (req, res) => {
	
	if(req.user.isAdmin){
		return res.send("Action Forbidden")
	}

	console.log(req.user.id)
	console.log(req.body.productId)
	
	const user_Id = await User.findById(req.user.id);
	const product_Id = await Product.findById(req.body.productId);
	// Check if the product id entered has a record in the database.
	if(!product_Id) {
		return res.send({ message: "Unavailable product"});
	}
	// Access item using product id
    const product_price = product_Id.price;
    const product_image = product_Id.image;
    const product_name = product_Id.name;
	const checkAvailable = product_Id.isActive;
	const quantityVal = req.body.quantity
    console.log(checkAvailable)
    console.log(user_Id)

    
	// Check if the product is available
	if(checkAvailable !== true) {
		return res.send({ Note: "This item has sold out."});
	}

	/*if(quantityVal === "" || quantityVal === null){
		return res.send({ Note: "Please enter quantity first before checkout, it should not to be a zero"});
	}*/
  
	let isOrderUpdated = await User.findById(req.user.id).then(user => {

		let addOrder = {
			productId: req.body.productId,
			image: product_image,
			productName: product_name,
			quantity: quantityVal
		}

		user.orderedProduct.push({
			addOrder,
	     	subTotalAmount: product_price * quantityVal
	    });

		return user.save().then(user => true).catch(err => err.message)
	})
	if(isOrderUpdated !== true){
		return res.send({message: isOrderUpdated})
	}

	let isProductUpdated = await Product.findById(req.body.productId).then(product => {
		let customer = {
			userId: req.user.id,
		}
		product.userOrders.push(customer)
		return product.save().then(product => true).catch(err => err.message)
	})

	if(isProductUpdated !== true){
		return res.send({message: isProductUpdated})
	}

	if(isOrderUpdated && isProductUpdated){
		return res.send({message: "Order Successfully"})
	}
}

// http://localhost:4000/users/getUserDetails
// - Retrieve User Details
module.exports.userDetails = async(req, res) => {
	return User.findById(req.user.id)
    .then(result => {
    	return res.send(result);
    })
    .catch(err => res.send(err))
}	


// http://localhost:4000/users//updateAdmin
// - Set user as admin(Admin Only)
module.exports.updateUserAsAdmin = (req, res) => {
    return User.findByIdAndUpdate(req.body.userId, {isAdmin : true}).then((user, error)=>{
        if(error){
            return res.send(false)
        }else{
        	return res.send({message:"User updated as admin Successfully"})
        }
    })
}

// http://localhost:4000/users/getUserOrders
// - Retrieve authenticated user's orders
module.exports.userOrders = async (req, res) => {
	console.log(req.user.id) 	
	if(req.user.isAdmin){
		return res.send("Action Forbidden")
	}
    let isOrder = await User.findById(req.user.id).then(result => {
        const hourd = result.orderedProduct
        return res.send(hourd);
    })
    .catch(err => res.send(err))
    if(isOrder !== true){
		return res.send({message : "User not found"})
	}
}

module.exports.resetPassword = async (req, res) => {
	try {

	//console.log(req.user)
	//console.log(req.body)

	  const { newPassword } = req.body;
	  const { id } = req.user; // Extracting user ID from the authorization header
  
	  // Hashing the new password
	  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
	  // Updating the user's password in the database
	  await User.findByIdAndUpdate(id, { password: hashedPassword });
  
	  // Sending a success response
	  res.status(200).send({ message: 'Password reset successfully' });
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: 'Internal server error' });
	}
};

//[SECTION] Reset Profile
module.exports.updateProfile = async (req, res) => {
	try {

		console.log(req.user);
		console.log(req.body);
		
	// Get the user ID from the authenticated token
	  const userId = req.user.id;
  
	  // Retrieve the updated profile information from the request body
	  const { firstName, lastName, address } = req.body;
  
	  // Update the user's profile in the database
	  const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ firstName, lastName, address },
		{ new: true }
	  );
  
	  res.send(updatedUser);
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: 'Failed to update profile' });
	}
  }

// Cart
module.exports.createCart = async (req, res) => {
	
	if(req.user.isAdmin){
		return res.send("Action Forbidden")
	}

	console.log(req.user.id)
	console.log(req.body.productId)
	
	const user_Id = await User.findById(req.user.id);
	const product_Id = await Product.findById(req.body.productId);
	// Check if the product id entered has a record in the database.
	if(!product_Id) {
		return res.send({ message: "Unavailable product"});
	}
	// Access item using product id
    const productPrice = product_Id.price;
    const productName = product_Id.name;
    const productDescription = product_Id.description;
    const productImage = product_Id.image;
	const isAvailable = product_Id.isActive;
	const quantity = req.body.quantity
    console.log(isAvailable)
    console.log(user_Id)

    
	// Check if the product is available
	if(isAvailable !== true) {
		return res.send({ Note: "This item has sold out."});
	}

	
  
	let isCartUpdated = await User.findById(req.user.id).then(user => {

		let addCart = {
			productId: req.body.productId,
			productName: productName,
			productDescription: productDescription,
			productImage: productImage,
			productPrice: productPrice,
			quantity: quantity
		}

		user.addToCart.push({
			items: [addCart],
	     	total_Amount: productPrice * quantity
	    });

		return user.save().then(user => true).catch(err => err.message)
	})

	if(isCartUpdated !== true){
		return res.send({message: isCartUpdated})
	}

	if(isCartUpdated){
		return res.send({message: "Added to Cart Successfully"})
	}
}


// Retrieve Products on Cart
module.exports.userCart = async (req, res) => {
	console.log(req.user.id) 	
	if(req.user.isAdmin){
		return res.send("Action Forbidden")
	}
    let isProductCart = await User.findById(req.user.id).then(result => {
        const hourd = result.addToCart
        return res.send(hourd);
    })
    .catch(err => res.send(err))
    if(isProductCart !== true){
		return res.send({message : "User not found"})
	}
}
