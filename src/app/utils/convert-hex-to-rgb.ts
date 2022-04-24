interface ConvertHexToRgb {
  r: number;
  g: number;
  b: number;
}

export function convertHexToRgb(hex: string): ConvertHexToRgb {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}
