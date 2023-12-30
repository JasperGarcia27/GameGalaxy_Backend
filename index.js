// [SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
// const cartRoutes = require("./routes/cartRoutes")

const port = 8080;


const app = express();




app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb',extended: true}));

app.use(cors())



app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/orders", orderRoutes)
// app.use("/cart", cartRoutes)




mongoose.connect("mongodb+srv://jaspergarcia200127:admin123@course-booking.kxhpoat.mongodb.net/Online-Shopping?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


mongoose.connection.once("open", () => console.log("Now conneceted to MongoDB Atlas"));





if(require.main === module) {
	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${process.env.PORT || port}`);
	})
}

module.exports = {app, mongoose};