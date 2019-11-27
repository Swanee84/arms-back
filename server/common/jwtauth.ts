import * as express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

import { environment } from '../config/environment';

const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // read the token from header or url 
  // TODO: req.query.token 도 허용할 것인가?
  // const originalUrl = req.originalUrl
  const token = req.headers['authorization'] || req.query.token

  // token does not exist
  if (!token) {
    return res.json({ result: false, status: 401, code: 'token', message: 'No access token in Header' });
  }
  // create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, environment.loginSecret, (err, decoded) => {
      if (err) reject(err)
        resolve(decoded);
      })
    }
  )

  // process the promise
  p.then((decoded) => {
    req.decodedUser = decoded as User;
    next()
  }).catch((error) => {
    return res.json({ result: false, status: 401, code: 'token', message: error.message });
  })
}

export default authMiddleware