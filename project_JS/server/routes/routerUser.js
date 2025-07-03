console.log("router-user");
const express=require('express');
const router=express.Router();
const user=require("../controllers/users");
router.get('/getUser',user.getUser);
router.get('/getUserByID',user.getUserByID);
router.post('/createNewUser',user.createNewUser);
router.delete('/deleteAllUsers',user.deleteAllUsers);
router.delete('/deleteUserById',user.deleteUserById);
router.put('/updateUser',user.updateUser);

module.exports=router;