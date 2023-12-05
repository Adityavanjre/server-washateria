// Importing the CRUD model
const Product = require("../Model/Pricemodel");

// Display All CRUD Data
const product_index = async(req, res) => {
	try{
		const products= await Product.find().exec();
		res.json(products);
	}
	catch(error){
		console.log("Error in CRUD index method", error)
		res.status( 500).json({
			error:'internalserver error'
		})
	}
};

// Create New CRUD
const product_create = (req, res) => {
	// Create a new instance of the CRUD model using the request body as data
	let product = new Product(req.body);
	product.save()
		.then((product) => {
			// Send the saved instance of the CRUD model as the response
			res.send(product);
		})
		.catch(function(err) {
			// If there is an error while saving, respond with a 422 status code and an error message
			res.status(422).send("Crud add failed");
		});
};




// Show a particular CRUD Detail by Id
const product_details =async (req, res) => {
	try{
	// Find an instance of the CRUD model by its id
	const product= await Product.findById(req.params.id)
		if (!product) {
			// If no instance is found, respond with a 404 status code and an error message
			res.status(404).send("No result found");
		} else {
			// Respond with the JSON representation of the found instance
			res.json(product);
		}
}
catch(error){
	console.log(error);
}
};



// Update CRUD Detail by Id
const product_update = async(req, res) => {
	try{
	// Find an instance of the CRUD model by its id and update it with the request body
	 await Product.findByIdAndUpdate(req.params.id, req.body)
		
			// Respond with a success message
			res.json("Crud updated");
	}
		catch(err) {
			// If there is an error while updating, respond with a 422 status code and an error message
			res.status(422).send("Crud update failed.");
		
	}
};

// Delete CRUD Detail by Id
const product_delete = async(req, res) => {
	// Find an instance of the CRUD model by its id
	try{
	const product= await Product.findById(req.params.id) 
		if (!product) {
			// If no instance is found, respond with a 404 status code and an error message
			res.status(404).send("Crud not found");
		} else {
			// If an instance is found, delete it from the database
			await Product.findByIdAndRemove(req.params.id)

			console.log("data deleted");
			}
	}
	catch(error)
	{
		console.log(error);
	}};

module.exports = {
	product_index,
	product_details,
	product_create,
	product_update,
	product_delete,
};
