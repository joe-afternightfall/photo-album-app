import { ImageVO } from '../configs/interfaces';

export const mapImageSnapToVO = (snap: { [key: string]: ImageVO }) => {
  return Object.keys(snap).map((key: string): ImageVO => {
    return {
      firebaseId: key,
      id: snap[key].id,
      nickname: snap[key].nickname,
      fileName: snap[key].fileName,
      downloadURL: snap[key].downloadURL,
      accessType: snap[key].accessType,
      created: snap[key].created,
      updated: snap[key].updated,
    };
  });
};
