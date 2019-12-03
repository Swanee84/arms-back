import express from 'express';
import userController from './user.controller'
import jwtauth from '../../common/jwtauth'

export default express.Router()
  .post('/selUserList', jwtauth)
  .post('/selUserList', userController.selUserList)
  .post('/insUser', jwtauth)
  .post('/insUser', userController.insUser)
  .post('/updUser', jwtauth)
  .post('/updUser', userController.updUser)
  .post('/delUser', jwtauth)
  .post('/delUser', userController.delUser)
  .post('/selUserDetail', jwtauth)
  .post('/selUserDetail', userController.selUserDetail)