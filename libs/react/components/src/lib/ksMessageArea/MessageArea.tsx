import React, { useState } from 'react';
import { KsButton } from '../button';
import { subheaderStyles as useStyles } from './MessageArea.styles';
import { Dialog } from '@material-ui/core';

interface MessageAreaProps {
  isStatic: boolean;
  typeMessage: string;
  title: string;
  textImportant?: string;
}

export const MessageArea = ({
  isStatic,
  typeMessage,
  title,
  textImportant,
}: MessageAreaProps): JSX.Element => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  return (
    open && (
      <div className={classes.subheader}>
        <div className={classes.titleSubheader}>
          <span className={classes.textBold}>{typeMessage}</span> <span>{title}</span>
          {textImportant && <span className={classes.textBold}>{textImportant}</span>}
        </div>
        {!isStatic && (
          <KsButton
            color="primary"
            className={classes.button}
            onClick={() => setOpen(false)}
            size={'medium'}
            variant={'contained'}
          >
            Dismiss
          </KsButton>
        )}
      </div>
    )
  );
};
