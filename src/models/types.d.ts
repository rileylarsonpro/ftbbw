import type { InferSelectModel } from 'drizzle-orm';
import { answer } from './answer.model';
import { user } from './auth.model';

type Answer = InferSelectModel<typeof answer>;
type User = InferSelectModel<typeof user>;
