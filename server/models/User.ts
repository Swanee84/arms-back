import { BelongsTo, Column, Scopes, Table, ForeignKey, PrimaryKey, HasOne, HasMany} from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BaseInterface } from './BaseInterface';
import { Academy } from './Academy';
import { Branch } from './Branch';

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

  @HasMany(() => UserBranch)
  userBranchList: UserBranch[];
}

@Table({ modelName: 'USER_BRANCH', underscored: true, freezeTableName: true })
export class UserBranch extends BaseModel<UserBranch> implements BaseInterface {
  @PrimaryKey
  @Column
  ubId!: number; // 사용자 지점 계정

  @ForeignKey(() => User)
  @Column
  userId!: number; // 사용자 계정

  @ForeignKey(() => Academy)
  @Column
  academyId!: number; // 학원 계정

  @ForeignKey(() => Branch)
  @Column
  branchId!: number; // 지점 계정

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Academy)
  academy: Academy;

  @BelongsTo(() => Branch)
  branch: Branch;
}
