const Card = require("../models/cardSchema");
//const routerUser=require("../routes/routerCard");
console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkk")


//POST
const addNewCard=async (req,res)=>{
    try{
        console.log("posttttttttttttttttttttttttttttttttttttttttttttttttttt");
        // const today = new Date();
        // console.log("req.query.Date "+req.body.Date+" today: "+today);
        // if(req.query.Date <= today)
        //     return res.status(404).json({mess:"cannot invite this date!!, choose another date"})
        const newCard=new Card(req.body);
        await newCard.save();
        res.status(200).json({mess:"card add succeed",card: newCard});
        //console.log(newCard);
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

//GET
const getCard=async (req,res)=>{
    try{
        const card=await Card.find();
        res.status(200).json(card)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

//פונקציה המחזירה משתמש לפי ת.ז
const getCardByType=async(req,res)=>{
    try{
        const type=req.query.typeCard;
        console.log(type)
        if(!type){
            return res.status(400).send({ message: 'לא הוקש סוג.' });
        }
        await Card.find({typeCard: type})
        .then(card=>{
            console.log(`${card}`)
            if(!card){
                return res.status(404).send({ message: 'לא נמצא משתמש התואם לסוג זו' });
            }
            res.send(card)
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'החיפוש נכשל, נסו שנית'});
    }
}
//GET BY ID USER
const getCardByIdUser=async(req,res)=>{
    try{
        const idUser=req.query.idUser;
        console.log(idUser)
        if(!idUser){
            return res.status(400).send({ message: 'לא הוקש משתמש.' });
        }
        await Card.find({idUser: idUser})
        .then(card=>{
            console.log(`${card}`)
            if(!card){
                return res.status(404).send({ message: 'לא נמצא כרטיס התואם למשתמש זה' });
            }
            res.send(card)
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'החיפוש נכשל, נסו שנית'});
    }
}

//GET LAST
const getLastCard=async (req,res)=>{
    try{
        const card=await Card.find();
        const lastCard=card[card.length-1];

        res.send(lastCard);
        //res.status(200).json(lastCard)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}
//DELETE
const deleteAllCards=async (req,res)=>{
    try{
        await Card.deleteMany({})
        .then(() => {console.log('Cards deleted successfully');
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

//DELETE BY CODE
const deleteCardByCode=async (req,res)=>{
    try{
        // const user=await User.findOneAndDelete({id:id});
        const code=req.query.codeCard
        const card = await Card.deleteOne( { codeCard: code});       
        if (!card) {
            console.log('card not found');
            return;
        }
        res.status(200).json('delited')
        console.log('card: '+code+' deleted successfully');
    }
    catch (e) {
        res.status(500).json({
            "fail in deleted account": e.message
        })
}

}

//DELETE BY USER ID
const deleteCardByIdUser=async (req,res)=>{
    try{
        // const user=await User.findOneAndDelete({id:id});
        const idUser=req.query.idUser
        const cards_by_user=Card.find({idUser:idUser})
        const card= await cards_by_user.deleteMany({});
        // const card = await Card.deleteOne( { idUser: idUser});       
        if (!card) {
            console.log('card not found');
            return;
        }
        console.log(card)
        res.status(200).json('delited')
        console.log('card of user: '+idUser+' deleted successfully');
    }
    catch (e) {
        res.status(500).json({
            "fail in deleted account": e.message
        })
}

}

//UPDATE
const updateCard = async(req,res)=>{
    try{
        const codeCard = req.query.codeCard;
        if(!codeCard){
            return res.status(400).send({ message: 'לא נמצאה ת.ז.' });
        }
        const {date, count} = req.body;
        const card = await Card.updateOne(
            {codeCard: codeCard},
            {$set:{date, count}},
        {new:true})
        if(!card){
            return res.status(404).json({ message: "card is not found" }, card);
        }
        res.status(200).json({message: "card is update"}, user);
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

module.exports={addNewCard,getCard,getCardByType,getLastCard,deleteAllCards,getCardByIdUser,updateCard,deleteCardByCode,deleteCardByIdUser}