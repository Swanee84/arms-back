import { Application } from 'express'
import AuthRouter from './api/auth/auth.router'
export default function routes(app: Application): void {
  app.use('/api/auth', AuthRouter);
}