export enum ACCESS_TYPE {
  NOT_DEFINED = '-1',
  PRIVATE = '0',
  PUBLIC = '1',
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
