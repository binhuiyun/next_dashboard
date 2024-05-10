import GoogleProvider from "next-auth/providers/google";
import User from '@models/user';
import { connectToDB } from '@utils/database';

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session }: { session: any }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }: { profile: any  }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            name: profile.name,
            avatar: profile.image,
          });
        }

        return true
      } catch (error:any) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  },
}


export default authOptions;
