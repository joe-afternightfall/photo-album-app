import React from 'react';
import { DropzoneArea } from 'react-mui-dropzone';

export default function PaperDropzone(props: PaperDropzoneProps): JSX.Element {
  const { dropzoneHandler, onDropHandler, filesLimit } = props;
  return (
    <DropzoneArea
      onChange={dropzoneHandler}
      showFileNames
      dropzoneText="Drag and Drop file"
      showAlerts={false}
      filesLimit={filesLimit ? filesLimit : 50}
      showPreviewsInDropzone
      maxFileSize={1000000000}
      onDrop={() => {
        onDropHandler && onDropHandler();
      }}
    />
  );
}

interface PaperDropzoneProps {
  filesLimit?: number;
  dropzoneHandler: (files: File[]) => void;
  onDropHandler?: () => void;
}
