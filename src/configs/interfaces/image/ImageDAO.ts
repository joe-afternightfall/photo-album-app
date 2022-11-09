export interface ImageDAO {
  id: string;
  title: string;
  tagIds: string[];
  imageId: string;
  albumId: string;
  hideFromGeneralViewing: boolean;
  created: string;
  updated: string;
}
