import { ButtonUpload } from './components';
import { KUIConnect } from '@kleeen/core-react';
import React from 'react';
import { UploadProps } from './Upload.model';
import { path } from 'ramda';

const UploadComponent: React.FC<UploadProps> = ({ translate, ...props }: UploadProps): JSX.Element => {
  // if valid the result will be an object {filteredFiles: Array<FILE>, filteredFilesRead: Array<String>} contains the native array of File objects as well an array of files ready binary
  const onChange = path(['onChange'], props);

  const localization = {
    uploadLabel: translate('app.upload.label') || '',
    filesAllowed: translate('app.upload.filesAllowed') || '',
  };

  return (
    <div className="upload-container">
      <ButtonUpload onChange={onChange} localization={localization} {...props} />
    </div>
  );
};

export const Upload = React.memo(KUIConnect(({ translate }) => ({ translate }))(UploadComponent));
