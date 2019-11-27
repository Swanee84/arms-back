import express from 'express';
import userController from './user.controller'
import jwtauth from '../../common/jwtauth'

export default express.Router()
  .post('/selStudentList', jwtauth)
  .post('/selStudentList', userController.selStudentList)
  .post('/selTeacherList', jwtauth)
  .post('/selTeacherList', userController.selTeacherList)
  .post('/updUser', jwtauth)
  .post('/updUser', userController.updUser)
  .post('/delUser', jwtauth)
  .post('/delUser', userController.delUser)
  .post('/selUserDetail', jwtauth)
  .post('/selUserDetail', userController.selUserDetail)