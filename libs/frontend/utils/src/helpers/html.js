export const outerHeight = (el) => {
  if (el) {
    let height = el.offsetHeight;
    let style = getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  }
  return 0;
};
export const getTextWidth = (text, font) => {
  let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  let context = canvas.getContext('2d');
  context.font = font;
  let metrics = context.measureText(text);
  return metrics.width;
};
