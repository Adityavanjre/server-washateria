const express = require ("express");
const router = express.Router();
const AdminController = require("../Controller/admincontroller"); 

const {
    signup,
    login,
    verifyToken,
    getUser,
    refreshToken,
    logout,
  } = require('../Controller/Adminauthcontroller');
 
  router.post("/adminsignup", signup);
  router.post("/adminlogin", login);
  router.get("/adminadmin", verifyToken, getUser);
  router.get("/adminrefresh", refreshToken, verifyToken, getUser);
  router.post("/adminlogout", verifyToken, logout);


router.get("/", AdminController.admin_index); 
router.post("/", AdminController.create_admin);
// router.get("/:id", crudController.crud_details);
// router.delete("/:id", crudController.crud_delete); 
router.get("/:id", AdminController. admin_details);
router.patch("/:id", AdminController.admin_update);
  module.exports = router;