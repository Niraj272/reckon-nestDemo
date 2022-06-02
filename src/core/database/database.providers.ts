import { Sequelize } from 'sequelize-typescript';
import { passReset } from 'src/entities/user.reset.entity';
import { UserSessions } from 'src/entities/users.sessions.entity';
import { user } from '../../entities/user.entity';
// import { Course } from '../../modules/courses/courses.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([
         user,
         UserSessions,
         passReset
        ]);
        await sequelize.sync();
        return sequelize;
    },
}];