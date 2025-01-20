import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import userHelper from '../helpers/users.helper';
import 'dotenv/config';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  database: drizzleAdapter(db, {
    provider: 'sqlite'
  }),
  user: {
    additionalFields: {
      username: { type: 'string' }
    }
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await userHelper.generateDefaultUsername(user.id);
          return;
        }
      }
    }
  }
});
