import express from 'express';
import codeController from './code.controller'
import jwtauth from '../../common/jwtauth'
import { RoleConst } from '../../config/Constant';

const grantedRole = [RoleConst.ADMIN, RoleConst.ACADEMY, RoleConst.BRANCH];

export default express.Router()
  .post('/selGroupCodeList', jwtauth())
  .post('/selGroupCodeList', codeController.selGroupCodeList)
  .post('/insGroupCode', jwtauth(grantedRole))
  .post('/insGroupCode', codeController.insGroupCode)
  .post('/updGroupCode', jwtauth(grantedRole))
  .post('/updGroupCode', codeController.updGroupCode)
  .post('/delGroupCode', jwtauth(grantedRole))
  .post('/delGroupCode', codeController.delGroupCode)
  .post('/selDetailCodeList', jwtauth())
  .post('/selDetailCodeList', codeController.selDetailCodeList)
  .post('/insDetailCode', jwtauth(grantedRole))
  .post('/insDetailCode', codeController.insDetailCode)
  .post('/updDetailCode', jwtauth(grantedRole))
  .post('/updDetailCode', codeController.updDetailCode)
  .post('/delDetailCode', jwtauth(grantedRole))
  .post('/delDetailCode', codeController.delDetailCode)
  .post('/updCodeOrdering', jwtauth(grantedRole))
  .post('/updCodeOrdering', codeController.updCodeOrdering)
  .post('/selAllDetailCodeList', jwtauth())
  .post('/selAllDetailCodeList', codeController.selAllDetailCodeList)
  .post('/selGroupCodeInDetailCodeList', jwtauth())
  .post('/selGroupCodeInDetailCodeList', codeController.selGroupCodeInDetailCodeList)