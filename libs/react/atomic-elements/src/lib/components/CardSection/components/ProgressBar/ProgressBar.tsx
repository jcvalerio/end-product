import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import classnames from 'classnames';

const useStyles = makeStyles({
  containerBar: {
    alignItems: (props: { percentage: number; top: boolean }) => (props.top ? 'flex-end' : 'flex-start'),
    backgroundColor: 'var(--surface-color)',
    display: 'flex',
    height: 'var(--wh-4XS)',
    marginRight: 'var(--pm-2XS)',
    transition: 'align-items 0.1s',
    width: 'var(--wh-7XS)',
  },
  innerBar: {
    backgroundColor: 'var(--secondary-color)',
    height: (props: { percentage: number; top: boolean }) => `${props.percentage}%`,
    transition: 'height 0.1s',
    width: 'var(--wh-7XS)',
  },
});

const calcPercentage = ({
  containerBottom,
  containerTop,
  widgetBottom,
  widgetHeight,
  widgetTop,
}: {
  containerBottom: number;
  containerTop: number;
  widgetBottom: number;
  widgetHeight: number;
  widgetTop: number;
}): { percentage: number; top: boolean } => {
  const result = { percentage: 0, top: true };

  if (widgetTop > containerTop) {
    result.top = false;
  }
  if (widgetBottom < containerTop || widgetTop > containerBottom) {
    return result;
  }
  if (result.top) {
    if (widgetBottom >= containerBottom) {
      result.percentage = 100;
    } else {
      const visiblePart = widgetBottom - containerTop;
      result.percentage = (visiblePart * 100) / widgetHeight;
    }
  } else {
    if (widgetBottom <= containerBottom) {
      result.percentage = 100;
    } else {
      const visiblePart = containerBottom - widgetTop;
      result.percentage = (visiblePart * 100) / widgetHeight;
    }
  }
  return result;
};

const bem = 'ks-progress-bar';

export const ProgressBar = ({
  containerId,
  widgetRef,
}: {
  containerId: string;
  widgetRef: any;
}): JSX.Element => {
  const [percentage, setPercentage] = useState(0);
  const [time, setTime] = useState(0);
  const [top, setTop] = useState(true);

  useEffect(() => {
    const handler = setInterval(() => {
      setTime((previous) => previous + 1);
    }, 100);
    return () => clearInterval(handler);
  }, []);

  useEffect(() => {
    const widgetsContainerDOM = document.getElementById(containerId);
    const rect = widgetRef.current?.getBoundingClientRect();
    const containerRect = widgetsContainerDOM?.getBoundingClientRect();

    const calcResult = calcPercentage({
      containerBottom: containerRect?.bottom,
      containerTop: containerRect?.top,
      widgetBottom: rect?.bottom,
      widgetHeight: widgetRef.current?.clientHeight,
      widgetTop: rect?.top,
    });

    if (calcResult.percentage !== percentage || calcResult.top !== top) {
      setPercentage(calcResult.percentage);
      setTop(calcResult.top);
    }
  }, [time]);

  const classes = useStyles({ percentage, top });

  return (
    <div className={classnames(bem, classes.containerBar)}>
      <div className={classnames(`${bem}__bar`, classes.innerBar)} />
    </div>
  );
};
