import { AggregationType } from '@kleeen/types';
import { ArrowPoint } from '@kleeen/react/components';
import { ArrowProps } from './Arrow.model';

export const Arrow = (props: ArrowProps) => {
  const metadata = props.transformation.metadata || props.transformation.transformationMetadata;
  const { changeDirections } = metadata || {};
  const isChangePercentage = props.transformation.transformation === AggregationType.ChangePercent;

  return (
    <ArrowPoint
      changeDirections={changeDirections}
      className="arrow-point-center"
      highlighted={props.highlighted}
      result={props.value}
      showPercentage={isChangePercentage}
    />
  );
};
