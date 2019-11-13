import { Application } from 'express'
import v1Router from './api/v1/controllers/router'
export default function routes(app: Application): void {
  app.use('/api/v1', v1Router)
}