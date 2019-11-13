import express from 'express';
import authController from './auth.controller'

export default express.Router()
    .post('/autn/login', authController.create)
    .get('/auth/', authController.all)
    .get('/auth/:id', authController.byId);