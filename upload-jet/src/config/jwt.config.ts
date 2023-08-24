import { expiresInSchema } from 'auth/jwt.dto';

const expiresInOption = { expiresIn: '3600s' };

export const expiresIn = expiresInSchema.parse(expiresInOption);
