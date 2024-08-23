import { Users } from '@/models/Users';
import mongooseConnect from '@/lib/mongoose';
import crypto from 'crypto';
import { sendMail } from "@/service/mailService";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  await mongooseConnect();

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User with this email not found' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    const passwordResetExpires = Date.now() + 3600000;// 1 hour expiry
    // Save the token and its expiration in the user document
    user.resetToken = passwordResetToken;
    user.resetTokenExpiry = passwordResetExpires; 
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/resetPassword/${resetToken}`
    await user.save();

    console.log(resetUrl)
    const subject = 'Reset Password Request';
    const message = `You requested a password reset. Click here ${resetUrl} to reset your password.`;
    await sendMail(subject, email, message)
    .then(()=>{return res.status(200).json({ message: 'Password reset link sent to your email address.' });})
    .catch(async(error)=>{
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined; 
        await user.save();
        return res.status(500).json({ message: 'Internal server error,try again' });
    });
    try{
        await user.save();  
        return res.status(200).json({ message: 'Password reset link sent to your email address.' });
    }
    catch (error) {
        console.error('Error requesting password reset:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}
