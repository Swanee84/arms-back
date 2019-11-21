import { Column, CreatedAt, Model, UpdatedAt } from 'sequelize-typescript';

export class BaseModel<T> extends Model<T> {
  @Column
  status!: string; // 상태

  @Column
  regId!: number; // 작성 계정

  @Column
  modId?: number; // 수정 계정

  @CreatedAt
  @Column
  regDt!: Date; // 작성 일시

  @UpdatedAt
  @Column
  modDt?: Date; // 수정 일시
}