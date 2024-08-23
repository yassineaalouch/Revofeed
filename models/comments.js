import  {Schema,model, models} from "mongoose"
const CommentsSchema = new Schema({
    name: { type: String, required: false },
    email:{type:String},
    comment: { type: String, required: false },
    likes: [{ type:Schema.Types.ObjectId,ref:'Users',default:[],required: false}],
    isReply: { type:Boolean,default:false ,required: false},
    repliesList: [{ type:Schema.Types.ObjectId,ref:'Comments',default:[] ,required: false}],
    replyTo: { type:Schema.Types.ObjectId,ref:'Comments',required: false},
    productID: {type:Schema.Types.ObjectId,ref:'Product'}




},
{ 
    timestamps: true 
})
export const Comments = models?.Comments || model('Comments',CommentsSchema)
  