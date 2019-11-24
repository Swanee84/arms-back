import { hashSync, compareSync } from 'bcryptjs'
import { User } from '../../models/User';
import { sequelize } from '../../common/sequelize';
import { IResponse } from '../../models/IResponse';
import { Constant } from '../../config/Constant';
import { err } from 'pino-std-serializers';

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
      message = '없는 사용자입니다.'
    } else {
      result = compareSync(password, user.password);
      if (result) {
        message = '성공'
        user.password = null
      } else {
        message = '비밀번호 틀림'
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
      message = '없는 사용자'
    } else if (user.status !== Constant.USER001) {
      message = '탈퇴된 사용자'
    } else {
      result = true
      message = '성공'
    }
    const response: IResponse = {
      result,
      message,
      model: result ? user : null
    }
    return response;
  }

  insertSignInLog(user: User, type: number): void {
    try {
      sequelize.query(`INSERT INTO SIGNIN_LOG (ACADEMY_ID, BRANCH_ID, USER_ID, TYPE, SIGNIN_DATE, SIGNIN_TIME) VALUES (null, null, ${user.userId}, ${type}), CURDATE(), CURTIME()`)
    } catch(err) {
      console.log(err)
    }
  }

}

export default new AuthService();