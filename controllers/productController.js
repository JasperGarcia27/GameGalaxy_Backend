const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");




// - Create Product(Admin Only)
module.exports.addProduct = async (req, res) => {

	let newProduct = new Product({
		name: req.body.name,
		description: req.body.description,
		image: req.body.image,
		price: req.body.price,
		category: req.body.category
	});

	if (req.body.price <= 0) {
		return res.send({ "message": "The price should not to be a zero or less than" });
	}
	else {
		return await newProduct.save().then((product, error) => {
			if (error) {
				return res.send({ "message": "Error Created" });
			}
			else {
				return res.send({ "message": "Product Successfully Created" });
			}
		})
			.catch(err => res.send(err))
	}

};

// - Retrieve All Products
module.exports.getAllProducts = (req, res) => {
	return Product.find({}).then(result => {
		return res.send(result);
	})
		.catch(err => res.send(err))
};

// - Retrieve All Active Products
module.exports.getAllActive = (req, res) => {
	return Product.find({ isActive: true }).then(result => {
		return res.send(result);
	})

}

// - Retrieve Single Product
module.exports.getProduct = (req, res) => {
	return Product.findById(req.params.productId).then(result => {
		return res.send(result);
	})

}

// - Update Product Information(Admin Only)
module.exports.updateProduct = (req, res) => {
	let updatedProduct = {
		name: req.body.name,
		description: req.body.description,
		image: req.body.image,
		price: req.body.price,
		category: req.body.category
	};

	return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error) => {
		if (error) {
			return res.send(false)
		}
		else {
			return res.send({ "message": "Product Updated" })
		}
	})

}

// - Archive Product(Admin Only)
module.exports.archiveProduct = (req, res) => {
	let arcivedProduct = { isActive: false };
	return Product.findByIdAndUpdate(req.params.productId, arcivedProduct).then((product, error) => {
		if (error) {
			return res.send(false)
		}
		else {
			return res.send({ "message": "Product Archive Successfully" })
		}
	})

}

// - Activate Product(Admin Only)
module.exports.activateProduct = (req, res) => {
	let updateActiveField = { isActive: true }
	return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
		.then((product, error) => {
			if (error) {
				return res.send(false)

			} else {
				return res.send({ "message": "Product's Activated" })
			}
		})
		.catch(err => res.send(err))
};

//[SECTION] Retrieve all courses
module.exports.getAllItem = (req, res) => {
	return Product.find({}).then(result => {
		return res.send(result);
	})
		.catch(err => res.send(err))
};

module.exports.searchProductsByName = async (req, res) => {
	try {
		const { productName } = req.body;
		
		// Use a regular expression to perform a case-insensitive search
		const products = await Product.find({
			name: { $regex: productName, $options: 'i' }
		});

		res.json(products);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};


/*--------------------------- Filtering --------------------------- */ 
/*~~~~~~ ALL ~~~~~~*/ 
// - All 0 to 50k
module.exports.getAllActive0To50k = (req, res) => {
	return Product.find({ isActive: true, price: { $gte: 0, $lte: 50000 } }).then(result => {
		return res.send(result);
	})
}

// - All 50k to 100k
module.exports.getAllActive50kTo100k = (req, res) => {
	return Product.find({ isActive: true, price: { $gte: 50000, $lte: 100000 } }).then(result => {
		return res.send(result);
	})
}

// - All 100k to 150k
module.exports.getAllActive100kTo150k = (req, res) => {
	return Product.find({ isActive: true, price: { $gte: 100000, $lte: 150000 } }).then(result => {
		return res.send(result);
	})
}

// - All 150k and Above
module.exports.getAllActive150kAndAbove = (req, res) => {
	return Product.find({ isActive: true, price: { $gte: 150000, $lte: 500000 } }).then(result => {
		return res.send(result);
	})
}

/*~~~~~~ DESKTOP ~~~~~~*/ 
// - All Desktop Products
module.exports.getAllDesktop = (req, res) => {
	return Product.find({ isActive: true, category: 'Desktop' }).then(result => {
		return res.send(result);
	})
}

// - All Desktop 0 to 50k
module.exports.getAllDesktop0To50k = (req, res) => {
	return Product.find({ isActive: true, category: 'Desktop', price: { $gte: 0, $lte: 50000 } }).then(result => {
		return res.send(result);
	})
}

// - All Desktop 50k to 100k
module.exports.getAllDesktop50kTo100k = (req, res) => {
	return Product.find({ isActive: true, category: 'Desktop', price: { $gte: 50000, $lte: 100000 } }).then(result => {
		return res.send(result);
	})
}

// - All Desktop 100k to 150k
module.exports.getAllDesktop100kTo150k = (req, res) => {
	return Product.find({ isActive: true, category: 'Desktop', price: { $gte: 100000, $lte: 150000 } }).then(result => {
		return res.send(result);
	})
}

// - All Desktop 150k and Above
module.exports.getAllDesktop150kAndAbove = (req, res) => {
	return Product.find({ isActive: true, category: 'Desktop', price: { $gte: 150000, $lte: 500000 } }).then(result => {
		return res.send(result);
	})
}

/*~~~~~~ LAPTOP ~~~~~~*/ 
// - All Laptop Products
module.exports.getAllLaptop = (req, res) => {
	return Product.find({ isActive: true, category: 'Laptop' }).then(result => {
		return res.send(result);
	})
}

// - All Laptop 0 to 50k
module.exports.getAllLaptop0To50k = (req, res) => {
	return Product.find({ isActive: true, category: 'Laptop', price: { $gte: 0, $lte: 50000 } }).then(result => {
		return res.send(result);
	})
}

// - All Laptop 50k to 100k
module.exports.getAllLaptop50kTo100k = (req, res) => {
	return Product.find({ isActive: true, category: 'Laptop', price: { $gte: 50000, $lte: 100000 } }).then(result => {
		return res.send(result);
	})
}

// - All Laptop 100k to 150k
module.exports.getAllLaptop100kTo150k = (req, res) => {
	return Product.find({ isActive: true, category: 'Laptop', price: { $gte: 100000, $lte: 150000 } }).then(result => {
		return res.send(result);
	})
}

// - All Laptop 150k and Above
module.exports.getAllLaptop150kAndAbove = (req, res) => {
	return Product.find({ isActive: true, category: 'Laptop', price: { $gte: 150000, $lte: 500000 } }).then(result => {
		return res.send(result);
	})
}

/*~~~~~~ CONSOLE ~~~~~~*/ 
// - All Console Products
module.exports.getAllConsole = (req, res) => {
	return Product.find({ isActive: true, category: 'Console' }).then(result => {
		return res.send(result);
	})
}

// - All Console 0 to 50k
module.exports.getAllConsole0To50k = (req, res) => {
	return Product.find({ isActive: true, category: 'Console', price: { $gte: 0, $lte: 50000 } }).then(result => {
		return res.send(result);
	})
}

// - All Console 50k to 100k
module.exports.getAllConsole50kTo100k = (req, res) => {
	return Product.find({ isActive: true, category: 'Console', price: { $gte: 50000, $lte: 100000 } }).then(result => {
		return res.send(result);
	})
}

// - All Console 100k to 150k
module.exports.getAllConsole100kTo150k = (req, res) => {
	return Product.find({ isActive: true, category: 'Console', price: { $gte: 100000, $lte: 150000 } }).then(result => {
		return res.send(result);
	})
}

// - All Console 150k and Above
module.exports.getAllConsole150kAndAbove = (req, res) => {
	return Product.find({ isActive: true, category: 'Console', price: { $gte: 150000, $lte: 500000 } }).then(result => {
		return res.send(result);
	})
}

/*~~~~~~ ACCESSORIES ~~~~~~*/ 
// - All Accessories Products
module.exports.getAllAccessories = (req, res) => {
	return Product.find({ isActive: true, category: 'Accessories' }).then(result => {
		return res.send(result);
	})
}

// - All Accessories 0 to 50k
module.exports.getAllAccessories0To50k = (req, res) => {
	return Product.find({ isActive: true, category: 'Accessories', price: { $gte: 0, $lte: 50000 } }).then(result => {
		return res.send(result);
	})
}

// - All Accessories 50k to 100k
module.exports.getAllAccessories50kTo100k = (req, res) => {
	return Product.find({ isActive: true, category: 'Accessories', price: { $gte: 50000, $lte: 100000 } }).then(result => {
		return res.send(result);
	})
}

// - All Accessories 100k to 150k
module.exports.getAllAccessories100kTo150k = (req, res) => {
	return Product.find({ isActive: true, category: 'Accessories', price: { $gte: 100000, $lte: 150000 } }).then(result => {
		return res.send(result);
	})
}

// - All Accessories 150k and Above
module.exports.getAllAccessories150kAndAbove = (req, res) => {
	return Product.find({ isActive: true, category: 'Accessories', price: { $gte: 150000, $lte: 500000 } }).then(result => {
		return res.send(result);
	})
}