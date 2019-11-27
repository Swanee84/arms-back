import CodeService from './code.service';
import { Request, Response } from 'express';
import { IResponse } from '../../models/IResponse';
import { Constant, RoleConst } from '../../config/Constant';

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
    const response: IResponse = await CodeService.insGroupCode();
    return res.json(response);
  }

  async updGroupCode(req: Request, res: Response): Promise<Response> {
    const response: IResponse = await CodeService.updGroupCode();
    return res.json(response);
  }

  async delGroupCode(req: Request, res: Response): Promise<Response> {
    const response: IResponse = await CodeService.delGroupCode();
    return res.json(response);
  }

  async selDetailCodeList(req: Request, res: Response): Promise<Response> {
    const response: IResponse = await CodeService.selDetailCodeList();
    return res.json(response);
  }

  async insDetailCode(req: Request, res: Response): Promise<Response> {
    const response: IResponse = await CodeService.insDetailCode();
    return res.json(response);
  }

  async updDetailCode(req: Request, res: Response): Promise<Response> {
    const response: IResponse = await CodeService.updDetailCode();
    return res.json(response);
  }

  async delDetailCode(req: Request, res: Response): Promise<Response> {
    const response: IResponse = await CodeService.delDetailCode();
    return res.json(response);
  }

  async updCodeOrdering(req: Request, res: Response): Promise<Response> {
    const response: IResponse = await CodeService.updCodeOrdering();
    return res.json(response);
  }

  async selAllDetailCodeList(req: Request, res: Response): Promise<Response> {
    const response: IResponse = await CodeService.selAllDetailCodeList();
    return res.json(response);
  }

  async selGroupCodeInDetailCodeList(req: Request, res: Response): Promise<Response> {
    const response: IResponse = await CodeService.selGroupCodeInDetailCodeList();
    return res.json(response);
  }
}
export default new UserController();
