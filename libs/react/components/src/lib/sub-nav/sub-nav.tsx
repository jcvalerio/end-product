import { KsSubNavProps, SectionType } from './sub-nav.model';

import classnames from 'classnames';
import { isNilOrEmpty } from '@kleeen/common/utils';
import { useStyles } from './sub-nav.style';

const bem = 'ks-sub-nav';

export function KsSubNav({ startSection, endSection, centerSection }: KsSubNavProps) {
  const classes = useStyles();
  return (
    <header className={classnames(`${bem}__header`, classes.widgetHeader)}>
      <OptionalSection section={startSection} />
      <OptionalSection section={centerSection} />
      <OptionalSection section={endSection} />
    </header>
  );
}

//#region Private Members

function OptionalSection({ section }: { section: SectionType }) {
  if (isNilOrEmpty(section)) return null;

  const classes = useStyles();
  const flexNumber = section.flexNumber || 1;

  return (
    <div className={classnames(`${bem}__header-section`, classes.headerSection)} style={{ flex: flexNumber }}>
      {section.sections.map(({ component, endSeparator, flexNumber: flexNumb }) => (
        <div
          style={{ flex: flexNumb || 1 }}
          className={classnames(`${bem}__header-sub-section`, { [classes.endSeparator]: endSeparator })}
        >
          {component}
        </div>
      ))}
    </div>
  );
}

//#endregion
