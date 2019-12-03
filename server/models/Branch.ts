import { ForeignKey, Column, BelongsTo, Table, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BaseInterface } from './BaseInterface';
import { Academy } from './Academy';
import { User } from './User';

@Table({ modelName: 'BRANCH', underscored: true, freezeTableName: true })
export class Branch extends BaseModel<Branch> implements BaseInterface {
  @PrimaryKey
  @AutoIncrement
  @Column
  branchId!: number; // 지점 계정

  @ForeignKey(() => Academy)
  @Column
  academyId!: number; // 학원 계정

  @Column
  name!: string; // 이름
  
  @ForeignKey(() => User)
  @Column
  userId!: number; // 지점 원장 사용자 계정

  @Column
  incorporation?: Date; // 설립일

  @Column
  address?: string; // 주소

  @BelongsTo(() => Academy)
  academy: Academy;

  @BelongsTo(() => User)
  user: User;
  
}