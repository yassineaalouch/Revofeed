import { Users } from '@/models/Users';
import mongooseConnect from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { password , email } = req.body;

  await mongooseConnect();
  const existingUser = await Users.findOne({email});
  const hashedPassword = await bcrypt.hash(password,10);
  existingUser.password = hashedPassword;

  existingUser.resetToken = undefined;
  existingUser.resetTokenExpiry = undefined;

  try{

    await existingUser.save()
    return res.status(200).json({ message: 'password has changed successfully ' });

  }catch{

    return res.status(500).json({ message: 'Error!!! try again' });

  }


}