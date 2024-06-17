import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { SEQUELIZE } from '../constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'ERer00*#',
        database: 'jedex',
      });
      await sequelize.authenticate(); // Ensure the connection is successful
      // Add models to Sequelize instance
      sequelize.addModels([User]);
      // Sync all models with the database
      await sequelize.sync({ alter: true });

      return sequelize;
    },
  },
];
