import { IResponse } from '../../models/IResponse';
import { Constant, RoleConst } from '../../config/Constant';
import { Academy } from '../../models/Academy';
import { Branch } from '../../models/Branch';
import { User, UserBranch } from '../../models/User';
import { Course, CourseHoldingHistory } from '../../models/Course';
import { LessonRecord, Lesson, LessonTeacher } from '../../models/Lesson';
import { Op } from 'sequelize';

class UserService {
  async selUserList(academyId: number, branchId?: number, role?: string, email?: string, name?: string, phoneNo?: string): Promise<IResponse> {
    let whereObj: any = { academyId };
    if (branchId) {
      whereObj.branchId = branchId;
    }
    let userWhereObj: any = {};
    if (role) {
      userWhereObj.role = role;
    }
    if (email) {
      userWhereObj.email = {[Op.like]: '%' + email + '%'};
    }
    if (name) {
      userWhereObj.name = {[Op.like]: '%' + name + '%'};
    }
    if (phoneNo) {
      userWhereObj.phoneNo = {[Op.like]: '%' + phoneNo + '%'};
    }
    const userList = await UserBranch.findAll({
      attributes: [],
      where: whereObj,
      include: [{
        attributes: ['userId', 'email', 'name', 'phoneNo', 'birthday', 'role', 'status', 'regDt'],
        model: User,
        where: userWhereObj,
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
    const user = await User.findOne({
      attributes: ['userId', 'email', 'name', 'phoneNo', 'birthday', 'role', 'status', 'regDt', 'modDt'],
      where: { userId: userId },
    });
    const role = user.role;
    if (role === RoleConst.STUDENT) { // 수강생이면
      const courseList = await Course.findAll({
        attributes: ['startDate', 'endDate', 'courseAmount', 'courseType', 'discountAmount', 'maxHoldingCount', 'useHoldingCount', 'status', 'regDt', 'modDt'],
        where: { userId: userId },
        include: [{
          attributes: ['startDate', 'endDate', 'status', 'regDt', 'modDt'],
          model: CourseHoldingHistory,
          required: true,
          where: { userId: userId },
        }]
      })
      user.courseList = courseList;
      user.setDataValue('courseList', courseList);

      const lessonRecordList = await LessonRecord.findAll({
        attributes: ['lessonId', 'lessonType', 'status'],
        where: { userId: userId },
        include: [{
          attributes: ['lessonDate', 'lessonStartTime', 'lessonEndTime', 'place', 'status', 'regDt', 'modDt'],
          model: Lesson,
          required: true,
        }]
      })
      user.lessonRecordList = lessonRecordList;
      user.setDataValue('lessonRecordList', lessonRecordList);
    } else if (role === RoleConst.TEACHER || role === RoleConst.BRANCH || role === RoleConst.ACADEMY) { // 선생님이면
      const lessonTeacherList = await LessonTeacher.findAll({
        attributes: ['lessonId', 'branchId', 'status'],
        where: { userId: userId },
        include: [{
          attributes: ['lessonDate', 'lessonStartTime', 'lessonEndTime', 'place', 'status', 'regDt', 'modDt'],
          model: Lesson,
          required: true,
        }]
      })
      user.lessonTeacherList = lessonTeacherList;
      user.setDataValue('lessonTeacherList', lessonTeacherList);
    }
    const response: IResponse = {
      result: user !== null,
      model: user,
    }
    return response;
  }

  async insUser(user: User): Promise<IResponse> {
    const newUser = await User.create(user).catch(error => {
        console.log("insertUser: \n" + error)
    })
    const response: IResponse = {
      result: newUser !== null,
      jsonData: newUser,
    }
    return response;
  }

  async updUser(user: User): Promise<IResponse> {
    await User.update(user, { where: { userId: user.userId }}).catch(error => {
        console.log("insertUser: \n" + error)
    })
    const response: IResponse = {
      result: true,
    }
    return response;
  }

  async delUser(userId: number): Promise<IResponse> {
    await User.destroy({ where: { userId }})
    const response: IResponse = {
      result: true,
    }
    return response;
  }
}

export default new UserService();