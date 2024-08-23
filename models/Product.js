import {Schema,model, models} from "mongoose"

const ProductSchema = new Schema({

    title: { type: String, required: true },
    description: { type: String},
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    comments:{type:Boolean,default:true},

    purchasePrice: { type: Number},
    supplier: { type: String},
    stockQuantity: { type: Number},
    dimensions: {
      length: { type: Number},
      width: { type: Number}, 
      height: { type: Number}
    },
    recyclingInformation: { type: String},
    countryOfProduction: { type: String},
    deliveryTime: { type: String},
    SKU: { type: String}, 
    barcode: { type: String},
    returnAndWarrantyConditions: { type: String},
    careInstructions: { type: String},
    expirationDate: { type: Date},
    averageCustomerRating: { type: Number },

    customerRating:[{ type: Number }],
    materials: [{ type: String }],
    allergens: [{ type: String}],
    certificatesAndLabels: [{ type: String}],
    rating: { type: Number},
    ratingDistribution :{
      cinque: {type:Number},
      quatre: {type:Number},
      trois: {type:Number},
      deux: {type:Number},
      un: {type:Number}, 
  },

    properties:[ 
      {
        property:{ type:String},
        valuesExist:[{type: String}] 
      }
    ],
    IdOfRatingUsers: [{type:Schema.Types.ObjectId,ref:'Users'}],
    customerReviews: [{type:Schema.Types.ObjectId,ref:'Comments'}],
    promotionsOrDiscounts: [{ type: Schema.Types.ObjectId,ref:'Discount'}],
    complementaryProducts: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    productFAQ: [{type:Schema.Types.ObjectId,ref:'ProductFAQ'}]
  },
  {
      timestamps: true 
  }
);

export const Product = models.Product || model('Product',ProductSchema);