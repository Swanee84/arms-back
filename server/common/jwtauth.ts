import * as express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

import { environment } from '../config/environment';

const authMiddleware = (grantedRole?: string[]) => (req: express.Request, res: express.Response, next: express.NextFunction): void => {
	// read the token from header or url
	// TODO: req.query.token 도 허용할 것인가?
	// const originalUrl = req.originalUrl
	const token = req.headers['authorization'] || req.query.token;

	// token does not exist
	if (!token) {
		res.json({ result: false, status: 401, code: 'token', message: 'No access token in Header' });
		return;
	}
	// create a promise that decodes the token
	const p = new Promise((resolve, reject) => {
		jwt.verify(token, environment.loginSecret, (err, decoded) => {
			if (err) reject(err);
			resolve(decoded);
		});
	});

	// process the promise
	p.then(decoded => {
		const decodedUser = decoded as User;
		req.decodedUser = decodedUser;
		console.log(`grantedRole : [${grantedRole}]`);
		const isPermission = grantedRole ? grantedRole.includes(decodedUser.role) : true;
		console.log(`isPermisstion : [${isPermission}]`);
		if (isPermission) {
			next();
		} else {
			return res.json({ result: false, status: 401, code: 'permission', message: '권한 없는 기능' });
		}
	}).catch(error => {
		return res.json({ result: false, status: 401, code: 'token', message: error.message });
	});
};

export default authMiddleware;
