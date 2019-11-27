import { hashSync } from 'bcryptjs'
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
    const { academyId, branchId } = req.body;
    const user: User = req.decodedUser;
    if (!academyId) {
      return res.json({ result: false, status: 400, code: 'academyId', message: 'Empty Parameter' });
    }
    if (!branchId && user.role != RoleConst.ACADEMY && user.role != RoleConst.ADMIN) {
      return res.json({ result: false, status: 403, code: 'role', message: '전체 조회 권한 없음' });
    }
    const response: IResponse = await UserService.selUserList(academyId, branchId, 'TEACHER');
    return res.json(response);
  }

  async selUserDetail(req: Request, res: Response): Promise<Response> {
    const userId = req.body.userId;
    if (!userId) {
      return res.json({ result: false, status: 400, code: 'userId', message: 'Empty Parameter' });
    }
    const response: IResponse = await UserService.selUserDetail(userId);
    return res.json(response);
  }

  async insUser(req: Request, res: Response): Promise<Response> {
    const user: User = req.body.user;
    let password = user.password;
    if (!password) {
      return res.json({ result: false, status: 400, code: 'password', message: 'Empty Parameter' });
    } else {
      user.password = hashSync(password, 8);
    }
    if (!user.email) {
      return res.json({ result: false, status: 400, code: 'email', message: 'Empty Parameter' });
    }
    if (!user.name) {
      return res.json({ result: false, status: 400, code: 'name', message: 'Empty Parameter' });
    }
    if (!user.role) {
      return res.json({ result: false, status: 400, code: 'role', message: 'Empty Parameter' });
    }
    const response: IResponse = await UserService.insUser(user);
    return res.json(response);
  }

  async updUser(req: Request, res: Response): Promise<Response> {
    const user: User = req.body.user;
    const userId = user.userId;
    if (!userId) {
      return res.json({ result: false, status: 400, code: 'userId', message: 'Empty Parameter' });
    }
    if (user.password) {
      user.password = hashSync(user.password, 8);
    }
    const response: IResponse = await UserService.updUser(user);
    return res.json(response);
  }

  async delUser(req: Request, res: Response): Promise<Response> {
    const user: User = req.body.user;
    const physicalDelete: boolean = req.body.physicalDelete;
    const userId = user.userId;
    if (!userId) {
      return res.json({ result: false, status: 400, code: 'userId', message: 'Empty Parameter' });
    }
    if (physicalDelete) {
      const response: IResponse = await UserService.delUser(userId);
      return res.json(response);
    } else {
      user.status = Constant.USER_DELETE;
      const response: IResponse = await UserService.updUser(user);
      return res.json(response);
    }
  }

}
export default new UserController();
