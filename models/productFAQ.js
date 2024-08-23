import mongoose, {Schema,model, models} from "mongoose"
const ProductFAQSchema = new Schema({
    productName:{ type: String},
    question: { type: String, required: true },
    answer: { type: String },
    isAnswered:{type:Boolean,default:false}

},
{
    timestamps: true 
})
export const ProductFAQ = models?.ProductFAQ || model('ProductFAQ',ProductFAQSchema)
