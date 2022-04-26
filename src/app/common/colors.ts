import {BandcampFacade} from '../facades/bandcamp.facade';

interface Rgb {
  r: number;
  g: number;
  b: number;
}

export class Colors {
  public static theme = {
    white: '#ffffff',
    gray: '#d9d9d9',
    black: '#222222',
  };

  private static _fillColor: string;

  public static getFillColor(): string {
    if (this._fillColor) {
      return this._fillColor;
    }

    const background = BandcampFacade.colors.body_color;
    const color = BandcampFacade.colors.bg_color;
    const contrast = Colors.getContrast(this.convertHexToRgb(color), this.convertHexToRgb(background));

    if (contrast > 1.6) {
      this._fillColor = color;
      return this._fillColor;
    } else {
      return 'FF0000';
    }
  }

  public static getStrokeColor(): string {
    return BandcampFacade.colors.link_color;
  }

  public static getLoadingColor(): Rgb {
    return this.convertHexToRgb(BandcampFacade.colors.link_color);
  }

  private static getLuminance(
    r: number,
    g: number,
    b: number,
  ): number {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928
        ? v / 12.92
        : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  private static getContrast(
    foreground: Rgb,
    background: Rgb,
  ): number {
    const lumA = this.getLuminance(foreground.r, foreground.g, foreground.b);
    const lumB = this.getLuminance(background.r, background.g, background.b);

    const brightest = Math.max(lumA, lumB);
    const darkest = Math.min(lumA, lumB);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  private static convertHexToRgb(hex: string): Rgb {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }
}
