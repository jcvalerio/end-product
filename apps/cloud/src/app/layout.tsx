import 'react-reflex/styles.css';

import {
  AppModule,
  CardSectionLayout,
  NavPosition,
  ReactElement,
  Translate,
  Widget,
  WidgetTypes,
} from '@kleeen/types';
import { ReflexContainer, ReflexElement, ReflexHandle, ReflexSplitter } from 'react-reflex';
import { useKleeenRouting, usePreviewPanel, useShouldHideNavigation } from '@kleeen/react/hooks';

import { CardSection } from '@kleeen/react/atomic-elements';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { KUIConnect } from '@kleeen/core-react';
import { KsButton } from '@kleeen/react/components';
import { NavigationTask } from './modules/generated/components';
import { Typography } from '@material-ui/core';
import classnames from 'classnames';
import { isNotNilOrEmpty } from '@kleeen/common/utils';
import settings from './settings/app.json';
import { useStyles } from './previewPanel.styles';

const bem = 'ks-layout';
const isNavTop = settings.layout.position === NavPosition.top;
const modifier = isNavTop ? 'top' : 'side container-nav-left';

type LayoutBaseProps = {
  modules: AppModule[];
  translate: Translate;
};

function LayoutBase({ modules, translate }: LayoutBaseProps) {
  const { isPreviewOpen, previewWidgets, previewTitle } = usePreviewPanel();
  const styles = useStyles();

  return (
    <div className={classnames(bem, `${bem}--${modifier}`, 'content-layout')}>
      <Navigation />
      <ReflexContainer className={classnames(`${bem}__preview-container`, 'layout')} orientation="horizontal">
        <ReflexElement minSize={288}>{<Content modules={modules} />}</ReflexElement>
        {isPreviewOpen && <ReflexSplitter className={styles.previewSplitter} />}
        {isPreviewOpen && (
          <ReflexElement minSize={42}>
            <ReflexHandle className={styles.previewHandle}>
              <PreviewPanelHeader styles={styles} translate={translate} previewTitle={previewTitle} />
            </ReflexHandle>
            <PreviewPanelWidgetsContent styles={styles} previewWidgets={previewWidgets} />
          </ReflexElement>
        )}
      </ReflexContainer>
    </div>
  );
}

const Layout = KUIConnect(({ translate }) => ({ translate }))(LayoutBase);

export default Layout;

//#region Private members
function CloseButton({ translate }: { translate: Translate }) {
  const previewContext = usePreviewPanel();
  const styles = useStyles();

  function closePreview() {
    previewContext.closePreviewPanel();
  }

  return (
    <div className={styles.previewCloseButtonContainer}>
      <KsButton className={styles.previewCloseButton} variant="outlined" onClick={closePreview}>
        {translate('app.previewLayout.closeButton')}
      </KsButton>
    </div>
  );
}

function Content({ modules }: { modules: AppModule[] }) {
  const KsRouter = useKleeenRouting(modules, [], settings.defaultHomePage);

  return (
    <main
      className={classnames(`${bem}__content`, 'main-layout', {
        [NavPosition.top]: isNavTop,
        [NavPosition.left]: !isNavTop,
      })}
    >
      {KsRouter}
    </main>
  );
}

function Navigation() {
  const shouldHideNavigation = useShouldHideNavigation();

  if (shouldHideNavigation) return null;

  return (
    <section className={classnames(`${bem}__navigation`)}>
      <NavigationTask />
    </section>
  );
}

function PreviewPanelHeader({
  styles,
  translate,
  previewTitle,
}: {
  previewTitle: ReactElement;
  styles: ClassNameMap;
  translate: Translate;
}) {
  return (
    <div className={classnames(`${bem}__handle-container`, styles.previewHeader)}>
      <Typography className={styles.previewTitle}>{previewTitle}</Typography>
      <CloseButton translate={translate} />
      <div className={styles.previewHandler}>::::::</div>
    </div>
  );
}

function PreviewPanelWidgetsContent({
  previewWidgets,
  styles,
}: {
  previewWidgets: Widget[];
  styles: ClassNameMap;
}) {
  const includesTableAndSummary = (w: Widget) =>
    [WidgetTypes.TABLE, WidgetTypes.SUMMARY].includes(w.chartType);
  const tableAndSummaryWidgets = previewWidgets
    .filter(includesTableAndSummary)
    .map((w) => ({ ...w, actions: [] })); // *Removing actions for tables and summary widgets on preview
  const restWidgets = previewWidgets.filter((w) => !includesTableAndSummary(w));

  return (
    <div className={styles.previewContent}>
      {isNotNilOrEmpty(tableAndSummaryWidgets) && (
        <CardSection
          cardSectionLayout={CardSectionLayout.SingleWideColumn}
          justifyContent="center"
          key="preview-card-section-wide-column"
          taskName="previewPanel"
          widgets={tableAndSummaryWidgets}
        />
      )}
      <CardSection
        justifyContent="center"
        key="preview-card-section"
        taskName="previewPanel"
        widgets={restWidgets}
      />
    </div>
  );
}
//#endregion
