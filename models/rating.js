import {Schema,model, models} from "mongoose"
const RatingsSchema = new Schema({
    name: { type: String,},
    email:{type:String},
    rating: { type: Number},
    customerReview:{type:String},
    productID: {type:Schema.Types.ObjectId,ref:'Product'}
},
{  
    timestamps: true 
})
export const Ratings = models?.Ratings || model('Ratings',RatingsSchema)
  