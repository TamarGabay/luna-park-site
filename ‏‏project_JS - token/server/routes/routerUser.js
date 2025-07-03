console.log("router-user");
const express=require('express');
const router=express.Router();
const { generateToken, verifyToken } = require('../middleware/token');
const user=require("../controllers/users");
router.get('/getUser',user.getUser);
router.get('/getUserByID',generateToken,user.getUserByID);
router.post('/createNewUser',generateToken,user.createNewUser);
router.delete('/deleteAllUsers',user.deleteAllUsers);
router.delete('/deleteUserById',verifyToken,user.deleteUserById);
router.put('/updateUser',user.updateUser);

module.exports=router;