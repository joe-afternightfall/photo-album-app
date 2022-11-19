import { AccessRequestDAO } from './AccessRequestDAO';

export interface AccessRequestVO extends AccessRequestDAO {
  firebaseId: string;
}
