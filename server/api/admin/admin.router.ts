import express from 'express';
import adminController from './admin.controller'
import jwtauth from '../../common/jwtauth'

export default express.Router()
  .post('/selBranchList', jwtauth)
  .post('/selBranchList', adminController.selBranchList)
  .post('/insBranch', jwtauth)
  .post('/insBranch', adminController.insBranch)
  .post('/updBranch', jwtauth)
  .post('/updBranch', adminController.updBranch)
  .post('/delBranch', jwtauth)
  .post('/delBranch', adminController.delBranch)