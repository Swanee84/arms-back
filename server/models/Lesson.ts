import { BelongsToMany, Column, Scopes, Table, DataType, PrimaryKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BaseInterface } from './BaseInterface';

@Table({ modelName: 'LESSON', underscored: true, freezeTableName: true })
export class Lesson extends BaseModel<Lesson> implements BaseInterface {
  @PrimaryKey
  @Column
  lessonId!: number; // 수업 계정

  @Column
  branchId!: number; // 지점 계정

  @Column
  lessonDate!: Date; // 수업 일

  @Column
  lessonStartTime!: Date; // 수업 시작 시간

  @Column
  lessonStartDt!: Date; // 수업 시작 일시

  @Column
  lessonEndTime!: Date; // 수업 종료 시간

  @Column
  place?: string; // 장소
  
}

@Table({ modelName: 'LESSON_MODIFY_REQUEST', underscored: true, freezeTableName: true })
export class LessonModifyRequest extends BaseModel<Lesson> implements BaseInterface {
  @PrimaryKey
  @Column
  lmrId!: number; // 수업 변경 요청 계정

  @Column
  branchId!: number; // 지점 계정

  @Column
  lessonId!: number; // 수업 계정

  @Column
  userId!: number; // 사용자 계정

  @Column
  targetLessonId?: number; // 변경할 수업 계정

  @Column
  type?: string; // 요청 종류 (취소, 변경 ...)
  
}

@Table({ modelName: 'LESSON_PICTURE', underscored: true, freezeTableName: true })
export class LessonPicture extends BaseModel<LessonPicture> implements BaseInterface {
  @PrimaryKey
  @Column
  lpId!: number; // 수업 그림 계정

  @Column
  lessonId!: number; // 수업 계정

  @Column
  branchId!: number; // 지점 계정

  @Column
  userId!: number; // 사용자 계정

  @Column
  completion?: number; // 완성도

}

@Table({ modelName: 'LESSON_RECORD', underscored: true, freezeTableName: true })
export class LessonRecord extends BaseModel<LessonRecord> implements BaseInterface {
  @PrimaryKey
  @Column
  lhId!: number; // 수업 그림 계정

  @Column
  branchId!: number; // 지점 계정

  @Column
  lessonId!: number; // 수업 계정

  @Column
  userId!: number; // 사용자 계정

  @Column
  lessonType?: string; // 수업 종류 (수채화, 아크릴, 유화, 펜드로잉...)

}

@Table({ modelName: 'LESSON_SCHEMA', underscored: true, freezeTableName: true })
export class LessonSchema extends BaseModel<LessonSchema> implements BaseInterface {
  @PrimaryKey
  @Column
  schemaId!: number; // 수업 스키마 계정

  @Column
  branchId!: number; // 지점 계정

  @Column
  dayOfWeek!: number; // 요일

  @Column
  lessonStartTime?: Date; // 수업 시작 시간

  @Column
  lessonEndTime?: Date; // 수업 종료 시간

}

@Table({ modelName: 'LESSON_SCHEMA_TEACHER', underscored: true, freezeTableName: true })
export class LessonSchemaTeacher extends BaseModel<LessonSchemaTeacher> implements BaseInterface {
  @PrimaryKey
  @Column
  lstId!: number; // 지점 계정

  @Column
  schemaId!: number; // 수업 스키마 계정

  @Column
  userId!: number; // 사용자 계정

}

@Table({ modelName: 'LESSON_TEACHER', underscored: true, freezeTableName: true })
export class LessonTeacher extends BaseModel<LessonTeacher> implements BaseInterface {
  @PrimaryKey
  @Column
  ltId!: number; // 수업 참여 선생님 계정

  @Column
  branchId!: number; // 지점 계정

  @Column
  lessonId!: number; // 수업 계정

  @Column
  userId!: number; // 선생님 계정

}
