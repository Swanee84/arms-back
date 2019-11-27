import { User, UserBranch } from '../../models/User';
import { sequelize } from '../../common/sequelize';
import { Op } from 'sequelize';
import { IResponse } from '../../models/IResponse';
import { Constant, RoleConst } from '../../config/Constant';
import { Academy } from '../../models/Academy';
import { Branch } from '../../models/Branch';

class UserService {
  async selUserList(academyId: number, branchId?: number, role?: string): Promise<IResponse> {
    let whereObj: any = { academyId };
    if (branchId) {
      whereObj.branchId = branchId;
    }
    // const userList = await User.findAll({
    //   attributes: ['userId', 'email', 'name', 'phoneNo', 'birthday', 'role', 'regDt'],
    //   include: [{
    //     attributes: ['academyId', 'branchId'],
    //     model: UserBranch,
    //     where: whereObj,
    //     required: true,
    //   }]
    // })

    const userList = await UserBranch.findAll({
      attributes: [],
      where: whereObj,
      include: [{
        attributes: ['userId', 'email', 'name', 'phoneNo', 'birthday', 'role', 'regDt'],
        model: User,
        required: true,
      }, {
        attributes: ['academyId', 'name', 'address', 'status'],
        model: Academy,
        required: true,
      }, {
        attributes: ['branchId', 'name', 'address', 'status'],
        model: Branch,
        required: true,
      }
    ]
    })

    const response: IResponse = {
      result: true,
      model: userList,
    }
    return response;
  }

  async selUserDetail(userId: number): Promise<IResponse> {
    return null;
  }

  async updUser(user: User): Promise<IResponse> {
    return null;
  }

  async delUser(user: User): Promise<IResponse> {
    return null;
  }
}

export default new UserService();