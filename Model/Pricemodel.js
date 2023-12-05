const mongoose = require("mongoose"); 
const productSchema = new mongoose.Schema({ 

	
    Product: { 
		type: String, 

	},
    Price:{
        type:String,
    }
    
	
});


module.exports = mongoose.model("Product",productSchema, "Products");