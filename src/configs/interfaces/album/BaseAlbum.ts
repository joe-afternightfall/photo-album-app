export interface BaseAlbum {
  id: string;
  title: string;
  subtitle: string;
  coverImageDownloadURL: string;
  isPrivateAlbum: boolean;
  imagesShouldBeOrdered: boolean;
  created: string;
  updated: string;
}
