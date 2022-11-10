import { UserDAO } from './UserDAO';

export interface UserVO extends UserDAO {
  firebaseId: string;
}
