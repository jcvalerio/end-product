import tinycolor from 'tinycolor2';

export const isValidColor = (color: string): boolean => {
  const tColor = tinycolor(color);
  return tColor.isValid();
};

export const exportColorToHex = (color: string): string => {
  const tColor = tinycolor(color);
  return tColor.toHexString();
};

export const exportColorToAlpha = (color: string): number => {
  const tColor = tinycolor(color);
  return tColor.getAlpha();
};

export const darkenColor = (color: string, amount: number): string => {
  const tColor = tinycolor(color);
  return tColor.darken(amount);
};

const colorValue = (color) => {
  return Math.round(color * 255);
};

const parsedHue = (m1, m2, hue) => {
  if (hue < 0) hue = hue + 1;
  else if (hue > 1) hue = hue - 1;

  if (hue * 6 < 1) return m1 + (m2 - m1) * hue * 6;
  else if (hue * 2 < 1) return m2;
  else if (hue * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - hue) * 6;
  else return m1;
};

export const parsedHSL = (hue, saturation, lightness) => {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  const m2 =
      lightness <= 0.5 ? lightness * (saturation + 1) : lightness + saturation - lightness * saturation,
    m1 = lightness * 2 - m2,
    red = colorValue(parsedHue(m1, m2, hue + 1 / 3)),
    green = colorValue(parsedHue(m1, m2, hue)),
    blue = colorValue(parsedHue(m1, m2, hue - 1 / 3));

  return `rgb(${red},${green},${blue})`;
};
