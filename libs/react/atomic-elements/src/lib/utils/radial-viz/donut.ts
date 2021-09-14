import { isValidArray } from '@kleeen/common/utils';
const getContainerWidth = (self) => {
  if (isValidArray(self?.series[0]?.center) && self?.series[0]?.center.length > 3) {
    return self?.series[0]?.center[2];
  }
  return 'var(--tx-M)';
};
const addDonutTitle = (self, labelTitle = 'Title') => {
  if (self.title) {
    self.title.destroy();
  }
  const containerWidth = getContainerWidth(self);

  const r = self.renderer,
    x = self.series[0].center[0] + self.plotLeft,
    y = self.series[0].center[1] + self.plotTop;

  self.title = r
    .text(labelTitle, 0, 0)
    .css({
      color: 'var(--on-surface-color)',
      fontSize: Math.round(containerWidth / 9) + 'px',
      fontWeight: 'bold',
    })
    .hide()
    .add();

  const bbox = self.title.getBBox();

  self.title
    .attr({
      x: x - bbox.width / 2,
      y,
    })
    .show();
};
const addDonutSubTitle = (self, labelSubTitle = 'Subtitle') => {
  if (self.subtitle) {
    self.subtitle.destroy();
  }
  const containerWidth = getContainerWidth(self);

  const r = self.renderer,
    x = self.series[0].center[0] + self.plotLeft,
    y = self.series[0].center[1] + self.plotTop;
  self.subtitle = r
    .text(labelSubTitle, 0, 0)
    .css({
      color: 'var(--on-surface-color)',
      fontSize: Math.round(containerWidth / 13) + 'px',
    })
    .hide()
    .add();

  const bbox = self.subtitle.getBBox();
  self.subtitle
    .attr({
      x: x - bbox.width / 2,
      y: y + Math.round(containerWidth / 13) + 'px',
    })
    .show();
};

export { addDonutSubTitle, addDonutTitle };
