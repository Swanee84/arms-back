import { hashSync, compareSync } from 'bcryptjs'
import { User } from '../../models/User';
import { sequelize } from '../../common/sequelize';
import { IResponse } from '../../models/IResponse';

const userRepository = sequelize.getRepository(User);

export class AuthService {

  async signInByEmail(email: string, password: string): Promise<IResponse> {
    const user = await userRepository.findOne({ where: { email }});
    let message: string = ''
    let result: boolean = false
    if (user === null) {
      message = '계정 없음'
    } else {
      result = compareSync(password, user.password);
      if (result) {
        message = '로그인 성공'
      } else {
        message = '비밀번호 오류'
      }
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