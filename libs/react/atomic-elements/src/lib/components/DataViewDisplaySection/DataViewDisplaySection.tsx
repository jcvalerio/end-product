import React, { useEffect, useState } from 'react';
import { useGetNavigationStyle, useGetWidgetsAmount } from '@kleeen/react/hooks';

import classnames from 'classnames';
import { makeStyles } from '@material-ui/core';

const bem = 'ks-data-display-section';

const useStyles = makeStyles({
  dataViewDisplaySection: {
    height: (props: { withoutSubHeader: boolean }) =>
      props.withoutSubHeader ? 'calc(100% + var(--wh-1XS))' : '100%',
    width: '100%',
    // TODO find a more robust mechanism to turn these paddings on/off
    '.nav-left &': {
      paddingBottom: 'var(--pm-L)',
    },
  },
  tabPanel: {
    overflow: 'overlay',
    height: '100%',
    width: '100%',
    // TODO find a better mechanism to turn these paddings on/off
    '.nav-left &': {
      paddingBottom: 'var(--pm-L)',
    },
  },
});

interface DataViewDisplaySectionProps {
  children?: React.ReactNode;
  setCardsNumber?: (e: number) => void;
  value: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

const TabPanel = React.memo((props: TabPanelProps) => {
  const classes = useStyles({ withoutSubHeader: false });
  const { children, value, index, ...other } = props;

  return (
    <div
      className={classnames(`${bem}__tabs`, classes.tabPanel)}
      style={{ visibility: value === index ? 'visible' : 'hidden' }}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
});

export const DataViewDisplaySection = React.memo((props: DataViewDisplaySectionProps) => {
  const [withouSubHeader, setWithoutSubHeader] = useState(false);

  useEffect(() => {
    const subHeader = document.getElementById('sub-header-element-id');
    const { isNavLeft } = useGetNavigationStyle();
    if (!subHeader && isNavLeft) {
      setWithoutSubHeader(true);
    }
  }, []);

  const classes = useStyles({ withoutSubHeader: withouSubHeader });
  useGetWidgetsAmount(props.setCardsNumber);
  return (
    <div className={classnames(bem, classes.dataViewDisplaySection)}>
      {React.Children.map(props.children, (Child, index) => (
        <TabPanel value={props.value} index={index}>
          {Child}
        </TabPanel>
      ))}
    </div>
  );
});

export default DataViewDisplaySection;
