export interface AlbumDAO {
  id: string;
  title: string;
  subtitle: string;
  coverImageDownloadURL: string;
  images: string[];
  isPrivateAlbum: boolean;
  imagesShouldBeOrdered: boolean;
  created: string;
  updated: string;
}
