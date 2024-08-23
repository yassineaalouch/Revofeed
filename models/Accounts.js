// models/Accounts.js
import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  access_token: { type: String },
  token_type: { type: String },
  expires_at: { type: Number },
  refresh_token: { type: String },
  scope: { type: String },
  id_token: { type: String },
});

export const Accounts = mongoose.models.Accounts || mongoose.model('Accounts', AccountSchema);
