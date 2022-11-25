import React from 'react';

import AlbumInfoDialog from './components/widgets/dialogs/album-info-dialog/AlbumInfoDialog';
import DeleteAlbumDialog from './components/widgets/dialogs/delete-album-dialog/DeleteAlbumDialog';
import DeleteImageDialog from './components/widgets/dialogs/delete-image-dialog/DeleteImageDialog';
import UploadImageDialog from './components/widgets/dialogs/upload-image-dialog/UploadImageDialog';

export default function AppDialogs(): JSX.Element {
  return (
    <>
      <AlbumInfoDialog />
      <DeleteAlbumDialog />
      <DeleteImageDialog />
      <UploadImageDialog />
    </>
  );
}
