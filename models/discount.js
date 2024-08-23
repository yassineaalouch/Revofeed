import mongoose, {Schema,model, models} from "mongoose"
const DiscountSchema = new Schema({
    titre: { type: String, required: false },
    quantity: { type:Number, required: false },
    price:{ type:Number, required: false },
},
{
    timestamps: true 
})
export const Discount = models?.Discount || model('Discount',DiscountSchema)
  