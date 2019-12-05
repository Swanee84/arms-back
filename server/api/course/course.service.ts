import { sequelize } from '../../common/sequelize';
import { IResponse } from '../../models/IResponse';
import { Constant } from '../../config/Constant';
import { User } from '../../models/User';
import { Course } from '../../models/Course';
import { LessonRecord, Lesson } from '../../models/Lesson';

export class CourseService {
  async selCourseList(academyId: number, branchId?: number): Promise<IResponse> {
    let whereObj: any = { academyId };
    if (branchId) {
      whereObj.branchId = branchId;
    }
    const courseList = await Course.findAll({
      attributes: ['startDate', 'endDate', 'courseAmount', 'courseType', 'discountAmount', 'maxHoldingCount', 'useHoldingCount', 'status', 'regDt', 'modDt'],
      where: whereObj,
    }).catch(Constant.returnDbErrorResponse);
    const response: IResponse = {
      result: courseList !== null,
      model: courseList,
    }
    return response;
  }

  async selUserCourseList(userId: number): Promise<IResponse> {
    const courseList = await Course.findAll({
      attributes: ['startDate', 'endDate', 'courseAmount', 'courseType', 'discountAmount', 'maxHoldingCount', 'useHoldingCount', 'status', 'regDt', 'modDt'],
      where: { userId },
    }).catch(Constant.returnDbErrorResponse);

    const lessonRecordList = await LessonRecord.findAll({
      attributes: ['courseId', 'lessonId', 'lessonType', 'status'],
      where: { userId: userId },
      include: [{
        attributes: ['lessonDate', 'lessonStartTime', 'lessonEndTime', 'place', 'status', 'regDt', 'modDt'],
        model: Lesson,
        required: true,
      }]
    }).catch(Constant.returnDbErrorResponse);

    for (const course of courseList) {
      const findArray: LessonRecord[] = lessonRecordList.filter(item => item.courseId === course.courseId);
      course.lessonRecordList = findArray;
    }

    const response: IResponse = {
      result: true,
      model: courseList,
    };
    return response;
  }

  async insCourse(course: Course): Promise<IResponse> {
    const newItem = await Course.create(course).catch(Constant.returnDbErrorResponse);
    const response: IResponse = {
      result: newItem !== null,
      message: newItem !== null ? '등록 성공' : 'Insert Course ERROR',
    };
    return response;
  }

  async updCourse(course: Course): Promise<IResponse> {
    const courseId = course.courseId;
    delete course.courseId;
    const result = await Course.update(course, { where: { courseId }}).catch(Constant.returnDbErrorResponse);
    const response: IResponse = {
      result: result !== null,
    };
    return response;
  }

  async delCourse(courseId: number): Promise<IResponse> {
    const result = await Course.destroy({ where: { courseId }}).catch(Constant.returnDbErrorResponse);
    const response: IResponse = {
      result: result !== null,
    }
    return response;
  }

}

export default new CourseService();