import { BelongsToMany, Column, Scopes, Table, DataType, PrimaryKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BaseInterface } from './BaseInterface';

@Table({ modelName: 'COURSE', underscored: true, freezeTableName: true })
export class Course extends BaseModel<Course> implements BaseInterface {
  @PrimaryKey
  @Column
  courseId!: number; // 지점 계정

  @Column
  branchId!: number; // 지점 계정
  
  @Column
  userId!: number; // 수강생 사용자 계정

  @Column
  startDate!: Date; // 수강 시작일

  @Column
  endDate!: Date; // 수강 종료일

  @Column
  courseAmount?: number; // 수강 금액

  @Column
  courseType?: string; // 수강 종류 (수채화, 아크릴, 유화, 소묘, 펜드로잉...)
  
  @Column
  discountAmount?: number; // 할인 금액

  @Column
  maxHoldingCount?: number; // 최대 홀딩 횟수

  @Column
  useHoldingCount?: number; // 사용 홀딩 횟수

}

@Table({ modelName: 'COURSE_HOLDING_HISTORY', underscored: true, freezeTableName: true })
export class CourseHoldingHistory extends BaseModel<Course> implements BaseInterface {
  @PrimaryKey
  @Column
  chhId!: number; // 수강 홀딩 계정

  @Column
  courseId!: number; // 수강 계정

  @Column
  userId!: number; // 수강생 사용자 계정

  @Column
  branchId!: number; // 지점 계정
  
  @Column
  startDate!: Date; // 홀딩 시작 일

  @Column
  endDate!: Date; // 홀딩 종료 일

}