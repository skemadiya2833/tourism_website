import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    email: string;
    sub: number;
    role: string;
  };
}
