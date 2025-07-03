const mongoose=require('mongoose');

const userSchema=mongoose.Schema
(
    {
        nameUser:{type: String},
        id:{type: String},
        email:{type: String},
        age:{type: Number}
        //codeCard:{type:mongoose.Schema.Types.ObjectId,ref:'card'}     
    }
)

module.exports=mongoose.model('userSchema',userSchema);