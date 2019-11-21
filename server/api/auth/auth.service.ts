import { hashSync, compareSync } from 'bcryptjs'
import { User } from '../../models/User';
import { sequelize } from '../../common/sequelize';
import { IResponse } from '../../models/IResponse';
import { Constant } from '../../config/Constant';

const userRepository = sequelize.getRepository(User);

export class AuthService {

  async signInByEmail(email: string, password: string): Promise<IResponse> {
    const user = await userRepository.findOne({
      attributes: ['userId', 'email', 'password', 'name', 'phoneNo', 'birthday', 'role', 'status'],
      where: { email, status: Constant.USER001 }
    });
    let message: string = ''
    let result: boolean = false
    if (user === null) {
      message = 'Empty User'
    } else {
      result = compareSync(password, user.password);
      if (result) {
        message = 'Success'
        user.password = null
      } else {
        message = 'Invalid Password'
      }
    }
    const response: IResponse = {
      result,
      message,
      model: result ? user : null
    }
    return response;
  }

  async signInByTokenEmail(userId: string): Promise<IResponse> {
    const user = await userRepository.findOne({
      attributes: ['userId', 'email', 'name', 'phoneNo', 'birthday', 'role', 'status'],
      where: { userId }
    });
    let message: string = ''
    let result: boolean = false
    if (user === null) {
      message = 'Empty User'
    } else if (user.status !== Constant.USER001) {
      message = 'Drop User'
    } else {
      result = true
      message = 'Success'
    }
    const response: IResponse = {
      result,
      message,
      model: result ? user : null
    }
    return response;
  }

}

export default new AuthService();