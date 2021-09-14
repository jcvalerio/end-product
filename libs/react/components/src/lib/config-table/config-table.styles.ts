import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  widgetContent: {
    display: 'flex',
    flexDirection: 'column',
    // The desired Widget height, minus the header and the paddings
    height: 'calc(var(--wh-7XL) - var(--wh-1XS) - var(--wh-6XS) - var(--wh-6XS))',
  },
});
