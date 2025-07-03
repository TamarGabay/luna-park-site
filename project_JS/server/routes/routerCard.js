console.log("router of cardsssssssssssssss");
const express=require('express');
const router=express.Router();
const card=require("../controllers/cards");
// router.delete('/deleteCard/:codeCard',card.deleteCard);
// router.post('/updateCard/:codeCard',card.updateCard);
router.post('/addNewCard',card.addNewCard)
router.get('/getCard',card.getCard);
router.get('/getCardByType',card.getCardByType);
router.get('/getLastCard',card.getLastCard);
router.get('/getCardByIdUser',card.getCardByIdUser);
router.put('/updateCard',card.updateCard);
router.delete('/deleteAllCards',card.deleteAllCards);
router.delete('/deleteCardByCode',card.deleteCardByCode);
router.delete('/deleteCardByIdUser',card.deleteCardByIdUser);

module.exports=router;