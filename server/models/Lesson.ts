import { ForeignKey, Column, BelongsTo, Table, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BaseInterface } from './BaseInterface';
import { Branch } from './Branch';
import { User } from './User';
import { Course } from './Course';

@Table({ modelName: 'LESSON', underscored: true, freezeTableName: true })
export class Lesson extends BaseModel<Lesson> implements BaseInterface {
	@PrimaryKey
	@AutoIncrement
	@Column
	lessonId!: number; // 수업 계정

	@ForeignKey(() => Branch)
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

	@BelongsTo(() => Branch)
	branch: Branch;

	@HasMany(() => LessonRecord)
	lessonRecordList: LessonRecord[];

	@HasMany(() => LessonPicture)
	lessonPictureList: LessonPicture[];
}

@Table({ modelName: 'LESSON_MODIFY_REQUEST', underscored: true, freezeTableName: true })
export class LessonModifyRequest extends BaseModel<Lesson> implements BaseInterface {
	@PrimaryKey
	@AutoIncrement
	@Column
	lmrId!: number; // 수업 변경 요청 계정

	@ForeignKey(() => Branch)
	@Column
	branchId!: number; // 지점 계정

	@ForeignKey(() => Lesson)
	@Column
	lessonId!: number; // 수업 계정

	@ForeignKey(() => User)
	@Column
	userId!: number; // 사용자 계정

	@Column
	targetLessonId?: number; // 변경할 수업 계정

	@Column
	type?: string; // 요청 종류 (취소, 변경 ...)

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Lesson)
	lesson: Lesson;

	@BelongsTo(() => Branch)
	branch: Branch;
}

@Table({ modelName: 'LESSON_PICTURE', underscored: true, freezeTableName: true })
export class LessonPicture extends BaseModel<LessonPicture> implements BaseInterface {
	@PrimaryKey
	@AutoIncrement
	@Column
	lpId!: number; // 수업 그림 계정

	@ForeignKey(() => Lesson)
	@Column
	lessonId!: number; // 수업 계정

	@ForeignKey(() => Branch)
	@Column
	branchId!: number; // 지점 계정

	@ForeignKey(() => User)
	@Column
	userId!: number; // 사용자 계정

	@Column
	completion?: number; // 완성도

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Branch)
	branch: Branch;

	@BelongsTo(() => Lesson)
	lesson: Lesson;
}

@Table({ modelName: 'LESSON_RECORD', underscored: true, freezeTableName: true })
export class LessonRecord extends BaseModel<LessonRecord> implements BaseInterface {
	@PrimaryKey
	@AutoIncrement
	@Column
	lrId!: number; // 수업 그림 계정

	@ForeignKey(() => Branch)
	@Column
	branchId!: number; // 지점 계정

	@ForeignKey(() => Course)
	@Column
	courseId!: number; // 수강 계정

	@ForeignKey(() => Lesson)
	@Column
	lessonId!: number; // 수업 계정

	@ForeignKey(() => User)
	@Column
	userId!: number; // 사용자 계정

	@Column
	lessonType?: string; // 수업 종류 (수채화, 아크릴, 유화, 펜드로잉...)

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Branch)
	branch: Branch;

	@BelongsTo(() => Lesson)
	lesson: Lesson;
}

@Table({ modelName: 'LESSON_SCHEMA', underscored: true, freezeTableName: true })
export class LessonSchema extends BaseModel<LessonSchema> implements BaseInterface {
	@PrimaryKey
	@AutoIncrement
	@Column
	schemaId!: number; // 수업 스키마 계정

	@ForeignKey(() => Branch)
	@Column
	branchId!: number; // 지점 계정

	@Column
	dayOfWeek!: number; // 요일

	@Column
	lessonStartTime?: Date; // 수업 시작 시간

	@Column
	lessonEndTime?: Date; // 수업 종료 시간

	@BelongsTo(() => Branch)
	branch: Branch;

	@HasMany(() => LessonSchemaTeacher)
	lessonSchemaTeacherList: LessonSchemaTeacher[];
}

@Table({ modelName: 'LESSON_SCHEMA_TEACHER', underscored: true, freezeTableName: true })
export class LessonSchemaTeacher extends BaseModel<LessonSchemaTeacher> implements BaseInterface {
	@PrimaryKey
	@AutoIncrement
	@Column
	lstId!: number; // 지점 계정

	@ForeignKey(() => LessonSchema)
	@Column
	schemaId!: number; // 수업 스키마 계정

	@ForeignKey(() => User)
	@Column
	userId!: number; // 사용자 계정

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => LessonSchema)
	lessonSchema: LessonSchema;
}

@Table({ modelName: 'LESSON_TEACHER', underscored: true, freezeTableName: true })
export class LessonTeacher extends BaseModel<LessonTeacher> implements BaseInterface {
	@PrimaryKey
	@AutoIncrement
	@Column
	ltId!: number; // 수업 참여 선생님 계정

	@ForeignKey(() => Branch)
	@Column
	branchId!: number; // 지점 계정

	@ForeignKey(() => Lesson)
	@Column
	lessonId!: number; // 수업 계정

	@ForeignKey(() => User)
	@Column
	userId!: number; // 선생님 계정

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Branch)
	branch: Branch;

	@BelongsTo(() => Lesson)
	lesson: Lesson;
}
