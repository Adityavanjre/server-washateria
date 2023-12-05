const Order = require("../Model/Ordermodel");

const order_index = async(req, res) => {
	try{
		const orders= await Order.find().exec();
		res.json(orders);
	}
	catch(error){
		console.log("Error in CRUD index method", error)
		res.status( 500).json({
			error:'internalserver error'
		})
	}
};

const order_create = (req, res) => {
	let order = new Order(req.body);
	order.save()
		.then((order) => {
			res.send(order);
		})
		.catch(function(err) {
			res.status(422).send("Crud add failed");
		});
};




const order_details =async (req, res) => {
	try{
	const order= await Order.findById(req.params.id)
		if (!order) {
			res.status(404).send("No result found");
		} else {
			res.json(order);
		}
}
catch(error){
	console.log(error);
}
};



const order_update = async(req, res) => {
	try{
	 await Order.findByIdAndUpdate(req.params.id, req.body)
		
			res.json("Crud updated");
	}
		catch(err) {
			res.status(422).send("Crud update failed.");
		
	}
};

const order_delete = async(req, res) => {
	try{
	const order= await Order.findById(req.params.id) 
		if (!order) {
			res.status(404).send("Crud not found");
		} else {
			await Order.findByIdAndRemove(req.params.id)

			console.log("data deleted");
			}
	}
	catch(error)
	{
		console.log(error);
	}};

module.exports = {
	order_index,
	order_details,
	order_create,
	order_update,
	order_delete,
};
