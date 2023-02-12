import { Sequelize } from 'sequelize-typescript';
import { Message } from '../models/Message';

if (!process.env.DATABASE_URL?.length) throw new Error('Database URL not found');

export const sequelizeInstance = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'postgres',
  retry: {
    match: [/SequelizeConnectionError/],
    max: 3,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: process.env.PG_LOGGING === 'true' ? true : false,
  models: [Message],
});
