import { BelongsToMany, Column, Scopes, Table, DataType, PrimaryKey } from 'sequelize-typescript';
import { BaseModel } from './BaseModel';
import { BaseInterface } from './BaseInterface';

@Table({ modelName: 'CD_GRP', underscored: true, freezeTableName: true })
export class CdGrp extends BaseModel<CdGrp> implements BaseInterface {
  @PrimaryKey
  @Column
  grpId!: number; // 그룹 코드 계정

  @Column
  academyId!: number; // 학원 계정

  @Column
  grpCd!: string; // 그룹 코드
  
  @Column
  grpCdNm!: string; // 그룹 코드 이름
  
}

@Table({ modelName: 'CD_DTL', underscored: true, freezeTableName: true })
export class CdDtl extends BaseModel<CdDtl> implements BaseInterface {
  @PrimaryKey
  @Column
  dtlId!: number; // 상세 코드 계정

  @Column
  academyId!: number; // 학원 계정

  @Column
  grpCd!: string; // 그룹 코드
  
  @Column
  dtlCd!: string; // 상세 코드
  
  @Column
  dtlCdNm!: string; // 상세 코드 이름
  
  @Column
  val1!: string; // 값1
  
  @Column
  val2!: string; // 값2
  
  @Column
  val3!: string; // 값3
  
  @Column
  dtlOrder!: number; // 정렬 순서

}