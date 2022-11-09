import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';

export default function PaperDropzone(props: PaperDropzoneProps): JSX.Element {
  const { dropzoneHandler, filesLimit } = props;
  return (
    <DropzoneArea
      onChange={dropzoneHandler}
      showFileNames
      dropzoneText={'Drag and Drop file'}
      showAlerts={true}
      filesLimit={filesLimit ? filesLimit : 50}
      showPreviewsInDropzone
    />
  );
}

interface PaperDropzoneProps {
  filesLimit?: number;
  dropzoneHandler: (files: File[]) => void;
}
