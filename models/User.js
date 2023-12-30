const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName: {
	    type: String,
	    required: [true, "First Name is required"]
	},
	lastName: {
	    type: String,
	    required: [true, "Last Name is required"]
	},
	address: {
	    type: String,
	    required: [true, "Address is required"]
	},
	email: {
	    type: String,
	    required: [true, "Email is required"]
	},
	password: {
	    type: String,
	    required: [true, "Password is required"]
	},
	isAdmin: {
	    type: Boolean,
	    default: false
	},
	// addToCart: [
	//     {
	//     	items: [{
	//     		productId: {
	//     			type: mongoose.Schema.Types.ObjectId,
    //                 ref: 'Product'
    //             },
    //             productName: {
    //                 type: String
    //             },
	// 			productDescription: {
    //                 type: String
    //             },
	// 			productImage: {
    //                 type: String
    //             },
	// 			productPrice: {
    //                 type: Number
    //             },
    //             quantity: {
    //                 type: Number,
    //                 min: 1
    //             }
	//     	}],
	//         total_Amount: {
	//         	type: Number
	//         },
	//         saveOn: {
	//             type: Date,
	//             default: new Date()
	//         }
	//     }
	// ],
	// orderedProduct: [
	//     {
	//     	// products: [{
	//     	// 	productId: {
	//     	// 		type: mongoose.Schema.Types.ObjectId,
    //         //         ref: 'Product'
    //         //     },
	// 		// 	image: String,
    //         //     productName: {
    //         //         type: String
    //         //     },
    //         //     quantity: {
    //         //         type: Number,
    //         //         min: 1
    //         //     }
	//     	// }],
	// 		productId: {
	// 			type: mongoose.Schema.Types.ObjectId,
	// 			ref: 'Product'
	// 		},
	// 		image: String,
	// 		productName: {
	// 			type: String
	// 		},
	// 		quantity: {
	// 			type: Number,
	// 			min: 1
	// 		},
	//         subTotalAmount: {
	//         	type: Number
	//         },
	//         purchaseOn: {
	//             type: Date,
	//             default: new Date()
	//         }
	//     }
	// ]
})

module.exports = mongoose.model("User", userSchema);

