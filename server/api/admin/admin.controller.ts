import AdminService from './admin.service';

import { Request, Response } from 'express';
import { IResponse } from '../../models/IResponse';
import { Constant, RoleConst } from '../../config/Constant';
import { User } from '../../models/User';

export class AdminController {
  async selAcademyList(req: Request, res: Response): Promise<Response> {
    return res.json()
  }

  async insAcademy(req: Request, res: Response): Promise<Response> {
    return res.json()
  }

  async updAcademy(req: Request, res: Response): Promise<Response> {
    return res.json()
  }

  async delAcademy(req: Request, res: Response): Promise<Response> {
    return res.json()
  }

  async selBranchList(req: Request, res: Response): Promise<Response> {
    const user: User = req.decodedUser;
    const { academyId } = req.body;
    if (!academyId) {
      return res.json({ result: false, status: 400, code: 'academyId', message: 'Empty Parameter' });
    }
    if (user.role != RoleConst.PRESIDENT && user.role != RoleConst.ADMIN) {
      return res.json({ result: false, status: 403, code: 'role', message: '조회 권한 없음' });
    }
    const response: IResponse = await AdminService.selBranchList(academyId);
    return res.json(response);
  }

  async insBranch(req: Request, res: Response): Promise<Response> {
    return res.json()
  }

  async updBranch(req: Request, res: Response): Promise<Response> {
    return res.json()
  }

  async delBranch(req: Request, res: Response): Promise<Response> {
    return res.json()
  }

}
export default new AdminController();
