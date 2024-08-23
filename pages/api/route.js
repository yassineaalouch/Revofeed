import { Users } from '@/models/Users';
import mongooseConnect from '@/lib/mongoose';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Email is required' });
  }

  await mongooseConnect();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await Users.findOne({
    resetToken:hashedToken,
    resetTokenExpiry : {$gt:Date.now()}   
  }) 

  if(!user){
    return res.status(400).json({ message: 'Invalid link or has expired' });
  }
  return res.status(200).json(user);}