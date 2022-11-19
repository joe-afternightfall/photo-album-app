export interface UserDAO {
  id: string;
  isAdmin: boolean;
  username: string;
  email: string;
  favoriteImageIds: string[];
  created: string;
  updated: string;
}
