const Admin = require('../Model/Adminmodel');
 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
 
let adminCreated = false;
const adminpost = async (req, res) => {
    const adminCreated = [
      { FirstName: "Aditya", 
        MiddleName: "C",
        Lastname: "L",
        Email:"washateriaadmin1@copao.com" ,
        Key: "vikas", 
        Password: bcrypt.hashSync("123456789") }
    ];
 
    try {
      const existingAdmin = await Admin.findOne({ Email:"washateriaadmin@copao.com"});
 
      if (!existingAdmin) {
        const createdAdmin = await Admin.create(adminCreated);
 
        // generateToken(res, createdAdmin._id);
        console.log('Default SellerAdmin created:', createdAdmin);
      } else {
        console.log("Admin already created");
      }
    } catch (error) {
      console.error('Error creating default Admin:', error);
    }
  };
 
 
 
 
  const signup = async (req, res, next) => {
 
    const  FirstName = req.body.FirstName;
    const  Lastname = req.body.LastName;
    const Key =  req.body.Key;
    const Email=req.body.Email;
    const Password =  req.body.Password;
  console.log(FirstName);
  console.log(Lastname);
  console.log(Key);
  console.log(Password);
  console.log(Email);

    let existingUser;
    try {
      existingUser = await Admin.findOne({ Email:Email});
    } catch (err) {
      console.log(err);
      console.log("find ERROR")
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Admin already exists! Login Instead" });
    }
    const hashedPassword = bcrypt.hashSync(Password);
    const admin = new Admin({
      FirstName,
      Lastname,
      Email,
      Key,
      Password: hashedPassword,
    });
 
    try {
      await admin.save();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error signup" });
    }
    return res.status(201).json({ message: admin });
  };
 
 
 
 
  const login = async (req, res, next) => {
 
    const Email  = req.body.Email;
    const Password  = req.body.Password;
 
    let existingUser;
 
    try {
      existingUser = await Admin.findOne({ Email: Email });
    } catch (err) {
      return new Error(err);
    }
    if (!existingUser) {
      return res.status(400).json({ message: "User not found. Please Signup or create new account...-" });
    }
    const isPasswordCorrect = bcrypt.compareSync(Password, existingUser.Password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Inavlid key / Password" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
 
    console.log("Generated Token\n", token);
 
    if (req.cookies[`${existingUser._id}`]) {
      req.cookies[`${existingUser._id}`] = "";
    }
 
    res.cookie(String(existingUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 86400000), // 24hr
      httpOnly: true,
      sameSite: "lax",
    });
 
    return res
      .status(200)
      .json({ message: "Successfully Logged In", admin: existingUser, token });
  };
 
  const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    if (!token) {
      res.status(404).json({ message: "No token found" });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, admin) => {
      if (err) {
       
        return res.status(400).json({ message: "Invalid TOken" });
      }
      console.log(admin.id);
      req.id = admin.id;
    });
    next();
  };
 
 
 
  const getUser = async (req, res, next) => {
    const adminId = req.id;
    let user;
    try {
      user = await Admin.findById(adminId, "-Password");
    } catch (err) {
      return new Error(err);
    }
    if (!user) {
      return res.status(404).json({ messsage: "Admin Not FOund" });
    }
    return res.status(200).json({ user });
  };
 
 
  const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies?.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, Admin) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${Admin.id}`);
      req.cookies[`${Admin.id}`] = "";
 
      const token = jwt.sign({ id: Admin.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });
      console.log("Regenerated Token\n", token);
 
      res.cookie(String(Admin.id), token, {
        path: "/",
        expires: new Date(Date.now() + 86400000), // 30 seconds
        httpOnly: true,
        sameSite: "lax",
      });
 
      req.id = Admin.id;
      next();
    });
  };
 
  const logout = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies?.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Authentication failed" });
      }
      res.clearCookie(`${user.id}`);
      req.cookies[`${user.id}`] = "";
      return res.status(200).json({ message: "Successfully Logged Out" });
    });
  };
 
  module.exports ={
    logout,
    signup,
    login,
    verifyToken,
    getUser,
    refreshToken,
    adminpost
  }
 