import { Sequelize } from 'sequelize-typescript';
import { Message } from '../models/Message';

export const sequelizeInstance = new Sequelize({
  username: process.env.POSTGRES_USER || 'post',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DB || 'devops',
  port: 5432,
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
