import AuthService from './auth.service';
import ExamplesService from '../services/examples.service';

import jwt from 'jsonwebtoken';

import { Request, Response } from 'express';

import { environment } from '../../config/environment';
import { User } from '../../models/User';

export class Controller {
  async signIn(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const response = await AuthService.signInByEmail(email, password);
    if (response.result) {
      const user = <User> response.model;
      const payload = { userId: user.userId, name: user.name, role: user.role, status: user.status }
      const token = jwt.sign(payload, environment.loginSecret);
      response.code = token
    }
    return res.json(response)
  }


  all(req: Request, res: Response): void {
    ExamplesService.all().then(r => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id'])
    ExamplesService.byId(id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    ExamplesService.create(req.body.name).then(r =>
      res
        .status(201)
        .location(`/api/v1/examples/${r.id}`)
        .json(r),
    );
  }
}
export default new Controller();
