import { Application } from 'express'
import AuthRouter from './api/auth/auth.router'
import UserRouter from './api/user/user.router'

export default function routes(app: Application): void {
  app.use('/api/auth', AuthRouter);
  app.use('/api/user', UserRouter);
}