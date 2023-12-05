const mongoose = require("mongoose"); 
const bcrypt = require('bcryptjs');
const usersSchema = new mongoose.Schema({ 

	fullname: { 
		type: String, 

	},
    Email: { 
		type: String,

	},
    Password: { 
		type: String, 

	},
    
	Phone:{
		type:String,
		require:true,
	},
	Address1:{
		type:String,
	},
	Area:{
		type:String,
	},
	Postal:{
		type:String,
	},
	City:{
		type:String,
	},
	

},
{
	timestamps:true,
	
});



module.exports = mongoose.model("User", usersSchema, "Users");