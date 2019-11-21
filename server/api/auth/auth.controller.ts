import AuthService from './auth.service';
import ExamplesService from '../services/examples.service';

import jwt from 'jsonwebtoken';

import { Request, Response } from 'express';

import { environment } from '../../config/environment';
import { User } from '../../models/User';
import { IResponse } from '../../models/IResponse';
import { Constant } from '../../config/Constant';

export class Controller {
  async signIn(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    if (!email) {
      return res.json({ result: false, status: 400, code: 'email', message: 'Empty Parameter' });
    }
    if (!password) {
      return res.json({ result: false, status: 400, code: 'password', message: 'Empty Parameter' });
    }
    const response: IResponse = await AuthService.signInByEmail(email, password);
    if (response.result) {
      const user = <User> response.model;
      const payload = { userId: user.userId, name: user.name, role: user.role, status: user.status }
      const token = jwt.sign(payload, environment.loginSecret);
      response.code = token
    }
    return res.json(response)
  }

  async tokenRefresh(req: Request, res: Response): Promise<Response> {
    const token = req.headers[Constant.HEADER_KEY]
    {
      if (typeof token == "undefined")
        return res.json({ result: false, status: 400, code: 'token', message: '"token" not specified' });
      if (token == null)
        return res.json({ result: false, status: 400, code: 'token', message: '"token" not assigned' });
      if (typeof token !== "string")
        return res.json({ result: false, status: 400, code: 'token', message: 'Type of "token" not matched' });
    }
    // exception 이 발생하면 pristin.wrap 에서 처리한다.
    const decoded = await jwt.verify(token, environment.loginSecret)
    if (!decoded)
      return res.json({ result: false, status: 400, code: 'token', message: 'invalid token' });
    
    const response: IResponse = await AuthService.signInByTokenEmail(decoded.userId);
    if (response.result) {
      const token = await jwt.sign(decoded, environment.loginSecret);
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
