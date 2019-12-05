import express from 'express';
import userController from './user.controller'
import jwtauth from '../../common/jwtauth'
import { RoleConst } from '../../config/Constant';

const grantedRole = [RoleConst.ADMIN, RoleConst.PRESIDENT, RoleConst.DIRECTOR];

export default express.Router()
  .post('/selUserList', jwtauth(grantedRole))
  .post('/selUserList', userController.selUserList)
  .post('/insUser', jwtauth(grantedRole))
  .post('/insUser', userController.insUser)
  .post('/updUser', jwtauth(grantedRole))
  .post('/updUser', userController.updUser)
  .post('/delUser', jwtauth([RoleConst.ADMIN, RoleConst.PRESIDENT]))
  .post('/delUser', userController.delUser)
  .post('/selUserDetail', jwtauth(grantedRole))
  .post('/selUserDetail', userController.selUserDetail)