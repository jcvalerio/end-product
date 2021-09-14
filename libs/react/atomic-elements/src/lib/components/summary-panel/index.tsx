import { DisplayElement } from '../display-element';
import { InputElement } from '../input-element';
import { KeyValue } from '../key-value';
import { SummaryLayout } from '../summary-layout';
import { isNilOrEmpty } from '@kleeen/common/utils';

const defaultLayoutProps = {
  columnGap: 55,
  containerPadding: 68,
  keyValuePadding: 21,
  keyWidth: 144,
  valueWidth: 233,
};

// TODO: @cafe add types here
export function SummaryPanel({
  entityDetails: attributes,
  isEditing,
  isFromButtonSummary = false,
  layoutProps = defaultLayoutProps,
  registerEvents,
  taskName,
}) {
  return (
    <SummaryLayout
      isFromButtonSummary={isFromButtonSummary}
      layoutProps={layoutProps}
      totalElements={attributes.length}
    >
      {attributes.map((attribute) => {
        const { elements } = attribute;
        const { inputComponent } = elements;

        const useDisplayComponent = !isEditing || isNilOrEmpty(inputComponent);

        return (
          <KeyValue
            key={attribute.id}
            keyComponent={attribute.attributes[0].label}
            layoutProps={{
              keyWidth: layoutProps.keyWidth,
              valueWidth: layoutProps.valueWidth,
            }}
            valueComponent={
              useDisplayComponent ? (
                <DisplayElement
                  attributes={attribute.attributes}
                  elements={attribute.elements}
                  params={attribute.params}
                  taskName={taskName}
                  widgetId={attribute.id}
                />
              ) : (
                <InputElement
                  attributes={attribute.attributes}
                  elements={attribute.elements}
                  registerEvents={registerEvents}
                  params={attribute.params}
                  taskName={taskName}
                  widgetId={attribute.id}
                />
              )
            }
          />
        );
      })}
    </SummaryLayout>
  );
}
