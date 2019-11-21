import { BelongsToMany, Column, CreatedAt, Model, Scopes, Table, UpdatedAt, DataType, PrimaryKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BaseInterface } from './BaseInterface';

@Table({ modelName: 'USER', underscored: true, freezeTableName: true })
export class User extends BaseModel<User> implements BaseInterface {
  @PrimaryKey
  @Column
  userId!: number; // 사용자 계정

  @Column
  email!: string; // 이메일

  @Column
  password?: string; // 비밀번호

  @Column
  name!: string; // 이름
  
  @Column
  phoneNo?: string; // 휴대폰 번호
  
  @Column
  birthday?: Date; // 생일
  
  @Column
  role!: string; // 권한

}