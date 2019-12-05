import { Application } from 'express'
import AuthRouter from './api/auth/auth.router'
import UserRouter from './api/user/user.router'
import CodeRouter from './api/code/code.router'
import AdminRouter from './api/admin/admin.router'
import CourseRouter from './api/course/course.router'

export default function routes(app: Application): void {
  app.use('/api/auth', AuthRouter);
  app.use('/api/user', UserRouter);
  app.use('/api/code', CodeRouter);
  app.use('/api/admin', AdminRouter);
  app.use('/api/course', CourseRouter);
}