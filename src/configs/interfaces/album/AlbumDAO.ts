export interface AlbumDAO {
  id: string;
  title: string;
  subtitle: string;
  coverImageDownloadURL: string;
  imageIds: string[];
  isPrivateAlbum: boolean;
  imagesShouldBeOrdered: boolean;
  created: string;
  updated: string;
}
