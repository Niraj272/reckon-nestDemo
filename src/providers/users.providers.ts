import { passReset } from 'src/entities/user.reset.entity';
import { UserSessions } from 'src/entities/users.sessions.entity';
import { user } from '../entities/user.entity';
/**
 * Users provider
 */
export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: user,
  },
];

export const usersSessionsProviders = [
  {
    provide: 'USER_SESSIONS_REPOSITORY',
    useValue: UserSessions
  }
];

export const passResetProviders = [
  {
    provide: 'PASS_RESET_REPOSITORY',
    useValue: passReset
  }
];
