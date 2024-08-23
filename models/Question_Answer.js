import {Schema,model, models} from "mongoose"

const Question_AnswerSchema = new Schema({
    question: {type: String, require:true} ,
    answer: {type:String , default:null},
    isAnswered:{type:Boolean,default:false}
});

export const Question_Answer = models.Question_Answer || model('Question_Answer',Question_AnswerSchema);
 