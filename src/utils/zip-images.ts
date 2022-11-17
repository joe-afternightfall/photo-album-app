import { saveAs } from 'file-saver';
import { getStorage, ref, getBlob } from 'firebase/storage';
import JSZip from 'jszip';

import { ImageVO } from '../configs/interfaces';

export const zipImages = async (folderName: string, images: ImageVO[]) => {
  if (images.length) {
    const zip = new JSZip();
    const storage = getStorage();
    const folder = zip.folder(folderName);

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
  }
};
