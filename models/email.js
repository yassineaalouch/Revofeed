import {Schema,model, models} from "mongoose"

const EmailsSchema = new Schema({
subject: {type: String, require:true} ,
destination: {type:String , require:true},
message:{type: String,require:true},
forAllOrNO:String,
});

export const Email = models.Email || model('Email',EmailsSchema);
 