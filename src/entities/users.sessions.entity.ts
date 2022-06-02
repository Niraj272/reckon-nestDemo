import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { user } from './user.entity';
@Table({
  tableName: 'usersessions',
  timestamps: true,
  updatedAt: false,
})
export class UserSessions extends Model<UserSessions> {
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  usersessionid: string;

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
  jwttoken: string;

  @CreatedAt
  createddate: Date;
  
  @BelongsTo(() => user)
  user: user;
}