const mongoose = require("mongoose"); 
// const bcrypt = require('bcryptjs');
const adminSchema = new mongoose.Schema({ 

	
    FirstName: { 
		type: String, 

	},
    
    MiddleName: { 
		type: String, 

	},
    
    LastName: { 
		type: String, 

	},
    Email: { 
		type: String,

	},
    Password: { 
		type: String, 

	},
    Key:{
        type:String,
    }
    // Confirmpassword: { }
	
});

// module.exports = mongoose.model("Product", productsSchema, "Products");
module.exports = mongoose.model("Admin", adminSchema, "Admins");