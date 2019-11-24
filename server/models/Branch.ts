import { BelongsToMany, Column, Scopes, Table, DataType, PrimaryKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BaseInterface } from './BaseInterface';

@Table({ modelName: 'BRANCH', underscored: true, freezeTableName: true })
export class Branch extends BaseModel<Branch> implements BaseInterface {
  @PrimaryKey
  @Column
  branchId!: number; // 지점 계정

  @Column
  academyId!: number; // 학원 계정

  @Column
  name!: string; // 이름
  
  @Column
  userId!: number; // 지점 원장 사용자 계정

  @Column
  incorporation?: Date; // 설립일

  @Column
  address?: string; // 주소

}