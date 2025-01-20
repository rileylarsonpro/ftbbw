import { db } from '../utils/db';
import { eq } from 'drizzle-orm';
import { user } from '../models/auth.model';

const generateDefaultUsername = async (userId: string) => {
  let userNameUnique = false;
  while (!userNameUnique) {
    let username = `User${(Math.random() * Math.pow(10, 6)) << 0}`;
    let result = await findUserByUsername(username);
    if (result) {
      continue;
    } else {
      await db
        .update(user)
        .set({ username: username })
        .where(eq(user.id, userId));
      return;
    }
  }
};

const findUserByUsername = async (username: string) => {
  return db.query.user.findFirst({
    where: (user) => eq(user.username, username)
  });
};

const findUserByUserId = async (userId: string) => {
  return db.query.user.findFirst({
    where: (user) => eq(user.id, userId)
  });
};

export default {
  generateDefaultUsername,
  findUserByUsername,
  findUserByUserId
};
