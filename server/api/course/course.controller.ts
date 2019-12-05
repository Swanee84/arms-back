import CourseService from './course.service';

import { Request, Response } from 'express';
import { IResponse } from '../../models/IResponse';
import { Constant, RoleConst } from '../../config/Constant';
import { Course } from '../../models/Course';
import { User } from '../../models/User';

export class CourseController {
  async selCourseList(req: Request, res: Response): Promise<Response> {
    const { academyId, branchId } = req.body;
    const user: User = req.decodedUser;
    if (!academyId) {
      return res.json({ result: false, status: 400, code: 'academyId', message: 'Empty Parameter' });
    }
    if (!branchId && user.role != RoleConst.PRESIDENT && user.role != RoleConst.ADMIN) {
      return res.json({ result: false, status: 403, code: 'role', message: '전체 조회 권한 없음' });
    }
    const response: IResponse = await CourseService.selCourseList(academyId, branchId);
    return res.json(response);
  }

  async selUserCourseList(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    if (!userId) {
      return res.json({ result: false, status: 400, code: 'userId', message: 'Empty Parameter' });
    }
    const response: IResponse = await CourseService.selUserCourseList(userId);
    return res.json(response);
  }

  async insCourse(req: Request, res: Response): Promise<Response> {
    const course: Course = req.body.course;

    if (!course.academyId) {
      return res.json({ result: false, status: 400, code: 'academyId', message: 'Empty Parameter' });
    }
    if (!course.branchId) {
      return res.json({ result: false, status: 400, code: 'branchId', message: 'Empty Parameter' });
    }
    if (!course.userId) {
      return res.json({ result: false, status: 400, code: 'userId', message: 'Empty Parameter' });
    }
    if (!course.startDate) {
      return res.json({ result: false, status: 400, code: 'startDate', message: 'Empty Parameter' });
    }
    if (!course.endDate) {
      return res.json({ result: false, status: 400, code: 'endDate', message: 'Empty Parameter' });
    }
    const response: IResponse = await CourseService.insCourse(course);
    return res.json(response);
  }

  async updCourse(req: Request, res: Response): Promise<Response> {
    const course: Course = req.body.course;
    const courseId = course.courseId;
    if (!courseId) {
      return res.json({ result: false, status: 400, code: 'courseId', message: 'Empty Parameter' });
    }
    const response: IResponse = await CourseService.updCourse(course);
    return res.json(response);
  }

  async delCourse(req: Request, res: Response): Promise<Response> {
    const course: Course = req.body.course;
    const physicalDelete: boolean = req.body.physicalDelete;
    const courseId = course.courseId;
    if (!courseId) {
      return res.json({ result: false, status: 400, code: 'courseId', message: 'Empty Parameter' });
    }
    if (physicalDelete) {
      const response: IResponse = await CourseService.delCourse(course.courseId);
      return res.json(response);
    } else {
      course.status = Constant.USER_DELETE;
      const response: IResponse = await CourseService.updCourse(course);
      return res.json(response);
    }
  }
}

export default new CourseController();
