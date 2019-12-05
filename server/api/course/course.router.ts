import express from 'express';
import courseController from './course.controller'
import jwtauth from '../../common/jwtauth'
import { RoleConst } from '../../config/Constant';

const grantedRole = [RoleConst.ADMIN, RoleConst.PRESIDENT, RoleConst.DIRECTOR];

export default express.Router()
  .post('/selCourseList', jwtauth(grantedRole))
  .post('/selCourseList', courseController.selCourseList)
  .post('/selUserCourseList', jwtauth(grantedRole))
  .post('/selUserCourseList', courseController.selUserCourseList)
  .post('/insCourse', jwtauth(grantedRole))
  .post('/insCourse', courseController.insCourse)
  .post('/updCourse', jwtauth(grantedRole))
  .post('/updCourse', courseController.updCourse)
  .post('/delCourse', jwtauth(grantedRole))
  .post('/delCourse', courseController.delCourse)