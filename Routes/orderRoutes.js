const express = require("express"); 
const router = express.Router(); 
const orderController = require("../Controller/ordercontroller"); 


router.get("/", orderController.order_index); 
router.post("/", orderController.order_create);
router.get("/:id", orderController. order_details);
router.patch("/:id", orderController.order_update);
module.exports = router;
