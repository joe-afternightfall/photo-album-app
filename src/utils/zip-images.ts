import { saveAs } from 'file-saver';
import { getBlob, getStorage, ref } from 'firebase/storage';
import JSZip from 'jszip';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ImageVO } from '../configs/interfaces';
import { State } from '../configs/redux/store';
import { ApplicationActions } from '../creators/actions';
import {
  displayErrorSnackbar,
  displaySuccessSnackbar,
} from '../creators/app-snackbar';

export const zipAndSaveSelectedAlbumFavorites =
  (): ThunkAction<void, State, void, ApplicationActions> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const state = getState();

    const signedInUser = state.applicationState.signedInUser;
    const selectedAlbum = state.selectedAlbumState.currentAlbum;
    const favoriteImages: ImageVO[] = [];

    if (selectedAlbum && signedInUser && signedInUser.favoriteImageIds.length) {
      signedInUser.favoriteImageIds.map((favId) => {
        selectedAlbum.images.find((image) => {
          if (image.id === favId) {
            favoriteImages.push(image);
          }
        });
      });
    }

    if (selectedAlbum && favoriteImages.length > 0) {
      zipImages(`${selectedAlbum.title}-favorites`, favoriteImages)
        .catch((e) => {
          console.log('e: ' + JSON.stringify(e));
          dispatch(displayErrorSnackbar(`Error downloading favorite's`));
        })
        .then(() => {
          dispatch(displaySuccessSnackbar(`Downloaded selected favorite's`));
        });
    }
  };

export const zipImages = async (
  folderName: string,
  images: ImageVO[]
): Promise<void> => {
  if (images.length) {
    const zip = new JSZip();
    const storage = getStorage();
    const folder = zip.folder(folderName);

    try {
      await Promise.all(
        images.map(async (image) => {
          const blob = await getBlob(ref(storage, image.downloadURL));
          const imgData = new File([blob], image.fileName);

          folder && folder.file(image.fileName, imgData, { base64: true });
        })
      );

      zip.generateAsync({ type: 'blob' }).then((blob) => {
        saveAs(blob, `${folderName}.zip`);
      });
      return Promise.resolve();
    } catch (e) {
      console.log('e: ' + JSON.stringify(e));
      return Promise.reject();
    }
  }
};

export const downloadImage = async (image: ImageVO) => {
  const storage = getStorage();

  const blob = await getBlob(ref(storage, image.downloadURL));
  saveAs(blob, image.fileName);
};
