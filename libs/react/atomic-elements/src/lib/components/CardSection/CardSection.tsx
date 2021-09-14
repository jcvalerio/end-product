import './CardSection.scss';

import { CardSectionProps, RenderChildrenProps } from './CardWidget.model';
import { ReactElement, ReactNode } from 'react';
import { isNilOrEmpty, roleAccessKeyTag } from '@kleeen/common/utils';

import { AccessControl } from '@kleeen/core-react';
import { TransformToWidgetComponent } from './components';
import { CardSectionLayout, Widget } from '@kleeen/types';
import classNames from 'classnames';

const bem = 'ks-card-section';

export function CardSection({
  cardSectionLayout = CardSectionLayout.Masonry,
  children,
  hideSaveAndClose,
  justifyContent = 'flex-start',
  onInputChange,
  registerEvents,
  taskName,
  widgets,
}: CardSectionProps): ReactElement {
  return (
    <div
      className={classNames(bem, 'card-section', cardSectionLayout)}
      style={{ justifyContent }}
      key={`card-section-${taskName}`}
    >
      {renderChildren({
        cardSectionLayout,
        children,
        hideSaveAndClose,
        onInputChange,
        registerEvents,
        taskName,
        widgets,
      })}
    </div>
  );
}

export default CardSection;

//#region Private members
function addCurrentWidgetTypeToViableSolutions(widget: Widget): Widget {
  const resultWidget = { ...widget };

  // TODO: @jcvalerio this method have to be refactored in a single place duplicated with libs/react/atomic-elements/src/lib/components/CardSection/CardSection.tsx
  if (isNilOrEmpty(resultWidget.viableSolutions)) {
    return resultWidget;
  }

  if (resultWidget.viableSolutions.length && !resultWidget.viableSolutions.includes(resultWidget.chartType)) {
    resultWidget.viableSolutions.unshift(resultWidget.chartType);
  }

  return resultWidget;
}

function renderChildren({
  cardSectionLayout,
  children,
  hideSaveAndClose,
  onInputChange,
  registerEvents,
  taskName,
  widgets,
}: RenderChildrenProps): JSX.Element | ReactNode {
  if (widgets) {
    return widgets.map((widget: Widget) => {
      const widgetCompleted = addCurrentWidgetTypeToViableSolutions(widget);

      return (
        <AccessControl
          id={roleAccessKeyTag(`${taskName}.widgets.${widget.id}`)}
          key={`card-section-widget-${widget.id}`}
        >
          <TransformToWidgetComponent
            disableHeightCalculation={cardSectionLayout === CardSectionLayout.SingleWideColumn}
            hideSaveAndClose={hideSaveAndClose}
            key={`card-section-widget-${widget.id}`}
            onInputChange={onInputChange}
            registerEvents={registerEvents}
            taskName={taskName}
            widget={widgetCompleted}
          />
        </AccessControl>
      );
    });
  } else {
    return children;
  }
}
//#endregion
