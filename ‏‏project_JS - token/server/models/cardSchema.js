const mongoose=require('mongoose');

const cardSchema=mongoose.Schema
(
    {
        typeCard:{type: String},
        date:{type: Date},
        codeCard:{type: Number},
        count:{type:Number},
        idUser:{type:mongoose.Schema.Types.String,ref:'userSchema'}  
    }
)

module.exports=mongoose.model('cardSchema',cardSchema);