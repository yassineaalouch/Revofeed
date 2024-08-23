import {Schema,model, models} from "mongoose"

const UsersEmailsSchema = new Schema({

      email: {type: String, require:true} ,
      company_name: {type:String},
      phone_number:{type: String,require:true},
      subject: {type: String, require:true} ,
      message:{type: String,require:true},
      isChecked:{type: Boolean ,default:false}


},
{
    timestamps: true 
  }
);

export const UsersEmails = models.UsersEmails || model('UsersEmails',UsersEmailsSchema);
 