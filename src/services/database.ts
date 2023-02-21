import { Sequelize } from 'sequelize-typescript';
import { Message } from '../models/Message';

const getDatabaseURL = () => {
  const [user, password, host, database] = ['user', 'password', 'host', 'db'].map(name => {
    const environmentValue = `${process.env['POSTGRES_' + name.toUpperCase()] || ''}`;
    if (environmentValue.trim().length === 0) {
      throw new Error(`Database ${name.toUpperCase()} not found in environment.`);
    } else {
      return environmentValue;
    }
  });

  return `postgres://${user}:${password}@${host}/${database}`;
};

const databaseURL = getDatabaseURL();
export const sequelizeInstance = new Sequelize(databaseURL, {
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
