import { sequelize } from '../../common/sequelize';
import { IResponse } from '../../models/IResponse';
import { Constant } from '../../config/Constant';
import { User } from '../../models/User';
import { Academy } from '../../models/Academy';
import { Branch } from '../../models/Branch';

const userRepository = sequelize.getRepository(User);
const academyRepository = sequelize.getRepository(Academy);
const branchRepository = sequelize.getRepository(Branch);

export class AdminService {
  async selAcademyList(): Promise<IResponse> {
    const response: IResponse = {
      result: true,
      message: '',
    }
    return response;
  }

  async insAcademy(): Promise<IResponse> {
    const response: IResponse = {
      result: true,
      message: '',
    }
    return response;
  }

  async updAcademy(): Promise<IResponse> {
    const response: IResponse = {
      result: true,
      message: '',
    }
    return response;
  }

  async delAcademy(): Promise<IResponse> {
    const response: IResponse = {
      result: true,
      message: '',
    }
    return response;
  }

  async selBranchList(): Promise<IResponse> {
    const response: IResponse = {
      result: true,
      message: '',
    }
    return response;
  }

  async insBranch(): Promise<IResponse> {
    const response: IResponse = {
      result: true,
      message: '',
    }
    return response;
  }

  async updBranch(): Promise<IResponse> {
    const response: IResponse = {
      result: true,
      message: '',
    }
    return response;
  }

  async delBranch(): Promise<IResponse> {
    const response: IResponse = {
      result: true,
      message: '',
    }
    return response;
  }

}

export default new AdminService();