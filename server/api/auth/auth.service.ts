import { hashSync, compareSync } from 'bcryptjs'
import { User, UserBranch } from '../../models/User';
import { sequelize } from '../../common/sequelize';
import { IResponse } from '../../models/IResponse';
import { Constant, RoleConst } from '../../config/Constant';
import { err } from 'pino-std-serializers';
import { Academy } from '../../models/Academy';
import { Branch } from '../../models/Branch';

const userRepository = sequelize.getRepository(User);

class AuthService {
  async signInByEmail(email: string, password: string): Promise<IResponse> {
    const user: User = await userRepository.findOne({
      attributes: ['userId', 'email', 'password', 'name', 'phoneNo', 'birthday', 'role', 'status'],
      where: { email, status: Constant.USER_NORMAL },
    }).catch(Constant.returnDbErrorResponse);

    let message: string = '';
    let result: boolean = false;
    if (user === null) {
      message = '없는 사용자입니다.';
    } else {
      result = compareSync(password, user.password);
      if (result) {
        message = '성공';
        delete user.password;
      } else {
        message = '비밀번호 틀림';
      }
    }
    const menuArray = MenuInfo.getMenuArray(user.role);

    const response: IResponse = {
      result,
      message,
      model: result ? user : null,
      jsonData: menuArray
    };
    return response;
  }

  async getUserBranchList(user: User): Promise<User> {
    const branchList = await UserBranch.findAll({
      attributes: ['academyId', 'branchId', 'status'],
      where: { userId: user.userId },
      include: [{
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
    user.userBranchList = branchList
    user.setDataValue('userBranchList', branchList)
    return user
  }

  async signInByTokenEmail(userId: string): Promise<IResponse> {
    const user: User = await userRepository.findOne({
      attributes: ['userId', 'email', 'name', 'phoneNo', 'birthday', 'role', 'status'],
      where: { userId }
    }).catch(Constant.returnDbErrorResponse);

    let message: string = ''
    let result: boolean = false
    if (user === null) {
      message = '없는 사용자'
    } else if (user.status !== Constant.USER_NORMAL) {
      message = '탈퇴된 사용자'
    } else {
      result = true
      message = '성공'
    }
    const menuArray = MenuInfo.getMenuArray(user.role);

    const response: IResponse = {
      result,
      message,
      model: result ? user : null,
      jsonData: menuArray
    }
    return response;
  }

  insertSignInLog(user: User, type: number, academyId?: number, branchId?: number): void {
    try {
      sequelize.query(`INSERT INTO SIGNIN_LOG (ACADEMY_ID, BRANCH_ID, USER_ID, TYPE, SIGNIN_DATE, SIGNIN_TIME) VALUES (${academyId}, ${branchId}, ${user.userId}, ${type}, CURDATE(), CURTIME())`)
    } catch(err) {
      console.log('ERROR-insertSignInLog', err)
    }
  }

}

export default new AuthService();


class MenuInfo {
  static readonly branchDirector = [
    {
      text: '사용자 관리',
      model: false,
      children: [
        { text: '수강생 관리', toRoute: '/user/student' },
        { text: '강사 관리', toRoute: '/user/teacher' },
      ],
    },
    { text: '지점 관리', toRoute: '/branch' },
  ]
  
  static readonly academyDirector = [
    {
      text: '사용자 관리',
      model: false,
      children: [
        { text: '수강생 관리', toRoute: '/user/student' },
        { text: '강사 관리', toRoute: '/user/teacher' },
        { text: '지점원장 관리', toRoute: '/user/director' },
      ],
    },
    { text: '학원 관리', toRoute: '/academy' },
  ]

  static readonly adminDirector = [
    {
      text: '사용자 관리',
      model: false,
      children: [
        { text: '수강생 관리', toRoute: '/user/student' },
        { text: '강사 관리', toRoute: '/user/teacher' },
        { text: '지점 원장 관리', toRoute: '/user/director' },
        { text: '학원 원장 관리', toRoute: '/user/president' },
      ],
    },
    { text: '코드 관리', toRoute: '/code' },
  ]

  static readonly commonDriector = [
    // { text: '사용자 관리', toRoute: '/user' },
    {
      text: '수업 관리',
      model: false,
      children: [
        { text: '수강생 등록 관리', toRoute: '/course' },
        { text: '수업 정보 관리', toRoute: '/lesson' },
        { text: '수업 오픈', toRoute: '/lesson_open' },
        { text: '수업 기본 설정', toRoute: '/lesson_schema' },
      ],
    },
  ]

  static readonly teacher = [
    { text: '지난 수업 이력', toRoute: '/lesson_history' },
    { text: '수업 조회', toRoute: '/lesson_teacher' },
    { text: '내 정보 관리', toRoute: '/myinfo' },
  ]

  static readonly student = [
    { text: '지난 수업 이력', toRoute: '/lesson_history' },
    { text: '수업 조회', toRoute: '/lesson' },
    { text: '내 정보 관리', toRoute: '/myinfo' },
  ]

  public static getMenuArray(userRole: string): any {
    let menuArray = [];
    if (userRole === RoleConst.ADMIN || userRole === RoleConst.PRESIDENT || userRole === RoleConst.DIRECTOR) {
      menuArray = menuArray.concat(MenuInfo.commonDriector);
      if (userRole === RoleConst.ADMIN) {
        menuArray = menuArray.concat(MenuInfo.adminDirector);
      } else if (userRole === RoleConst.PRESIDENT) {
        menuArray = menuArray.concat(MenuInfo.academyDirector);
      } else if (userRole === RoleConst.DIRECTOR) {
        menuArray = menuArray.concat(MenuInfo.branchDirector);
      }
    } else if (userRole === RoleConst.TEACHER) {
      menuArray = menuArray.concat(MenuInfo.teacher);
    } else if (userRole === RoleConst.STUDENT) {
      menuArray = menuArray.concat(MenuInfo.student);
    }
    return menuArray
  }
}