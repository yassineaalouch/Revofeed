// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import { AdminUsers } from '@/models/Admine_Users';
import { Users } from '@/models/Users';
import { Accounts } from '@/models/Accounts';
import mongooseConnect from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      async profile(profile) {
        await mongooseConnect();
        const adminUsers = await AdminUsers.find({});
        const adminList = adminUsers.map(admin => admin.email);
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          password:'',
          profilePicture: profile.picture.data.url,
          role: adminList.includes(profile.email) ? 'admin' : 'user'
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile) {
        await mongooseConnect();
        const adminUsers = await AdminUsers.find({});
        const adminList = adminUsers.map(admin => admin.email);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          password:'',
          profilePicture: profile.picture,
          role: adminList.includes(profile.email) ? 'admin' : 'user'
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        await mongooseConnect();
        const user = await Users.findOne({ email: credentials.email });

        if (user) {
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (isValidPassword) {
            const adminUsers = await AdminUsers.find({});
            const adminList = adminUsers.map(admin => admin.email);
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              role: adminList.includes(user.email) ? 'admin' : 'user'
            };
          } else {
            throw new Error('Invalid password or email');
          }
        } else {
          throw new Error('No user found with this email');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account }) {
      await mongooseConnect();
      const existingUser = await Users.findOne({ email: user.email });
      
      if (existingUser) {
        // Si un utilisateur existe déjà, mettre à jour le compte dans la base de données
        const existingAccount = await Accounts.findOne({ userId: existingUser._id, provider: account.provider });

        if (!existingAccount) {
          // Créer un nouveau compte si non existant
          await Accounts.create({
            userId: existingUser._id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            token_type: account.token_type,
            expires_at: account.expires_at,
            refresh_token: account.refresh_token,
            scope: account.scope,
            id_token: account.id_token,
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user'; 
      } else {
        await mongooseConnect();
        const adminUsers = await AdminUsers.find({});
        const adminList = adminUsers.map(admin => admin.email);
        const userInDb = await Users.findOne({ email: token.email });
        token.role = adminList.includes(userInDb?.email) ? 'admin' : 'user';
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role; 
      return session;
    },
  },  
  pages: {
    signIn: '/Login',
    error: '/login_error', // custom error page
  },
});











