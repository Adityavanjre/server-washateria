const Admin = require("../Model/Adminmodel");

const admin_index = async(req, res) => {
	try{
		const admins= await Admin.find().exec();
		res.json(admins);
	}
	catch(error){
		console.log("Error in CRUD index method", error)
		res.status( 500).json({
			error:'internalserver error'
		})
	}
};

const create_admin = (req, res) => {
	let admin = new Admin(req.body);
	admin.save()
		.then((admin) => {
			res.send(admin);
		})
		.catch(function(err) {
			res.status(422).send("Admin add failed");
		});
};




const admin_details =async (req, res) => {
	try{
	const admin= await Admin.findById(req.params.id)
		if (!admin) {
			res.status(404).send("No result found");
		} else {
			res.json(admin);
		}
}
catch(error){
	console.log(error);
}
};



const admin_update = async(req, res) => {
	try{
	 await Admin.findByIdAndUpdate(req.params.id, req.body)
		
			res.json("Admin updated");
	}
		catch(err) {
			res.status(422).send("Admin update failed.");
		
	}
};

const admin_delete = async(req, res) => {
	try{
	const admin= await Admin.findById(req.params.id) 
		if (!crud) {
			res.status(404).send("Admin not found");
		} else {
			await Crud.findByIdAndRemove(req.params.id)

			console.log("Admin data deleted");
			}
	}
	catch(error)
	{
		console.log(error);
	}};

module.exports = {
	admin_index,
	
	create_admin,
	admin_update,
	admin_delete,
    admin_details,
};
