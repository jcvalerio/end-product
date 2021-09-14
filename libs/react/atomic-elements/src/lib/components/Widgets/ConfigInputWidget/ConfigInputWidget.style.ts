import { makeStyles } from '@material-ui/core';

export const useConfigInputStyles = makeStyles({
  configDisplay: {
    width: '100%',
    height: '100%',
  },
  few: {
    display: 'flex',
  },
  configInputBasic: {
    width: '100%',
    alignItems: 'center',
    '& Label': {
      textAlign: 'left',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
      whiteSpace: 'nowrap',
    },
  },
  configInputNormal: {
    height: 'var(--wh-L)',
    display: 'flex',
  },
  configInputRadioGroup1: {
    height: 'var(--wh-S)',
  },
  configInputRadioGroup2: {
    height: 'calc(var(--wh-2XL) + var(--wh-4XS))',
  },
  configInputRadioGroup3: {
    height: 'calc(var(--wh-3XL) + var(--wh-3XS))',
  },
  configInputRadioGroup4: {
    height: 'calc(var(--wh-3XL) + var(--wh-L))',
  },
  configInputCheckGroup1: {
    height: 'var(--wh-S)',
  },
  configInputCheckGroup2: {
    height: 'calc(var(--wh-2XL) + var(--wh-4XS))',
  },
  configInputCheckGroup3: {
    height: 'calc(var(--wh-3XL) + var(--wh-3XS))',
  },
  configInputCheckGroup4: {
    height: 'calc(var(--wh-3XL) + var(--wh-L))',
  },
  configInputToken: {
    height: 'var(--wh-4XL)',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardContentMany: {
    width: '100%',
  },
  cardContentFew: {
    width: '60%',
  },
  cardActionArea: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiButtonBase-root': {
      marginRight: 'var(--pm-0)',
      marginLeft: 'var(--pm-2XS) !important',
      width: 'var(--wh-1XL)',
    },
  },
  contentActionMany: {
    width: '100%',
    justifyContent: 'left',
    marginTop: 'var(--pm-1XS)',
  },
  contentActionFew: {
    width: '40%',
    justifyContent: 'center',
  },
  cardSelectable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'auto',
    width: '60%',
  },
  clickableArea: {
    '& .MuiInputBase-root.MuiInput-root': {
      color: 'var(--secondary-color)',
      fontWeight: 'bold',
    },
    '&:hover': {
      backgroundColor: 'var(--secondary-color)',
      cursor: 'pointer',
      '& .MuiFormLabel-root': {
        cursor: 'pointer',
        color: 'var(--on-secondary-color-variant)',
      },
      '& .MuiInputBase-input.MuiInput-input': {
        cursor: 'pointer',
      },
      '& .MuiInputBase-root.MuiInput-root': {
        color: 'var(--on-secondary-color-variant)',
        cursor: 'pointer',
      },
    },
  },
  inputLuError: {
    color: 'var(--input-error-color)',
    fontSize: 'var(--tx-M)',
    marginTop: 'var(--pm-5XS)',
    '& li': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
});
