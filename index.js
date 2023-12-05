require("dotenv").config();
const cookieParser= require ("cookie-parser")

const express = require("express");
const cors = require("cors"); 
const connection = require("./db");
const Adminauthcontroller=require('./Controller/Adminauthcontroller');
const adminRoutes=require('./Routes/adminRoutes');
const productRoutes=require('./Routes/productRoutes');
const orderRoutes= require('./Routes/orderRoutes')





const app = express(); 
const PORT = process.env.PORT || 8080; 

// database connection
connection(); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(cors()); 
app.use((req, res, next) => { 
	res.locals.path = req.path;
	next();
	
});
app.use(cookieParser());




Adminauthcontroller.adminpost();
app.use("/api/adminauth", adminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product",productRoutes);
app.use("/api/order",orderRoutes)



// listening on port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`)); 
