import UserService from './user.service';
import { Request, Response } from 'express';
import { User } from '../../models/User';
import { IResponse } from '../../models/IResponse';
import { Constant, RoleConst } from '../../config/Constant';

class UserController {
  async selStudentList(req: Request, res: Response): Promise<Response> {
    const { academyId, branchId } = req.body;
    const user: User = req.decodedUser;
    if (!academyId) {
      return res.json({ result: false, status: 400, code: 'academyId', message: 'Empty Parameter' });
    }
    if (!branchId && user.role != RoleConst.ACADEMY && user.role != RoleConst.ADMIN) {
      return res.json({ result: false, status: 403, code: 'role', message: '전체 조회 권한 없음' });
    }
    const response: IResponse = await UserService.selUserList(academyId, branchId, 'STUDENT');
    return res.json(response);
  }

  async selTeacherList(req: Request, res: Response): Promise<Response> {
    const academyId = req.body.academyId;
    const branchId = req.body.branchId;
    const user: User = req.decodedUser;
    if (!branchId && (user.role != RoleConst.ACADEMY || user.role != RoleConst.ADMIN)) {
      return res.json({ result: false, status: 403, code: 'role', message: '전체 조회 권한 없음' });
    }
    const response: IResponse = await UserService.selUserList(academyId, branchId, 'TEACHER');
    return res.json(response);
  }

  async selUserDetail(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async updUser(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

  async delUser(req: Request, res: Response): Promise<Response> {
    return res.json();
  }

}
export default new UserController();
