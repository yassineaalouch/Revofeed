import { Users } from "@/models/Users";
import mongooseConnect from "@/lib/mongoose";
import bcrypt from 'bcryptjs';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    const { email } = req.query;
    if (email) {
      const user = await Users.findOne({ email });
      res.json(user);
    } else {
      res.json(await Users.find());
    }
  }

  if (method === 'POST') {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userDoc = await Users.create({ name , email, password: hashedPassword });
      res.status(201).json(userDoc);
    } else {
      res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }
  }
}
