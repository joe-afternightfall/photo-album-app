export enum ACCESS_TYPE {
  UNDEFINED = '-1',
  PRIVATE = '0',
  PUBLIC = '1',
  ALL = '2',
}

export interface ImageDAO {
  id: string;
  nickname: string;
  fileName: string;
  tagIds: string[];
  downloadURL: string;
  albumId: string;
  accessType: ACCESS_TYPE;
  created: string;
  updated: string;
}
