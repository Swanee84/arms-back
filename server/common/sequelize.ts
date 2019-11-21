import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { environment } from '../config/environment';

export const sequelize = new Sequelize(
  environment.mariadb.database, // 데이터베이스 이름
  environment.mariadb.username, // 유저 명
  environment.mariadb.password, // 비밀번호
  {
    dialect: 'mariadb',
    host: environment.mariadb.address, // 데이터베이스 호스트
    port: 3307,
    models: [User],
    repositoryMode: true,
    define: {
      // timestamps: false
    }
  });
