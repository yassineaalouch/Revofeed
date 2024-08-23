import mongoose, { Schema, model, models } from "mongoose";

const AdminUsersSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

export const AdminUsers = models.AdminUsers || model('AdminUsers', AdminUsersSchema);
