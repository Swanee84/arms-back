import AdminService from './admin.service';

import { Request, Response } from 'express';
import { IResponse } from '../../models/IResponse';
import { Constant } from '../../config/Constant';

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
    return res.json()
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
