import { Optional } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

export interface MessageAttributes {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
}

export type MessageCreateAttributes = Optional<MessageAttributes, 'id' | 'createdAt'>;

@Table({
  timestamps: true,
  tableName: 'message',
})
export class Message extends Model<MessageAttributes, MessageCreateAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column
  author!: string;

  @AllowNull(false)
  @Column
  content!: string;

  @CreatedAt
  @Column
  createdAt!: Date;
}
