import { Sequelize } from 'sequelize-typescript';
import { Academy } from '../models/Academy';
import { Branch } from '../models/Branch';
import { User, UserBranch } from '../models/User';
import { environment } from '../config/environment';
import { Course, CourseHoldingHistory } from '../models/Course';
import { Lesson, LessonModifyRequest, LessonPicture, LessonRecord, LessonSchema, LessonSchemaTeacher, LessonTeacher } from '../models/Lesson';
import { CdGrp, CdDtl } from '../models/Code';

export const sequelize = new Sequelize(
  environment.mariadb.database, // 데이터베이스 이름
  environment.mariadb.username, // 유저 명
  environment.mariadb.password, // 비밀번호
  {
    dialect: 'mariadb',
    host: environment.mariadb.address, // 데이터베이스 호스트
    models: [Academy, Branch, User, UserBranch, Course, CourseHoldingHistory, Lesson, LessonModifyRequest, LessonPicture, LessonRecord, LessonSchema, LessonSchemaTeacher, LessonTeacher, CdGrp, CdDtl],
    // repositoryMode: true,
    define: {
      // timestamps: false
    }
  });
