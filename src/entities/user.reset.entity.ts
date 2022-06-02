import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { user } from './user.entity';
@Table({
  tableName: 'passReset',
  timestamps: false,
  updatedAt: true,
})

export class passReset extends Model<passReset> {
  @ForeignKey(() => user)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userid: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  random_token: string;

  @BelongsTo(() => user)
  user: user;
}