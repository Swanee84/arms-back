import express from 'express';
import authController from './auth.controller'

export default express.Router()
    .post('/signIn', authController.signIn)