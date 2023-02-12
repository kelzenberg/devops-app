import { Optional } from 'sequelize';
import { AllowNull, AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

export interface MessageAttributes {
  id: number;
  content: string;
  author: string;
  createdAt: Date;
}

type MessageCreateAttributes = Optional<MessageAttributes, 'id'>;

@Table({
  timestamps: true,
})
export class Message extends Model<MessageAttributes, MessageCreateAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  content!: string;

  @AllowNull(false)
  @Column
  author!: string;

  @CreatedAt
  @Column
  createdAt!: Date;
}