import './ButtonUpload.scss';

import React, { useEffect, useRef, useState } from 'react';
import Snackbar, { SnackbarCloseReason } from '@material-ui/core/Snackbar';
import { path, pathOr } from 'ramda';

import Badge from '@material-ui/core/Badge';
import { ButtonUploadProps } from '../Upload.model';
import { KsButton } from '../../button';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';
import { getFileExtension } from '@kleeen/common/utils';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  tooltip: {
    fontSize: 'var(--tx-M)',
  },
}));

export function ButtonUpload(props: ButtonUploadProps): JSX.Element {
  const localization = pathOr({ uploadLabel: '', filesAllowed: '' }, ['localization'], props);
  const labelProp = pathOr(localization.uploadLabel, ['label'], props);
  const onChange = path(['onChange'], props);
  const allowedExtensions = pathOr(['jpeg', 'jpg', 'png', 'txt'], ['allowedExtensions'], props);
  const hasMultiple = pathOr(true, ['multiple'], props);
  const disabled = pathOr(false, ['disabled'], props);
  const buttonConfig = pathOr({}, ['buttonConfig'], props);
  const badgeConfig = pathOr({ color: 'primary' }, ['badgeConfig'], props);

  const [statusSnackBar, setSnackBarStatus] = useState(false);
  const [readFiles, setReadFiles] = useState([]);
  const badgeContentFallBack = readFiles.length > 0 ? readFiles.length : null;
  const [buttonLabelValue, setButtonLabel] = useState(labelProp);
  const [buttonClick, setButtonClick] = useState(false);

  const inputFile = useRef();

  useEffect(() => {
    if (props.shouldResetState) {
      setButtonLabel(labelProp);
    }
  }, [props.shouldResetState]);

  useEffect(() => {
    if (inputFile.current) {
      handleUploadClick();
    }
    return () => {
      setButtonClick(false);
    };
  });

  function readFileAsync(file: File): PromiseLike<ArrayBuffer | string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  function handleUploadClick(): void {
    const element: HTMLInputElement = pathOr({}, ['current'], inputFile);
    if (element) {
      setReadFiles([]);
      setButtonLabel(labelProp);
      element.click();
      const handlerMethod = (): void => {
        const filteredFiles = Array.from(element.files).filter((q) => {
          return allowedExtensions.includes(getFileExtension(q?.name)) && q;
        });
        if (filteredFiles && Array.from(filteredFiles).length <= 0) {
          setSnackBarStatus(true);
        } else {
          setSnackBarStatus(false);
          const filteredFilesRead = [];
          filteredFiles.forEach((file: File) => {
            readFileAsync(file).then((content: ArrayBuffer | string) => {
              filteredFilesRead.push(content);
            });
          });
          setReadFiles(filteredFiles);
          setButtonLabel(filteredFiles.map((q) => q.name).toString());
          if (onChange) {
            onChange({
              filteredFilesRead,
              filteredFiles,
            });
          }
        }
        element.removeEventListener('change', handlerMethod, true);
      };
      element.addEventListener('change', handlerMethod, true);
    }
  }

  function handleSnackBarClose(event: React.SyntheticEvent<any>, reason: SnackbarCloseReason): void {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarStatus(false);
  }

  function addDefaultClass(): string {
    const hasColor = pathOr(null, ['color'], buttonConfig);
    if (!hasColor) {
      return `button-upload-container__upload-button button-upload-container__upload-button--with-style`;
    }
    return `button-upload-container__upload-button`;
  }

  return (
    <>
      <div className="button-upload-container">
        <BootstrapTooltip
          placement="top"
          title={buttonLabelValue.length > 0 && !disabled ? buttonLabelValue : ''}
        >
          <Badge
            badgeContent={isNilOrEmpty(props.badgeCounter) ? badgeContentFallBack : props.badgeCounter}
            {...badgeConfig}
            disabled={disabled}
          >
            <KsButton
              className={addDefaultClass()}
              disabled={disabled}
              variant="contained"
              {...buttonConfig}
              onClick={() => {
                setButtonClick(true);
              }}
            >
              {buttonLabelValue}
            </KsButton>
          </Badge>
        </BootstrapTooltip>

        {buttonClick && (
          <input
            type="file"
            multiple={hasMultiple}
            ref={inputFile}
            className="button-upload-container__input-file"
            name="input-file"
          />
        )}
      </div>
      <Snackbar open={statusSnackBar} autoHideDuration={4000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="error">
          {localization.filesAllowed}: {allowedExtensions.toString()}
        </Alert>
      </Snackbar>
    </>
  );
}

function Alert(props: React.PropsWithChildren<any>): JSX.Element {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function BootstrapTooltip(localProps: React.PropsWithChildren<any>): JSX.Element {
  const classes = useStyles();
  return <Tooltip arrow classes={classes} {...localProps} />;
}
