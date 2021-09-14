import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    categoryTitle: {
      position: 'relative',
      bottom: '-9px',
      top: 'auto',
      left: 'var(--pm-4XS)',
      right: 'auto',
      display: 'initial',
      padding: 'var(--pm-7XS) var(--pm-3XS) var(--pm-7XS) var(--pm-3XS)',
      backgroundColor: 'var(--category-top-filter-bg)',
      color: 'var(--on-category-top-filter-bg)',
      borderTopLeftRadius: 'var(--pm-4XS)',
      borderTopRightRadius: 'var(--pm-4XS)',
      fontSize: 'var(--tx-S)',
      'z-index': '1',
    },
    categoryContent: {
      padding: 'var(--pm-5XS)',
      backgroundColor: 'var(--category-top-filter-bg)',
      borderRadius: 'var(--pm-2XS)',
      position: 'relative',
      left: 'var(--pm-4XS)',
      marginRight: 'var(--pm-1XS)',
    },
    categorybutton: {
      position: 'relative',
      color: 'var(--on-category-top-filter-bg)',
      height: 'var(--wh-3XS)',
      width: 'var(--wh-3XS)',
      marginRight: '-1px',
      marginLeft: '-1px',
      '& svg': {
        height: 'var(--wh-4XS)',
        width: 'var(--wh-4XS)',
      },
    },
  }),
);
