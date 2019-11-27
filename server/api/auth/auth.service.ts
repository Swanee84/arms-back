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
    const user = await userRepository.findOne({
      attributes: ['userId', 'email', 'password', 'name', 'phoneNo', 'birthday', 'role', 'status'],
      where: { email, status: Constant.USER_NORMAL },
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
    let menuArray = [];
    const userRole = user.role;
    if (userRole === RoleConst.ADMIN) {
      menuArray = menuArray.concat(MenuInfo.branchDirector);
      menuArray = menuArray.concat(MenuInfo.commonDriector);
      menuArray = menuArray.concat(MenuInfo.academyDirector);
    } else if (userRole === RoleConst.BRANCH) {
      menuArray = menuArray.concat(MenuInfo.branchDirector);
      menuArray = menuArray.concat(MenuInfo.commonDriector);
    } else if (userRole === RoleConst.TEACHER) {
      menuArray = menuArray.concat(MenuInfo.teacher);
    } else if (userRole === RoleConst.STUDENT) {
      menuArray = menuArray.concat(MenuInfo.student);
    }

    const response: IResponse = {
      result,
      message,
      model: result ? user : null,
      jsonData: menuArray
    }
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
    const user = await userRepository.findOne({
      attributes: ['userId', 'email', 'name', 'phoneNo', 'birthday', 'role', 'status'],
      where: { userId }
    });
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
    const response: IResponse = {
      result,
      message,
      model: result ? user : null
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
  public static readonly branchDirector = [
    { icon: 'phone_callback', text: '지점 관리', toRoute: '/branch' },
  ]
  
  public static readonly academyDirector = [
    { icon: 'phone_callback', text: '학원 관리', toRoute: '/academy' },
    { icon: 'phone_callback', text: '코드 관리', toRoute: '/code' },
  ]

  public static readonly commonDriector = [
    {
      icon: 'assignment_turned_in',
      'icon-alt': 'assignment_turned_in',
      text: '사용자 관리',
      model: false,
      children: [
        { icon: 'person', text: '수강생 관리', toRoute: '/user' },
        { icon: 'face', text: '강사 관리', toRoute: '/teacher' },
      ],
    },
    {
      icon: 'assignment_turned_in',
      'icon-alt': 'assignment_turned_in',
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

  public static readonly teacher = [
    { icon: 'phone_callback', text: '지난 수업 이력', toRoute: '/lesson_history' },
    { icon: 'phone_callback', text: '수업 조회', toRoute: '/lesson_teacher' },
    { icon: 'phone_callback', text: '내 정보 관리', toRoute: '/myinfo' },
  ]

  public static readonly student = [
    { icon: 'phone_callback', text: '지난 수업 이력', toRoute: '/lesson_history' },
    { icon: 'phone_callback', text: '수업 조회', toRoute: '/lesson' },
    { icon: 'phone_callback', text: '내 정보 관리', toRoute: '/myinfo' },
  ]
}