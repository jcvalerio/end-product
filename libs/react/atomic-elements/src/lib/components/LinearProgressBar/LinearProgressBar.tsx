import { Grid } from '@material-ui/core';
import { PauseButton, ProgressBar, TooltipText, useStyles } from './LinearProgressBar.styles';
import { Popover } from '@material-ui/core';
import { useTheme } from '@kleeen/react/hooks';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import React from 'react';
import classnames from 'classnames';

const bem = 'ks-linear-progress-bar';

const LinearProgressBar = (props: {
  completed;
  refreshPage;
  setCompleted;
  setTime;
  setTimeCurrent;
  setTitle;
  time;
  timeCurrent;
  title;
}) => {
  const [completed, setCompleted] = [props.completed, props.setCompleted];
  const [title, setTitle] = [props.title, props.setTitle];
  const [timeCurrent, setTimeCurrent] = [props.timeCurrent, props.setTimeCurrent];
  const [time, setTime] = [props.time * 60, props.setTime];
  const [percent, setPercent] = React.useState(0);
  const [isPause, setPause] = React.useState(false);
  const prevIsPauseRef = React.useRef<boolean>();
  const completedRef = React.useRef(completed);
  const prevTimeRef = React.useRef<number>();
  const progressRef = React.useRef({ clientWidth: 0 });

  const classes = useStyles();
  const { themeClass } = useTheme();

  const handlePause = () => {
    setPause((prevPause) => !prevPause);
  };

  const secondsToTime = (secs) => {
    const hours = Math.floor(secs / (60 * 60));

    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    const obj = {
      h: (hours < 10 ? '0' : '') + hours,
      m: (minutes < 10 ? '0' : '') + minutes,
      s: (seconds < 10 ? '0' : '') + seconds,
    };
    return obj;
  };

  React.useEffect(() => {
    prevIsPauseRef.current = isPause;
    completedRef.current = completed;
    prevTimeRef.current = time;
  });

  const progress = () => {
    if (!prevIsPauseRef.current) {
      if (completedRef.current >= prevTimeRef.current) {
        setTimeCurrent({ h: '00', m: '00', s: '01' });
        setPercent(100);
        setTime(prevTimeRef.current / 60);
        setCompleted(0);
        props.refreshPage();
        return 0;
      } else {
        setPercent((completedRef.current / prevTimeRef.current) * 100);
        setCompleted((prevCompleted) => {
          const setPrevCompleted = prevCompleted + 1;
          setTimeCurrent(secondsToTime(setPrevCompleted));
          return setPrevCompleted;
        });
      }
    }
  };

  React.useEffect(() => {
    const timer = setInterval(progress, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    let rest = secondsToTime(0);
    if (prevTimeRef.current != completedRef.current) {
      rest = secondsToTime(prevTimeRef.current - completedRef.current);
    }
    const restLabel = `${rest.h}:${rest.m}:${rest.s}`;
    const nextRefreshLabel = `${timeCurrent.h}:${timeCurrent.m}:${timeCurrent.s}`;

    setTitle(`Time until refresh: ${restLabel}      Time since last refresh: ${nextRefreshLabel}`);
  }, [percent]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Grid className={classnames(bem, 'linear-progress-bar-content')}>
      <ProgressBar
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        ref={progressRef}
        value={percent}
        variant="determinate"
      />
      <Popover
        anchorOrigin={{
          horizontal: 0,
          vertical: 'top',
        }}
        anchorPosition={{
          left: 16 + progressRef.current.clientWidth * (percent / 100),
          top: 69,
        }}
        anchorReference="anchorPosition"
        classes={{
          paper: classes.paper,
          root: classes.popover,
        }}
        className={classnames(`${bem}__popover`, themeClass)}
        open={open}
        transformOrigin={{ horizontal: 0, vertical: 'top' }}
      >
        <TooltipText className={classnames(`${bem}__tooltip`, classes.tooltip)}>{title}</TooltipText>
      </Popover>
      <PauseButton onClick={handlePause}>
        {isPause ? <PlayCircleFilledIcon /> : <PauseCircleFilledIcon />}
      </PauseButton>
    </Grid>
  );
};

export default LinearProgressBar;
