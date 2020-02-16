import CodeService from './code.service';
import { Request, Response } from 'express';
import { IResponse } from '../../models/IResponse';
import { Constant } from '../../config/Constant';
import { CdGrp, CdDtl } from '../../models/Code';
import { User } from '../../models/User';

class UserController {
	async selGroupCodeList(req: Request, res: Response): Promise<Response> {
		const academyId = req.body.academyId;
		if (!academyId) {
			return res.json({ result: false, status: 400, code: 'academyId', message: 'Empty Parameter' });
		}
		const response: IResponse = await CodeService.selGroupCodeList(academyId);
		return res.json(response);
	}

	async insGroupCode(req: Request, res: Response): Promise<Response> {
		const cdGrp: CdGrp = req.body.cdGrp;
		if (!cdGrp.grpCd) {
			return res.json({ result: false, status: 400, code: 'grpCd', message: 'Empty Parameter' });
		}
		if (!cdGrp.grpCdName) {
			return res.json({ result: false, status: 400, code: 'grpCdName', message: 'Empty Parameter' });
		}
		const user: User = req.decodedUser;
		cdGrp.regId = user.userId;
		if (!cdGrp.status) {
			cdGrp.status = Constant.CODE_NORMAL;
		}

		const response: IResponse = await CodeService.insGroupCode(cdGrp);
		return res.json(response);
	}

	async updGroupCode(req: Request, res: Response): Promise<Response> {
		const cdGrp: CdGrp = req.body.cdGrp;
		if (!cdGrp.grpId) {
			return res.json({ result: false, status: 400, code: 'grpId', message: 'Empty Parameter' });
		}
		const user: User = req.decodedUser;
		cdGrp.modId = user.userId;

		const response: IResponse = await CodeService.updGroupCode(cdGrp);
		return res.json(response);
	}

	async delGroupCode(req: Request, res: Response): Promise<Response> {
		const grpId = req.body.grpId;
		if (!grpId) {
			return res.json({ result: false, status: 400, code: 'grpId', message: 'Empty Parameter' });
		}
		const response: IResponse = await CodeService.delGroupCode(grpId);
		return res.json(response);
	}

	async selDetailCodeList(req: Request, res: Response): Promise<Response> {
		const grpId = req.body.grpId;
		if (!grpId) {
			return res.json({ result: false, status: 400, code: 'grpId', message: 'Empty Parameter' });
		}
		const response: IResponse = await CodeService.selDetailCodeList(grpId);
		return res.json(response);
	}

	async insDetailCode(req: Request, res: Response): Promise<Response> {
		const cdDtl: CdDtl = req.body.cdDtl;
		if (!cdDtl.grpId) {
			return res.json({ result: false, status: 400, code: 'grpCd', message: 'Empty Parameter' });
		}
		if (!cdDtl.grpCd) {
			return res.json({ result: false, status: 400, code: 'grpCd', message: 'Empty Parameter' });
		}
		if (!cdDtl.dtlCd) {
			return res.json({ result: false, status: 400, code: 'dtlCd', message: 'Empty Parameter' });
		}
		if (!cdDtl.dtlCdName) {
			return res.json({ result: false, status: 400, code: 'dtlCdName', message: 'Empty Parameter' });
		}
		const user: User = req.decodedUser;
		cdDtl.regId = user.userId;
		if (!cdDtl.status) {
			cdDtl.status = Constant.CODE_NORMAL;
		}

		const response: IResponse = await CodeService.insDetailCode(cdDtl);
		return res.json(response);
	}

	async updDetailCode(req: Request, res: Response): Promise<Response> {
		const cdDtl: CdDtl = req.body.cdDtl;
		if (!cdDtl.dtlId) {
			return res.json({ result: false, status: 400, code: 'dtlId', message: 'Empty Parameter' });
		}
		const user: User = req.decodedUser;
		cdDtl.modId = user.userId;

		const response: IResponse = await CodeService.updDetailCode(cdDtl);
		return res.json(response);
	}

	async delDetailCode(req: Request, res: Response): Promise<Response> {
		const dtlId = req.body.dtlId;
		if (!dtlId) {
			return res.json({ result: false, status: 400, code: 'dtlId', message: 'Empty Parameter' });
		}
		const response: IResponse = await CodeService.delDetailCode(dtlId);
		return res.json(response);
	}

	async updCodeOrdering(req: Request, res: Response): Promise<Response> {
		const cdDtlList: CdDtl[] = req.body.cdDtlList;
		const userId: number = req.decodedUser.userId;
		for (const cdDtl of cdDtlList) {
			if (!cdDtl.dtlId) {
				return res.json({ result: false, status: 400, code: 'dtlId', message: 'Empty Parameter' });
			}
			if (cdDtl.dtlOrder < 0) {
				return res.json({ result: false, status: 400, code: 'dtlOrder', message: 'Empty Parameter' });
			}
			cdDtl.modId = userId;
		}
		const response: IResponse = await CodeService.updCodeOrdering(cdDtlList);
		return res.json(response);
	}

	async selAllDetailCodeList(req: Request, res: Response): Promise<Response> {
		const response: IResponse = await CodeService.selDetailCodeList();
		return res.json(response);
	}

	async selGroupCodeInDetailCodeList(req: Request, res: Response): Promise<Response> {
		const academyId = req.body.academyId;
		if (!academyId) {
			return res.json({ result: false, status: 400, code: 'academyId', message: 'Empty Parameter' });
		}
		const grpCdList = req.body.grpCdList;
		// 전체 검색이 있을수도 있으므로 grpCdList 는 체크하지 않는다.
		// if (!grpCdList) {
		//   return res.json({ result: false, status: 400, code: 'grpCdList', message: 'Empty Parameter' });
		// }
		const response: IResponse = await CodeService.selGroupCodeInDetailCodeList(academyId, grpCdList);
		return res.json(response);
	}
}
export default new UserController();
