import {Schema,model, models} from "mongoose"

const CodeSchema = new Schema({
    title: {type:String},
    code: {type:String}
});

export const Code = models.Code || model('Code',CodeSchema);
 