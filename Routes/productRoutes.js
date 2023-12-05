const express = require("express"); 
const router = express.Router(); 
const productController = require("../Controller/Productcontroller"); 


router.get("/", productController.product_index); 
router.post("/", productController.product_create);
// router.get("/:id", crudController.crud_details);
router.delete("/:id", productController.product_delete); 
router.get("/:id", productController. product_details);
router.patch("/:id", productController.product_update);
module.exports = router;

	