export interface ImageDAO {
  id: string;
  nickname: string;
  fileName: string;
  tagIds: string[];
  downloadURL: string;
  albumId: string;
  hideFromGeneralViewing: boolean;
  created: string;
  updated: string;
}
