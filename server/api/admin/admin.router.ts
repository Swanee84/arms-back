import express from 'express';
import adminController from './admin.controller'
import jwtauth from '../../common/jwtauth'
import { RoleConst } from '../../config/Constant';

const grantedRole = [RoleConst.ADMIN, RoleConst.ACADEMY];

export default express.Router()
  .post('/selBranchList', jwtauth(grantedRole))
  .post('/selBranchList', adminController.selBranchList)
  .post('/insBranch', jwtauth(grantedRole))
  .post('/insBranch', adminController.insBranch)
  .post('/updBranch', jwtauth(grantedRole))
  .post('/updBranch', adminController.updBranch)
  .post('/delBranch', jwtauth(grantedRole))
  .post('/delBranch', adminController.delBranch)