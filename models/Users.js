import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  emailVerified: { type: Boolean, default: true },
  test:{ type: Boolean, default: true },
  likes: { type: String, default:"yassine" },
  role:{type:String,default:"user"},
  googleId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  resetTokenExpiry :{type:Date,required:false},
  resetToken  :{type:String,required:false}
}, {
  timestamps: true // Utilisez 'timestamps' pour ajouter createdAt et updatedAt
});

export const Users = models.Users || model('Users', UserSchema);

 