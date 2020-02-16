import { HasMany, Column, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BaseInterface } from './BaseInterface';
import { Branch } from './Branch';

@Table({ modelName: 'ACADEMY', underscored: true, freezeTableName: true })
export class Academy extends BaseModel<Academy> implements BaseInterface {
	@PrimaryKey
	@AutoIncrement
	@Column
	academyId!: number; // 학원 계정

	@Column
	name!: string; // 이름

	@Column
	userId!: number; // 학원 원장 사용자 계정

	@Column
	address?: string; // 주소

	@Column
	corporateNo?: string; // 사업자 번호

	@HasMany(() => Branch)
	branchList: Branch[];
}
