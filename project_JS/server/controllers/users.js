
const User = require("../models/userSchema");
const routerUser=require("../routes/routerUser");

require('dotenv').config();

//POST
const createNewUser=async (req,res)=>{
    try{
        // const u = req.query;
        // const token = generateToken(u.nameUser, u.email, u.age, u.id);
        // console.log('Generated Token:', token);

        await User.findOne({id: req.body.id})
       .then(user=>{
        console.log(`${user}`)
        if(user){
            return res.status(404).send({ message: ' נמצא משתמש התואם לת.ז. זו' });
        }
        const newUser=new User(req.body);
        newUser.save();
        res.status(200).json({mess:"user save succeed",user:newUser})}
        )
    }
    catch(err){
console.log(err)
res.status(400).json(err)
    }
}
//GET
const getUser=async (req,res)=>{
    try{
        const user=await User.find();
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}


//פונקציה המחזירה משתמש לפי ת.ז
const getUserByID=async(req,res)=>{
    try{
        const id=req.query.id;
        if(!id){
            return res.status(400).send({ message: 'לא הוקש ת.ז.' });
        }
        await User.findOne({id: id})
        .then(user=>{
            console.log(`${user}`)
            if(!user){
                return res.status(404).send({ message: 'לא נמצא משתמש התואם לת.ז. זו' });
            }
            res.send(user)

        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'החיפוש נכשל, נסו שנית'});
    }
}


//DELETE BY ID
const deleteUserById=async (req,res)=>{
    try{
        // const user=await User.findOneAndDelete({id:id});
        const id=req.query.id
        const user = await User.deleteOne( { id: id});       
        if (!user) {
            console.log('User not found');
            return;
        }
        res.status(200).json('delited')
        console.log('User deleted successfully');
    }
    catch (e) {
        res.status(500).json({
            "fail in deleted account": e.message
        })
}

}


//DELETE
const deleteAllUsers=async (req,res)=>{
    try{
        await User.deleteMany({})
        .then(() => {console.log('Users deleted successfully');
        res.status(200).json('delited')
            return;
        });
    }
    catch(e) {
        res.status(500).json({
            "fail in deleted account": e.message
        })
    }

}


//PUT
const updateUser=async (req,res)=>{
    try{
        const id = req.query.id
        if(!id)
            return res.status(400).send({ message: 'לא נמצאה ת.ז.' });
        const { nameUser, email,age } = req.body;
        // const u=await User.findOne({id:id});         
        const user = await User.updateOne( { id: id},{$set:{nameUser,email,age}},
            {new: true})
        if (!user) {
            // אם המשתמש לא נמצא
            return res.status(404).json({ message: "User not found" }, user);
        }
        res.status(200).json({message: "user is update"}, user);
    }
    catch(err){
        console.log(err)
         // בדיקה אם הקוד סטטוס HTTP לא חוקי
         if (err.statusCode && (err.statusCode < 100 || err.statusCode > 599)) {
            res.status(500).json({ message: "Invalid status code", error: err });
        } else {
            res.status(404).json({ message: "An error occurred", error: err });
        }
    }
}


module.exports={getUser, createNewUser, getUserByID, deleteAllUsers, updateUser,deleteUserById}

