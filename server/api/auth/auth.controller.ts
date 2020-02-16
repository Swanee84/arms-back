import AuthService from './auth.service';

import jwt from 'jsonwebtoken';

import { Request, Response } from 'express';

import { environment } from '../../config/environment';
import { User } from '../../models/User';
import { IResponse } from '../../models/IResponse';
import { Constant } from '../../config/Constant';

class AuthController {
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
			const user = response.model as User;
			const payload = { userId: user.userId, name: user.name, role: user.role, status: user.status };
			const token = jwt.sign(payload, environment.loginSecret);
			response.code = token;
			let academyId: number = null;
			let branchId: number = null;
			await AuthService.getUserBranchList(user);
			if (user.userBranchList.length == 1) {
				const branch = user.userBranchList[0];
				academyId = branch.academyId;
				branchId = branch.branchId;
			}
			AuthService.insertSignInLog(user, 1, academyId, branchId);
		}
		return res.json(response);
	}

	async tokenRefresh(req: Request, res: Response): Promise<Response> {
		const token = req.headers[Constant.HEADER_KEY];
		if (!token) {
			return res.json({ result: false, status: 400, code: 'token', message: '"token" not specified' });
		}
		// exception 이 발생하면 pristin.wrap 에서 처리한다.
		const decoded = await jwt.verify(token, environment.loginSecret);
		if (!decoded) {
			return res.json({ result: false, status: 400, code: 'token', message: 'invalid token' });
		}
		const response: IResponse = await AuthService.signInByTokenEmail(decoded.userId);
		if (response.result) {
			const token = await jwt.sign(decoded, environment.loginSecret);
			const user = response.model as User;
			response.code = token;
			let academyId: number = null;
			let branchId: number = null;
			await AuthService.getUserBranchList(user);
			if (user.userBranchList.length == 1) {
				const branch = user.userBranchList[0];
				academyId = branch.academyId;
				branchId = branch.branchId;
			}
			AuthService.insertSignInLog(user, 2, academyId, branchId);
		}
		return res.json(response);
	}
}
export default new AuthController();
