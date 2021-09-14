import { Loader, TextFormatter } from '@kleeen/react/components';
import { WidgetDataAttributes, WidgetProps } from '@kleeen/types';
import { path, pathOr } from 'ramda';

import MuiBox from '@material-ui/core/Box';
import MuiTypography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { useWidgetContext } from '@kleeen/react/hooks';

const Box = styled(MuiBox)({
  background: 'var(--summary-slot-bg-color)',
});

const SlotLabel = styled(MuiTypography)({
  fontSize: 'var(--tx-1XS)',
  lineHeight: 'var(--tx-S)',
});

const SlotValue = styled(MuiTypography)({
  fontSize: 'var(--tx-L)',
  lineHeight: 'var(--tx-L)',
});

export const SummarySlot = ({ taskName, widgetId, params, attributes }: WidgetProps): JSX.Element => {
  const widgetData = useWidgetContext({ taskName, widgetId, params: { ...params, attributes } });
  const attrName = widgetData && path(['0', 'name'], attributes);
  const attrLabel = widgetData && path(['0', 'label'], attributes);
  const value = pathOr('', ['data', 'data', '0', attrName, WidgetDataAttributes.DisplayValue], widgetData);
  const format = pathOr({}, ['data', 'format', attrName], widgetData);
  const transformation = pathOr('', ['value', 'transformation'], params);
  const formatType = pathOr('', ['value', 'formatType'], params);

  if (!widgetData) {
    return <Loader />;
  }

  return (
    <Box className="slot">
      <SlotLabel variant="body2" className="slot-label">
        {attrLabel}
      </SlotLabel>
      <SlotValue variant="body1" className="slot-value">
        <TextFormatter format={format} transformation={transformation} formatType={formatType}>
          {value}
        </TextFormatter>
      </SlotValue>
    </Box>
  );
};

export default SummarySlot;
