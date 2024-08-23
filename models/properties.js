import mongoose, {Schema,model, models} from "mongoose"
const PropertySchema = new Schema({
    name:{type:String , require: true},
    values:[{type:String}],
})
export const Properties = models?.Properties || model('Properties',PropertySchema)
   